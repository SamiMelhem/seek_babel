import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Head>
        <title>SeekBabel - The Digital Library of Knowledge</title>
        <meta name="description" content="A decentralized library of human knowledge, inspired by Borges' Library of Babel" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center space-x-2">
                  <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span className="text-2xl font-bold bg-gradient-to-r from-amber-200 to-amber-500 text-transparent bg-clip-text">
                    SeekBabel
                  </span>
                </Link>
              </div>
              <div className="hidden md:flex space-x-4">
                <Link href="/explore" className="text-slate-300 hover:text-amber-500 transition-colors">
                  Explore
                </Link>
                <Link href="/contribute" className="text-slate-300 hover:text-amber-500 transition-colors">
                  Contribute
                </Link>
                <Link href="/about" className="text-slate-300 hover:text-amber-500 transition-colors">
                  About
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-slate-900/50 backdrop-blur-sm border-t border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-amber-500 font-semibold mb-4">About SeekBabel</h3>
              <p className="text-slate-400">
                A decentralized platform for preserving and sharing human knowledge, 
                inspired by Jorge Luis Borges' Library of Babel.
              </p>
            </div>
            <div>
              <h3 className="text-amber-500 font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/docs" className="text-slate-400 hover:text-amber-500 transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="text-slate-400 hover:text-amber-500 transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/governance" className="text-slate-400 hover:text-amber-500 transition-colors">
                    Governance
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-amber-500 font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://github.com/seekbabel" target="_blank" rel="noopener noreferrer" 
                     className="text-slate-400 hover:text-amber-500 transition-colors">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/seekbabel" target="_blank" rel="noopener noreferrer"
                     className="text-slate-400 hover:text-amber-500 transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="https://discord.gg/seekbabel" target="_blank" rel="noopener noreferrer"
                     className="text-slate-400 hover:text-amber-500 transition-colors">
                    Discord
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-700/50 text-center">
            <p className="text-slate-400">
              SeekBabel - Building the Library of Human Knowledge
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}; 