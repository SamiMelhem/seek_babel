import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("SimpleDIDRegistry", function () {
  let didRegistry: Contract;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const SimpleDIDRegistry = await ethers.getContractFactory("SimpleDIDRegistry");
    didRegistry = await SimpleDIDRegistry.deploy();
    await didRegistry.deployed();
  });

  describe("DID Registration", function () {
    it("Should register a new DID", async function () {
      const did = "did:example:123";
      const publicKeys = ["key1", "key2"];
      const services = ["service1"];

      await expect(didRegistry.registerDID(did, publicKeys, services))
        .to.emit(didRegistry, "DIDRegistered")
        .withArgs(did, owner.address);

      const [ownerAddr, keys, svcs, updated] = await didRegistry.getDIDDocument(did);
      expect(ownerAddr).to.equal(owner.address);
      expect(keys).to.deep.equal(publicKeys);
      expect(svcs).to.deep.equal(services);
    });

    it("Should not allow registering a DID that already exists", async function () {
      const did = "did:example:123";
      const publicKeys = ["key1"];
      const services = ["service1"];

      await didRegistry.registerDID(did, publicKeys, services);

      await expect(
        didRegistry.registerDID(did, publicKeys, services)
      ).to.be.revertedWith("DID already exists");
    });

    it("Should not allow an address to register multiple DIDs", async function () {
      const did1 = "did:example:123";
      const did2 = "did:example:456";
      const publicKeys = ["key1"];
      const services = ["service1"];

      await didRegistry.registerDID(did1, publicKeys, services);

      await expect(
        didRegistry.registerDID(did2, publicKeys, services)
      ).to.be.revertedWith("Address already has a DID");
    });
  });

  describe("DID Updates", function () {
    it("Should allow owner to update DID", async function () {
      const did = "did:example:123";
      const initialKeys = ["key1"];
      const initialServices = ["service1"];
      const newKeys = ["key1", "key2"];
      const newServices = ["service1", "service2"];

      await didRegistry.registerDID(did, initialKeys, initialServices);
      await expect(didRegistry.updateDID(did, newKeys, newServices))
        .to.emit(didRegistry, "DIDUpdated")
        .withArgs(did, owner.address);

      const [, keys, svcs] = await didRegistry.getDIDDocument(did);
      expect(keys).to.deep.equal(newKeys);
      expect(svcs).to.deep.equal(newServices);
    });

    it("Should not allow non-owner to update DID", async function () {
      const did = "did:example:123";
      const publicKeys = ["key1"];
      const services = ["service1"];

      await didRegistry.registerDID(did, publicKeys, services);

      await expect(
        didRegistry.connect(addr1).updateDID(did, publicKeys, services)
      ).to.be.revertedWith("Not the DID owner");
    });
  });

  describe("Public Key Management", function () {
    it("Should allow owner to add public key", async function () {
      const did = "did:example:123";
      const initialKeys = ["key1"];
      const services = ["service1"];
      const newKey = "key2";

      await didRegistry.registerDID(did, initialKeys, services);
      await expect(didRegistry.addPublicKey(did, newKey))
        .to.emit(didRegistry, "PublicKeyAdded")
        .withArgs(did, newKey);

      const [, keys] = await didRegistry.getDIDDocument(did);
      expect(keys).to.deep.equal([...initialKeys, newKey]);
    });

    it("Should not allow non-owner to add public key", async function () {
      const did = "did:example:123";
      const publicKeys = ["key1"];
      const services = ["service1"];

      await didRegistry.registerDID(did, publicKeys, services);

      await expect(
        didRegistry.connect(addr1).addPublicKey(did, "key2")
      ).to.be.revertedWith("Not the DID owner");
    });
  });

  describe("Service Management", function () {
    it("Should allow owner to add service", async function () {
      const did = "did:example:123";
      const publicKeys = ["key1"];
      const initialServices = ["service1"];
      const newService = "service2";

      await didRegistry.registerDID(did, publicKeys, initialServices);
      await expect(didRegistry.addService(did, newService))
        .to.emit(didRegistry, "ServiceAdded")
        .withArgs(did, newService);

      const [, , services] = await didRegistry.getDIDDocument(did);
      expect(services).to.deep.equal([...initialServices, newService]);
    });

    it("Should not allow non-owner to add service", async function () {
      const did = "did:example:123";
      const publicKeys = ["key1"];
      const services = ["service1"];

      await didRegistry.registerDID(did, publicKeys, services);

      await expect(
        didRegistry.connect(addr1).addService(did, "service2")
      ).to.be.revertedWith("Not the DID owner");
    });
  });
}); 