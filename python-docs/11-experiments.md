# Experiments

Experiments enable you to track A/B tests, model comparisons, and feature variations in your AI applications. They provide a structured way to compare different approaches and analyze their performance through observability traces.

## What are Experiments?

**Experiments** in Basalt are a mechanism for:
- Tracking different variants of prompts, models, or approaches
- Comparing performance across versions
- Associating traces with specific experiments
- Attaching experiment metadata to observability spans
- Running systematic tests and comparisons

Each experiment has:
- **ID**: Unique identifier (e.g., `"exp-456"`)
- **Name**: Human-readable description (e.g., `"Model Comparison A/B Test"`)
- **Feature Slug**: Optional feature identifier for grouping experiments

## Core Concepts

### Experiment Model

The `Experiment` class represents an experiment in the Basalt system:

```python
@dataclass(slots=True, frozen=True)
class Experiment:
    id: str                 # Unique identifier
    name: str               # Human-readable name
    feature_slug: str       # Feature slug
    created_at: str         # ISO 8601 timestamp
```

### TraceExperiment

The `TraceExperiment` class represents experiment metadata attached to spans:

```python
@dataclass(frozen=True, slots=True)
class TraceExperiment:
    id: str                      # Experiment ID
    name: str | None = None      # Optional display name
    feature_slug: str | None = None  # Optional feature slug
```

## Quick Start

### Attaching Experiments at Root Span

The recommended way to track experiments is using the `experiment` parameter on `start_observe`:

```python
from basalt.observability import start_observe, observe


@start_observe(
    feature_slug="ab-test",
    name="experiment.variant_a",
    experiment="exp-456",
    identity={
        "organization": {"id": "123", "name": "ACME"},
        "user": {"id": "456", "name": "John Doe"}
    }
)
def run_variant_a():
    # Experiment metadata automatically attached to root span
    observe.set_input({"variant": "A", "model": "gpt-4o"})

    result = run_test()

    observe.set_output({"variant": "A", "result": result})
    return result


# Or using context manager
with start_observe(
        feature_slug="ab-test",
        name="experiment.variant_b",
        experiment="exp-456",
):
    # Your experiment code
    pass
```



## Client Lifecycle

> **Important:** Create **one** `Basalt` instance per process and reuse it for the
> entire application lifetime.  The client holds no trace state — trace boundaries
> are determined by `start_observe()` calls, not by client instances.
>
> Call `basalt.shutdown()` **exactly once**, when the process is about to exit.
> `shutdown()` permanently destroys the global OpenTelemetry `TracerProvider`.
> Creating a new `Basalt` client after `shutdown()` will silently produce dead
> traces that are never exported.

```python
from basalt import Basalt

basalt = Basalt(api_key="your-api-key")

# ... use basalt throughout your application ...

# Only at process exit:
basalt.shutdown()
```

## Creating Experiments

Create experiments using the `experiments` property on the `Basalt` client:

```python
from basalt import Basalt

basalt = Basalt(api_key="your-api-key")

# Create experiment synchronously
experiment = basalt.experiments.create_sync(
    feature_slug="my-feature",
    name="GPT-5.1 vs GPT-5 Test"
)

print(f"Created experiment: {experiment.id}")
# Output: Created experiment: exp_abc123
```

### Async Creation

```python
import asyncio
from basalt import Basalt

basalt = Basalt(api_key="your-api-key")

async def create_experiment():
    experiment = await basalt.experiments.create(
        feature_slug="llm-routing",
        name="Model Selection Experiment"
    )
    return experiment

experiment = asyncio.run(create_experiment())
```

## Running Experiments in a Loop

A common pattern is to process multiple items under the same experiment — for
example, evaluating a batch of test cases or support tickets.

Each `start_observe()` call naturally creates a **separate trace** (with its own
`trace_id`) because the context manager cleans up the OpenTelemetry context on
exit.  There is no need to recreate the `Basalt` client per iteration.

```python
from basalt import Basalt
from basalt.observability import start_observe, observe, ObserveKind

basalt = Basalt(api_key="your-api-key")

# 1. Create one experiment
experiment = basalt.experiments.create_sync(
    feature_slug="support-ticket",
    name="Support Ticket Analysis",
)

# 2. Loop — each iteration is a separate trace
test_cases = ["case-1", "case-2", "case-3"]

for case in test_cases:
    # Each start_observe() creates a new root span (new trace_id)
    with start_observe(
        name="analyse_case",
        feature_slug="support-ticket",
        experiment=experiment,
    ) as span:
        span.set_input({"case": case})

        # Child spans, LLM calls, tools, etc.
        result = process(case)

        observe.set_output({"result": result})

# 3. Shutdown ONCE at the end
basalt.shutdown()
```

> **Warning:** Do **not** call `basalt.shutdown()` inside the loop.  `shutdown()`
> permanently kills the global `TracerProvider` — all subsequent iterations would
> silently produce dead traces that are never exported.
