import { useState, useEffect, Suspense, lazy } from "react";
import { UserProvider } from "../entities/user/model/UserContext";
import { SnackbarProvider } from 'notistack';
import { CssBaseline, Container, Box, CircularProgress, GlobalStyles } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { useCallback } from 'react';

const WelcomeScreen = lazy(() => import("../widgets/welcome-screen/WelcomeScreen"));
const UserListPage = lazy(() => import("../pages/user-list/UserListPage"));

function App() {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const isFirstVisit = !localStorage.getItem('hasVisited');
    if (isFirstVisit) {
      setShowWelcome(true);
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  const handleCloseWelcome = useCallback(() => {
    setShowWelcome(false);
  }, []);

  const handleOpenWelcome = useCallback(() => {
    setShowWelcome(true);
  }, []);

  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <UserProvider>
        <CssBaseline />
        <GlobalStyles styles={{ body: { overflowY: 'scroll' } }} />
        <Suspense
          fallback={
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <CircularProgress />
            </Box>
          }
        >
          <AnimatePresence>
            {showWelcome ? (
              <WelcomeScreen onClose={handleCloseWelcome} />
            ) : (
              <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
                <UserListPage onShowWelcome={handleOpenWelcome} />
              </Container>
            )}
          </AnimatePresence>
        </Suspense>
      </UserProvider>
    </SnackbarProvider>
  );
}

export default App;