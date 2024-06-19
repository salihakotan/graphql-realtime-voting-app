import { Box, Container } from '@chakra-ui/react'
import React from 'react'

function Footer() {
  return (
    <div>
        <Container maxW='100%' bg='pink.600' centerContent>
  <Box padding='4' bg='pink.500' color='white' maxW='80%'>
  This project assignment has been prepared for the 'Kodluyoruz' GraphQL course.
  </Box>
</Container>

    </div>
  )
}

export default Footer