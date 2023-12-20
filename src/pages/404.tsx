import React from 'react'
import { useRouter } from 'next/router'

import { Container, Typography, Button, Grid } from '@mui/material'

const NotFoundPage = () => {
  
  const router = useRouter()

  return (
    <Container>
      <Grid container direction="column" justifyContent="center" alignItems="center" style={{ minHeight: '100vh', textAlign: 'center' }}>
        <Typography variant="h1" style={{ fontWeight: 'bold', color: 'black' }}>
          404
        </Typography>
        <Typography variant="h6" gutterBottom style={{ color: 'gray' }}>
          Page Not Found
        </Typography>
        <Button variant="text" style={{ borderColor: 'black', color: 'black' }} onClick={() => router.push('/')}>
          Go to Home
        </Button>
      </Grid>
    </Container>
  )
}
export default NotFoundPage