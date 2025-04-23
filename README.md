# SeekBabel Monorepo

This monorepo contains all the components of the SeekBabel project, including smart contracts, API, and frontend.

## Project Structure

```
packages/
├── smart-contracts/    # Ethereum smart contracts
├── api/               # Express.js API server
└── frontend/          # Next.js frontend application
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Hardhat (for smart contract development)
- MetaMask or similar Web3 wallet

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
   - Copy `.env.example` to `.env` in each package directory
   - Fill in the required environment variables

3. Start development servers:

```bash
# Start all services
npm run dev

# Or start individual services
npm run dev --workspace=@seekbabel/smart-contracts
npm run dev --workspace=@seekbabel/api
npm run dev --workspace=@seekbabel/frontend
```

## Available Scripts

- `npm run dev` - Start all services in development mode
- `npm run build` - Build all packages
- `npm run test` - Run tests for all packages
- `npm run lint` - Run linting for all packages

## Smart Contracts

The smart contracts package contains the Ethereum smart contracts for decentralized identity management.

### Commands
- `npm run compile` - Compile smart contracts
- `npm run test` - Run smart contract tests
- `npm run deploy` - Deploy smart contracts to the network

## API

The API package contains the Express.js server that handles communication between the frontend and smart contracts.

### Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

## Frontend

The frontend package contains the Next.js application that provides the user interface.

### Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

MIT 