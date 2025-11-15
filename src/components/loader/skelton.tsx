import {
  Box,
  CardContent,
  Container,
  Grid,
  Skeleton,
  Stack,
} from "@mui/material"
export const LoadingComponent: React.FC = () => (
  <Container maxWidth="lg" sx={{ py: 4 }}>
    <Box sx={{ textAlign: "center", mb: 4 }}>
      <Skeleton
        variant="text"
        width={300}
        height={80}
        sx={{ mx: "auto", mb: 2 }}
      />
      <Skeleton variant="text" width={200} height={40} sx={{ mx: "auto" }} />
    </Box>
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {[1, 2, 3].map((i) => (
        <Grid item xs={12} md={4} key={i}>
          <CardContent>
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              sx={{ mx: "auto", mb: 2 }}
            />
            <Skeleton variant="text" height={32} sx={{ mb: 1 }} />
            <Skeleton variant="text" height={48} sx={{ mb: 1 }} />
            <Skeleton variant="text" height={24} />
          </CardContent>
        </Grid>
      ))}
    </Grid>
    <Stack spacing={2}>
      {[1, 2, 3, 4, 5, 6, 7].map((i) => (
        <Skeleton
          key={i}
          variant="rectangular"
          height={80}
          sx={{ borderRadius: 2 }}
        />
      ))}
    </Stack>
  </Container>
)
