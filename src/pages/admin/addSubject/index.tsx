// AddSubject.tsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Alert,
} from "@mui/material";

export const AddSubject: React.FC = () => {
  const [subjectName, setSubjectName] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your submit logic here
    console.log({ subjectName, description });
    setSuccess(true);
    setSubjectName("");
    setDescription("");
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Add Subject
      </Typography>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 600 }}>
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Subject added successfully!
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subject Name"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Add Subject
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};
