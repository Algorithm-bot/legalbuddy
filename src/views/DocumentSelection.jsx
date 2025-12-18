/**
 * VIEW LAYER - DocumentSelection.jsx
 * 
 * Responsibility: Display available document types for selection
 * This is a View because it:
 * 1. Only handles UI rendering
 * 2. Uses Controller to get document list
 * 3. Passes user selection to next view via navigation
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Chip,
  Skeleton,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import FolderIcon from '@mui/icons-material/Folder';
import { getAllDocuments } from '../controllers/DocumentController';
import '../styles/DocumentSelection.css';

const DocumentSelection = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState(null);
  const navigate = useNavigate();

  // VIEW: Call Controller when component loads to get document list
  useEffect(() => {
    const loadDocuments = () => {
      const docs = getAllDocuments();
      setDocuments(docs);
      setSelectedType(docs[0]?.type || null);
      setLoading(false);
    };
    loadDocuments();
  }, []);

  // VIEW: Handle user click - navigate to form with selected document type
  const handleDocumentSelect = (documentType) => {
    navigate(`/documents/${documentType}/form`);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Skeleton variant="rectangular" height={260} />
          </Grid>
          <Grid item xs={12} md={9}>
            <Skeleton variant="rectangular" height={80} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={180} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* VIEW: Sidebar with document categories */}
          <Grid item xs={12} md={3}>
            <Card elevation={1}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <FolderIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="subtitle1" fontWeight={600}>
                    Document categories
                  </Typography>
                </Box>
                <List>
                  {documents.map((doc) => (
                    <ListItemButton
                      key={doc.type}
                      selected={selectedType === doc.type}
                      onClick={() => setSelectedType(doc.type)}
                    >
                      <ListItemText
                        primary={doc.title}
                        secondary={doc.category || 'General'}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* VIEW: Main content with cards */}
          <Grid item xs={12} md={9}>
            <Box mb={2}>
              <Typography variant="h4" fontWeight={600} gutterBottom>
                Select a document type
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Choose the document you want to generate. You’ll be guided through a
                step‑by‑step form with live preview.
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {documents.map((doc) => (
                <Grid item xs={12} sm={6} key={doc.type}>
                  <Card
                    className="document-card"
                    elevation={selectedType === doc.type ? 3 : 1}
                    sx={{
                      height: '100%',
                      border:
                        selectedType === doc.type
                          ? '1px solid rgba(199,154,59,0.6)'
                          : '1px solid rgba(0,0,0,0.03)',
                    }}
                  >
                    <CardContent>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        mb={1}
                      >
                        <Typography variant="h6">{doc.title}</Typography>
                        <DescriptionIcon color="primary" />
                      </Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1.5 }}
                      >
                        {doc.description}
                      </Typography>
                      {doc.tags && doc.tags.length > 0 && (
                        <Box display="flex" flexWrap="wrap" gap={0.5}>
                          {doc.tags.map((tag) => (
                            <Chip key={tag} label={tag} size="small" variant="outlined" />
                          ))}
                        </Box>
                      )}
                    </CardContent>
                    <Divider />
                    <CardActions sx={{ justifyContent: 'space-between', px: 2, py: 1.5 }}>
                      <Typography variant="caption" color="text.secondary">
                        Est. time: {doc.estimatedTime || '3–5 minutes'}
                      </Typography>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleDocumentSelect(doc.type)}
                      >
                        Start
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box mt={3} display="flex" justifyContent="space-between">
              <Button onClick={() => navigate('/')} color="inherit">
                ← Back to home
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DocumentSelection;
