import type { NextPage } from 'next';
import { Layout } from '../components/Layout';
import { DIDRegistry } from '../components/DIDRegistry';

const Home: NextPage = () => {
  return (
    <Layout>
      <DIDRegistry />
    </Layout>
  );
};

export default Home; 