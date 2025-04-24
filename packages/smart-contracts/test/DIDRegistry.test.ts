import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";

describe("DIDRegistry", function () {
  let didRegistry: Contract;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async function () {
    // Get signers
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy contract
    const DIDRegistry = await ethers.getContractFactory("DIDRegistry");
    didRegistry = await DIDRegistry.deploy();
    await didRegistry.deployed();
  });

  describe("DID Creation", function () {
    it("Should create a new DID successfully", async function () {
      const did = "did:example:123";
      const publicKeys = ["key1", "key2"];
      const services = ["service1"];

      await expect(didRegistry.connect(addr1).createDID(did, publicKeys, services))
        .to.emit(didRegistry, "DIDCreated")
        .withArgs(did, addr1.address);

      // Verify DID document
      const [owner, keys, services_, updated] = await didRegistry.getDIDDocument(did);
      expect(owner).to.equal(addr1.address);
      expect(keys).to.deep.equal(publicKeys);
      expect(services_).to.deep.equal(services);
      expect(updated).to.be.gt(0);
    });

    it("Should not allow creating DID with same address", async function () {
      const did1 = "did:example:123";
      const did2 = "did:example:456";
      const publicKeys = ["key1"];
      const services = ["service1"];

      await didRegistry.connect(addr1).createDID(did1, publicKeys, services);

      await expect(
        didRegistry.connect(addr1).createDID(did2, publicKeys, services)
      ).to.be.revertedWith("Address already has a DID");
    });

    it("Should not allow creating same DID twice", async function () {
      const did = "did:example:123";
      const publicKeys = ["key1"];
      const services = ["service1"];

      await didRegistry.connect(addr1).createDID(did, publicKeys, services);

      await expect(
        didRegistry.connect(addr2).createDID(did, publicKeys, services)
      ).to.be.revertedWith("DID already exists");
    });
  });

  describe("DID Updates", function () {
    it("Should update DID document", async function () {
      const did = "did:example:123";
      const initialKeys = ["key1"];
      const initialServices = ["service1"];
      const newKeys = ["key1", "key2"];
      const newServices = ["service1", "service2"];

      await didRegistry.connect(addr1).createDID(did, initialKeys, initialServices);
      
      await expect(didRegistry.connect(addr1).updateDID(did, newKeys, newServices))
        .to.emit(didRegistry, "DIDUpdated")
        .withArgs(did, addr1.address);

      const [_, keys, services, updated] = await didRegistry.getDIDDocument(did);
      expect(keys).to.deep.equal(newKeys);
      expect(services).to.deep.equal(newServices);
    });

    it("Should not allow non-owner to update DID", async function () {
      const did = "did:example:123";
      const publicKeys = ["key1"];
      const services = ["service1"];

      await didRegistry.connect(addr1).createDID(did, publicKeys, services);

      await expect(
        didRegistry.connect(addr2).updateDID(did, publicKeys, services)
      ).to.be.revertedWith("Not the DID owner");
    });
  });

  describe("DID Queries", function () {
    it("Should return correct DID for address", async function () {
      const did = "did:example:123";
      const publicKeys = ["key1"];
      const services = ["service1"];

      await didRegistry.connect(addr1).createDID(did, publicKeys, services);

      const retrievedDID = await didRegistry.getDIDByAddress(addr1.address);
      expect(retrievedDID).to.equal(did);
    });
  });
}); 