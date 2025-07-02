<p align="center">
  <img src="logo/logo_readme.png?raw=true" alt="Basalt logo"/>
</p>

# Basalt AI Documentation

Official documentation for Basalt AI - the comprehensive platform for prompt management, AI monitoring, and experimentation.

## About Basalt

Basalt AI provides developers with powerful tools to manage prompts, monitor AI applications, and run experiments. This repository contains the complete documentation for the Basalt platform, including guides, API references, and examples.

## Documentation Features

- **Prompt Management**: Learn how to create, deploy, and manage prompts at scale
- **AI Monitoring**: Monitor your AI applications with detailed analytics and tracing
- **Experiments**: Run A/B tests and experiments on your AI features
- **Datasets**: Manage and organize your AI training and testing datasets
- **API Reference**: Complete documentation for all Basalt APIs

## Quick Links

- 📖 [Documentation Site](https://docs.getbasalt.ai)
- 🚀 [Get Started](https://docs.getbasalt.ai/quickstart)
- 🖥️ [Dashboard](https://app.getbasalt.ai)
- 📧 [Support](mailto:support@getbasalt.ai)

## Development

This documentation is built with [Mintlify](https://mintlify.com).

### Prerequisites

- Node.js 16+
- Mintlify CLI

### Setup

1. Install the Mintlify CLI:
   ```bash
   npm i -g mintlify
   ```

2. Clone this repository:
   ```bash
   git clone https://github.com/basalt-ai/basalt-docs.git
   cd basalt-docs
   ```

3. Start the development server:
   ```bash
   mintlify dev
   ```

The documentation will be available at `http://localhost:3000`.

### Making Changes

1. Edit the relevant `.mdx` files
2. Preview changes locally with `mintlify dev`
3. Submit a pull request

Changes are automatically deployed to production when merged to the main branch.

### Troubleshooting

- If `mintlify dev` isn't running, try `mintlify install` to reinstall dependencies
- Ensure you're running the command in the directory containing `docs.json`
- Check that all file paths in `docs.json` match the actual file locations

## Repository Structure

```
├── api-reference/     # API documentation
├── datasets/         # Dataset management guides
├── experiments/      # Experimentation guides
├── images/          # Documentation images
├── logo/            # Basalt logos
├── monitoring/      # AI monitoring guides
├── prompts/         # Prompt management guides
├── snippets/        # Reusable documentation components
├── docs.json        # Mintlify configuration
├── introduction.mdx # Getting started guide
├── quickstart.mdx   # Quick start tutorial
└── installation.mdx # Installation instructions
```

## Contributing

We welcome contributions to improve the documentation. Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `mintlify dev`
5. Submit a pull request

## Support

- 📧 Email: [support@getbasalt.ai](mailto:support@getbasalt.ai)
- 📖 Documentation: [docs.getbasalt.ai](https://docs.getbasalt.ai)
- 🐛 Issues: [GitHub Issues](https://github.com/basalt-ai/basalt-docs/issues)

## License

Copyright © 2024 Basalt AI. All rights reserved.
