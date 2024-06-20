import { Box, Container } from '@chakra-ui/react'
import React from 'react'

function Footer() {
  return (
    <div>
        <Container maxW='100%' bg='pink.600' centerContent>
  <Box padding='4' bg='pink.500' color='white' maxW='80%'>
  This project assignment has been prepared by Saliha Kotan for the 'Kodluyoruz' GraphQL course. It is a real-time voting application that includes both backend and client and works with GraphQL.

  </Box>
</Container>

    </div>
  )
}

export default Footer