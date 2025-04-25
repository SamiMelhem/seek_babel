# SeekBabel - The Digital Library of Knowledge

SeekBabel is a decentralized platform for preserving and sharing human knowledge, inspired by Jorge Luis Borges' Library of Babel. It combines blockchain technology, decentralized storage, and modern web technologies to create a user-owned knowledge platform.

## Features

- **Decentralized Identity (DID)**: Users control their own identity and data
- **User-Owned Content**: Posts, messages, and media stored on decentralized networks
- **No Ads or Algorithms**: Users choose how content is ranked and displayed
- **Knowledge Mapping**: Content integrates with mind-mapping tools
- **Open-Source Protocol**: Third-party applications can build on the platform

## Project Structure

```
packages/
├── smart-contracts/    # Ethereum smart contracts for DID and content ownership
├── api/               # Express.js API server with IPFS integration
└── frontend/          # Next.js frontend with Tailwind CSS
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MetaMask or similar Web3 wallet
- Infura account for IPFS (optional)

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/seekbabel.git
cd seekbabel
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in each package directory
   - Required variables:
     - Smart Contracts: `PRIVATE_KEY`, `NETWORK_URL`
     - API: `PORT` (default: 3001)
     - Frontend: None required

4. Start development servers:
```bash
# Start all services
npm run dev

# Or start individual services
npm run dev --workspace=@seekbabel/smart-contracts
npm run dev --workspace=@seekbabel/api
npm run dev --workspace=@seekbabel/frontend
```

## Core Components

### Smart Contracts
- DID Registry for decentralized identity management
- Content ownership and verification
- Governance mechanisms (coming soon)

### API Server
- Express.js backend
- DID document management
- Content storage and retrieval
- Knowledge graph integration (coming soon)

### Frontend
- Modern, responsive UI inspired by the Library of Babel
- Seamless Web3 integration
- Knowledge visualization tools (coming soon)
- Community features (coming soon)

## Development

### Available Scripts

- `npm run dev` - Start all services in development mode
- `npm run build` - Build all packages
- `npm run test` - Run tests for all packages
- `npm run lint` - Run linting for all packages

### Smart Contracts
```bash
cd packages/smart-contracts
npm run compile    # Compile contracts
npm run test      # Run tests
npm run deploy    # Deploy to network
```

### API
```bash
cd packages/api
npm run dev       # Start development server
npm run build    # Build for production
npm run start    # Start production server
```

### Frontend
```bash
cd packages/frontend
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
```

## Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request

## Roadmap

- [x] Decentralized Identity (DID) implementation
- [x] Basic frontend with Web3 integration
- [ ] Knowledge mapping and visualization
- [ ] Content storage on IPFS
- [ ] Community features and governance
- [ ] Third-party integration API
- [ ] Mobile application

## License

MIT

## Connect

- [Website](https://seekbabel.org)
- [GitHub](https://github.com/seekbabel)
- [Twitter](https://twitter.com/seekbabel)
- [Discord](https://discord.gg/seekbabel) 