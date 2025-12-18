/**
 * VIEW LAYER - Home.jsx
 * 
 * Responsibility: Display the home page UI
 * This is a View because it:
 * 1. Contains only UI logic and presentation
 * 2. Does not contain business logic
 * 3. Calls Controller methods to handle user actions
 * 4. Displays data received from Controller
 */

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Stack,
  Chip,
} from '@mui/material';
import GavelIcon from '@mui/icons-material/Gavel';
import DescriptionIcon from '@mui/icons-material/Description';
import SchoolIcon from '@mui/icons-material/School';
import BoltIcon from '@mui/icons-material/Bolt';
import '../styles/Home.css';

const Home = () => {
  return (
    <Box className="home-container">
      {/* VIEW: Top navigation bar */}
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto' }}>
          <GavelIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            LegalHelpBuddy
          </Typography>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/documents">
            Documents
          </Button>
          <Button color="inherit" component={RouterLink} to="/guides">
            Legal Guides
          </Button>
        </Toolbar>
      </AppBar>

      {/* VIEW: Hero section */}
      <Box sx={{ py: 8, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="overline" color="secondary" sx={{ letterSpacing: 1 }}>
                Auto-Generated Legal Documents & Guides
              </Typography>
              <Typography
                variant="h3"
                component="h1"
                sx={{ fontWeight: 700, mt: 1, mb: 2 }}
              >
                Your friendly legal document assistant.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Generate college-appropriate legal documents in minutes. No payments, no
                jargon — just guided forms, live previews, and clear legal tips.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  component={RouterLink}
                  to="/documents"
                  startIcon={<DescriptionIcon />}
                >
                  Generate a Document
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  color="primary"
                  component={RouterLink}
                  to="/guides"
                  startIcon={<SchoolIcon />}
                >
                  Browse Legal Guides
                </Button>
              </Stack>
              <Stack direction="row" spacing={1.5} sx={{ mt: 4 }} flexWrap="wrap">
                <Chip label="Step-by-step wizard" variant="outlined" size="small" />
                <Chip label="Live preview" variant="outlined" size="small" />
                <Chip label="Download as PDF" variant="outlined" size="small" />
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              {/* VIEW: Simple illustrative stats / feature card */}
              <Card
                elevation={3}
                sx={{
                  borderRadius: 3,
                  p: 2,
                  background:
                    'linear-gradient(135deg, rgba(27,50,95,0.95), rgba(199,154,59,0.9))',
                  color: 'common.white',
                }}
              >
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                    <BoltIcon fontSize="small" />
                    <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>
                      Fast and guided
                    </Typography>
                  </Stack>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                    Start with a template, finish with confidence.
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Answer a few simple questions and LegalHelpBuddy generates clean, structured
                    documents you can download, copy, or edit anytime.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* VIEW: Feature cards */}
      <Box sx={{ py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
            Popular document types
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Card elevation={1}>
                <CardContent>
                  <Typography variant="h6">Affidavit</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    A sworn statement of fact that can be used in legal or academic contexts.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    component={RouterLink}
                    to="/documents"
                    color="primary"
                  >
                    Create
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card elevation={1}>
                <CardContent>
                  <Typography variant="h6">Rental Agreement</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    A simple agreement between landlord and tenant, great for student housing.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    component={RouterLink}
                    to="/documents"
                    color="primary"
                  >
                    Create
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card elevation={1}>
                <CardContent>
                  <Typography variant="h6">Non‑Disclosure Agreement</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Protect your project or startup idea when sharing it with others.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    component={RouterLink}
                    to="/documents"
                    color="primary"
                  >
                    Create
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* VIEW: Simple footer / disclaimer */}
      <Box sx={{ py: 3, borderTop: 1, borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Typography variant="caption" color="text.secondary">
            Disclaimer: LegalHelpBuddy provides educational templates only and is not a
            substitute for professional legal advice. Always consult a qualified lawyer for
            important legal matters.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
