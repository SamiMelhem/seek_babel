// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DIDRegistry {
    struct DIDDocument {
        string did;
        address owner;
        string[] publicKeys;
        string[] services;
        uint256 updated;
    }

    mapping(string => DIDDocument) private didDocuments;
    mapping(address => string) private addressToDID;

    event DIDCreated(string did, address owner);
    event DIDUpdated(string did, address owner);
    event PublicKeyAdded(string did, string publicKey);
    event ServiceAdded(string did, string service);

    modifier onlyOwner(string memory did) {
        require(didDocuments[did].owner == msg.sender, "Not the DID owner");
        _;
    }

    function createDID(string memory did, string[] memory publicKeys, string[] memory services) public {
        require(didDocuments[did].owner == address(0), "DID already exists");
        require(bytes(addressToDID[msg.sender]).length == 0, "Address already has a DID");

        didDocuments[did] = DIDDocument({
            did: did,
            owner: msg.sender,
            publicKeys: publicKeys,
            services: services,
            updated: block.timestamp
        });

        addressToDID[msg.sender] = did;

        emit DIDCreated(did, msg.sender);
    }

    function updateDID(string memory did, string[] memory publicKeys, string[] memory services) 
        public 
        onlyOwner(did) 
    {
        didDocuments[did].publicKeys = publicKeys;
        didDocuments[did].services = services;
        didDocuments[did].updated = block.timestamp;

        emit DIDUpdated(did, msg.sender);
    }

    function addPublicKey(string memory did, string memory publicKey) 
        public 
        onlyOwner(did) 
    {
        didDocuments[did].publicKeys.push(publicKey);
        didDocuments[did].updated = block.timestamp;

        emit PublicKeyAdded(did, publicKey);
    }

    function addService(string memory did, string memory service) 
        public 
        onlyOwner(did) 
    {
        didDocuments[did].services.push(service);
        didDocuments[did].updated = block.timestamp;

        emit ServiceAdded(did, service);
    }

    function getDIDDocument(string memory did) public view returns (
        address owner,
        string[] memory publicKeys,
        string[] memory services,
        uint256 updated
    ) {
        DIDDocument memory doc = didDocuments[did];
        return (doc.owner, doc.publicKeys, doc.services, doc.updated);
    }

    function getDIDByAddress(address addr) public view returns (string memory) {
        return addressToDID[addr];
    }
} 