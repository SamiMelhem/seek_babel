import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

interface DIDDocument {
  did: string;
  publicKeys: string[];
  services: string[];
  controller: string;
  created: string;
  updated: string;
}

export const DIDRegistry: React.FC = () => {
  const [account, setAccount] = useState<string>('');
  const [did, setDid] = useState<string>('');
  const [didDocument, setDidDocument] = useState<DIDDocument | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    connectWallet();
  }, []);

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } else {
        setError('Please install MetaMask');
      }
    } catch (err) {
      setError('Error connecting to wallet');
      console.error(err);
    }
  };

  const createDID = async () => {
    try {
      setLoading(true);
      setError('');

      if (!window.ethereum) {
        throw new Error('Please install MetaMask');
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      const newDid = `did:ethr:${account.toLowerCase()}`;
      const publicKeys = [`${account.toLowerCase()}#keys-1`];
      const services = [`${account.toLowerCase()}#service-1`];

      const message = `Create DID: ${newDid}`;
      const signature = await signer.signMessage(message);

      console.log('Sending request to API...');
      const response = await fetch('http://localhost:3001/api/did/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          did: newDid,
          publicKeys,
          services,
          user: account,
          signature,
          message
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.error || 'Failed to create DID');
      }

      const data = await response.json();
      console.log('DID created successfully:', data);
      setDid(data.did);
      setDidDocument(data.document);
    } catch (err) {
      console.error('Error in createDID:', err);
      setError(err instanceof Error ? err.message : 'Error creating DID');
    } finally {
      setLoading(false);
    }
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to SeekBabel</h1>
        <p className="text-xl text-gray-300">
          Your Gateway to Decentralized Knowledge
        </p>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8">
        <div className="text-center">
          {!account ? (
            <div>
              <p className="text-gray-300 mb-4">
                Connect your wallet to begin your journey into decentralized knowledge sharing
              </p>
              <button
                onClick={connectWallet}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
              >
                Connect Wallet
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <span className="text-gray-400">Connected Account: </span>
                <span className="text-blue-400 font-mono">{shortenAddress(account)}</span>
              </div>
              
              {!did ? (
                <div>
                  <p className="text-gray-300 mb-4">
                    Create your decentralized identity to start using SeekBabel
                  </p>
                  <button
                    onClick={createDID}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 disabled:bg-gray-600"
                  >
                    {loading ? 'Creating...' : 'Create Digital Identity'}
                  </button>
                </div>
              ) : (
                <div className="text-left">
                  <div className="bg-gray-700 rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-white mb-4">Your Digital Identity</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-400 text-sm mb-1">DID</label>
                        <p className="text-white font-mono break-all">{did}</p>
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 text-sm mb-1">Controller</label>
                        <p className="text-white font-mono">{shortenAddress(didDocument?.controller || '')}</p>
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 text-sm mb-1">Public Keys</label>
                        <ul className="list-disc list-inside text-white">
                          {didDocument?.publicKeys.map((key, index) => (
                            <li key={index} className="font-mono break-all">{key}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 text-sm mb-1">Services</label>
                        <ul className="list-disc list-inside text-white">
                          {didDocument?.services.map((service, index) => (
                            <li key={index} className="font-mono break-all">{service}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-400 text-sm mb-1">Created</label>
                          <p className="text-white">{new Date(didDocument?.created || '').toLocaleString()}</p>
                        </div>
                        <div>
                          <label className="block text-gray-400 text-sm mb-1">Updated</label>
                          <p className="text-white">{new Date(didDocument?.updated || '').toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-900 text-red-200 p-4 rounded-lg mt-4">
          <p>{error}</p>
        </div>
      )}

      <div className="mt-8 bg-gray-800 rounded-lg shadow-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Coming Soon</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Feature
            title="User-Owned Content"
            description="Your posts, messages, and media are stored on a decentralized network"
          />
          <Feature
            title="No Ads or Algorithms"
            description="You choose how content is ranked and displayed"
          />
          <Feature
            title="Knowledge Mapping"
            description="Integrate content with mind-mapping tools for knowledge tracking"
          />
          <Feature
            title="Open-Source Protocol"
            description="Build and contribute to a shared library of knowledge"
          />
        </div>
      </div>
    </div>
  );
};

const Feature: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div className="bg-gray-700 rounded-lg p-4">
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
); 