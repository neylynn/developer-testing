// components/Layout.js

import React from 'react';
import Head from 'next/head';

const Layout = ({ children }) => (
  <div>
    <Head>
      <title>Real Estate Listings</title>
      <meta name="description" content="Search for real estate properties" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <header>
      <h1>Real Estate Listings</h1>
    </header>
    <main>{children}</main>
    <footer>
      <p>&copy; 2024 Real Estate Inc.</p>
    </footer>
    <style jsx>{`
      header {
        padding: 1rem;
        background: #333;
        color: #fff;
        text-align: center;
      }
      main {
        padding: 1rem;
      }
      footer {
        padding: 1rem;
        background: #333;
        color: #fff;
        text-align: center;
      }
    `}</style>
  </div>
);

export default Layout;
