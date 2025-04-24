# System Architecture

```mermaid
graph TD
    subgraph "Decentralized Identity"
        DID[Decentralized Identity]
        DID_Doc[DID Document]
        VC[Verifiable Credentials]
        DID --> DID_Doc
        DID_Doc --> VC
    end

    subgraph "IPFS Network"
        IPFS[IPFS Node]
        CID[Content Identifier]
        Storage[Distributed Storage]
        IPFS --> CID
        CID --> Storage
    end

    subgraph "Next.js Frontend"
        UI[User Interface]
        API[API Routes]
        Auth[Authentication]
        UI --> API
        API --> Auth
    end

    %% Connections between components
    DID -->|"Store DID Document"| IPFS
    IPFS -->|"Retrieve Data"| API
    Auth -->|"Verify Identity"| DID
    VC -->|"Store Credentials"| IPFS
    Storage -->|"Serve Content"| UI

    %% Styling
    classDef default fill:#f9f9f9,stroke:#333,stroke-width:2px;
    classDef subgraph fill:#e1f5fe,stroke:#01579b,stroke-width:2px;
```

## Component Description

### Decentralized Identity
- **DID (Decentralized Identifier)**: Unique identifier for the user
- **DID Document**: Contains public keys and service endpoints
- **Verifiable Credentials**: Digital credentials that can be verified cryptographically

### IPFS Network
- **IPFS Node**: Peer in the IPFS network
- **Content Identifier (CID)**: Unique identifier for content stored in IPFS
- **Distributed Storage**: Decentralized storage of data across the IPFS network

### Next.js Frontend
- **User Interface**: React-based frontend components
- **API Routes**: Server-side API endpoints
- **Authentication**: Handles user authentication and authorization

## Data Flow
1. User creates/authenticates with their decentralized identity
2. DID documents and verifiable credentials are stored in IPFS
3. Frontend retrieves necessary data from IPFS through API routes
4. Content is served to users through the Next.js frontend
5. Authentication is handled through the decentralized identity system 