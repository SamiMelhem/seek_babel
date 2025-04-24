import { Box, Container } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box minH="100vh" bg="gray.50">
      <Container maxW="container.xl" py={4}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout; 