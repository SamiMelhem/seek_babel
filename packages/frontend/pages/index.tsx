import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading as="h1" size="2xl" mb={4}>
            Welcome to SeekBabel
          </Heading>
          <Text fontSize="xl">
            A decentralized platform for secure and private communication
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="xl" mb={4}>
            Features
          </Heading>
          <VStack align="stretch" spacing={4}>
            <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
              <Heading as="h3" size="md" mb={2}>
                Decentralized Identity
              </Heading>
              <Text>Secure and private identity management using blockchain technology</Text>
            </Box>

            <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
              <Heading as="h3" size="md" mb={2}>
                IPFS Storage
              </Heading>
              <Text>Distributed storage for your data using IPFS</Text>
            </Box>

            <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
              <Heading as="h3" size="md" mb={2}>
                ActivityPub Integration
              </Heading>
              <Text>Connect with other decentralized platforms using ActivityPub</Text>
            </Box>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Home; 