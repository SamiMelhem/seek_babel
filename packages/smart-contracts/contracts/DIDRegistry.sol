// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract DIDRegistry is Ownable {
    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;

    struct DIDDocument {
        string did;
        address owner;
        string[] publicKeys;
        string[] services;
        uint256 updated;
        bool isActive;
    }

    mapping(string => DIDDocument) private didDocuments;
    mapping(address => string) private addressToDID;
    mapping(address => bool) private isRelayer;

    event DIDCreated(string did, address owner);
    event DIDUpdated(string did, address owner);
    event PublicKeyAdded(string did, string publicKey);
    event ServiceAdded(string did, string service);
    event RelayerAdded(address relayer);
    event RelayerRemoved(address relayer);

    modifier onlyRelayer() {
        require(isRelayer[msg.sender], "Not an authorized relayer");
        _;
    }

    constructor(address initialOwner) Ownable(initialOwner) {
        isRelayer[msg.sender] = true;
    }

    function addRelayer(address relayer) external onlyOwner {
        isRelayer[relayer] = true;
        emit RelayerAdded(relayer);
    }

    function removeRelayer(address relayer) external onlyOwner {
        isRelayer[relayer] = false;
        emit RelayerRemoved(relayer);
    }

    function verifySignature(bytes32 messageHash, bytes memory signature, address signer) internal pure returns (bool) {
        bytes32 ethSignedMessageHash = messageHash.toEthSignedMessageHash();
        address recoveredSigner = ethSignedMessageHash.recover(signature);
        return recoveredSigner == signer;
    }

    function createDID(
        string memory did,
        string[] memory publicKeys,
        string[] memory services,
        bytes memory signature
    ) public {
        require(didDocuments[did].owner == address(0), "DID already exists");
        require(bytes(addressToDID[msg.sender]).length == 0, "Address already has a DID");

        // Verify the signature
        bytes32 messageHash = keccak256(abi.encodePacked(did, msg.sender));
        require(verifySignature(messageHash, signature, msg.sender), "Invalid signature");

        didDocuments[did] = DIDDocument({
            did: did,
            owner: msg.sender,
            publicKeys: publicKeys,
            services: services,
            updated: block.timestamp,
            isActive: true
        });

        addressToDID[msg.sender] = did;

        emit DIDCreated(did, msg.sender);
    }

    function createDIDGasless(
        string memory did,
        string[] memory publicKeys,
        string[] memory services,
        address user,
        bytes memory signature
    ) external onlyRelayer {
        require(didDocuments[did].owner == address(0), "DID already exists");
        require(bytes(addressToDID[user]).length == 0, "Address already has a DID");

        // Verify the signature
        bytes32 messageHash = keccak256(abi.encodePacked(did, user));
        require(verifySignature(messageHash, signature, user), "Invalid signature");

        didDocuments[did] = DIDDocument({
            did: did,
            owner: user,
            publicKeys: publicKeys,
            services: services,
            updated: block.timestamp,
            isActive: true
        });

        addressToDID[user] = did;

        emit DIDCreated(did, user);
    }

    function updateDID(
        string memory did,
        string[] memory publicKeys,
        string[] memory services
    ) public {
        require(didDocuments[did].owner == msg.sender, "Not the DID owner");
        require(didDocuments[did].isActive, "DID is not active");

        didDocuments[did].publicKeys = publicKeys;
        didDocuments[did].services = services;
        didDocuments[did].updated = block.timestamp;

        emit DIDUpdated(did, msg.sender);
    }

    function addPublicKey(string memory did, string memory publicKey) public {
        require(didDocuments[did].owner == msg.sender, "Not the DID owner");
        require(didDocuments[did].isActive, "DID is not active");

        didDocuments[did].publicKeys.push(publicKey);
        didDocuments[did].updated = block.timestamp;

        emit PublicKeyAdded(did, publicKey);
    }

    function addService(string memory did, string memory service) public {
        require(didDocuments[did].owner == msg.sender, "Not the DID owner");
        require(didDocuments[did].isActive, "DID is not active");

        didDocuments[did].services.push(service);
        didDocuments[did].updated = block.timestamp;

        emit ServiceAdded(did, service);
    }

    function getDIDDocument(string memory did) public view returns (
        address owner,
        string[] memory publicKeys,
        string[] memory services,
        uint256 updated,
        bool isActive
    ) {
        DIDDocument memory doc = didDocuments[did];
        return (doc.owner, doc.publicKeys, doc.services, doc.updated, doc.isActive);
    }

    function getDIDByAddress(address addr) public view returns (string memory) {
        return addressToDID[addr];
    }

    function deactivateDID(string memory did) public {
        require(didDocuments[did].owner == msg.sender, "Not the DID owner");
        didDocuments[did].isActive = false;
    }
} 