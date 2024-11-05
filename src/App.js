// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Authenticate from './components/authenticate';
import AddRoommate from './components/Add Buddy/AddRoommate';
import WelcomePage from './components/WelcomePage';
import { auth } from './Config-DB/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import SearchRoom from './components/Add Room Or House/SearchRoom';
import FindRoommate from './components/Add Buddy/FindRoommate';
import Profile from './components/Profile';
import AddRoom from './components/Add Room Or House/AddRoom';
import './Loading.css'; 
import Admin from './components/Dashboard/Admin';
import AdDetailPagee from './components/Add Room Or House/AdDetailPage';
import BuddyDetailAd from './components/Add Buddy/BuddyDetailAd';
import ForgotPassword from './components/Authenticate/ForgotPassword';
import Yourad from './components/Your Ad/Youradd';
import UpdateAd from './components/Your Ad/Updateadd';
import UpdateBuddyAd from './components/Your Ad/UpdateAddbuddy';
import ThemeProvider from './context/ThemeContext';


function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="loading" style={{ margin: 'auto', marginTop: '300px' }}></div>
    );
  }

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/admin" element={<Admin />} />
          
          <Route path="/auth" element={!isAuthenticated ? <Authenticate /> : <Navigate to="/WelcomePage" />} />
          <Route path="/WelcomePage" element={isAuthenticated ? <WelcomePage /> : <Navigate to="/auth" />} />
          <Route path="/SearchRoom" element={isAuthenticated ? <SearchRoom /> : <Navigate to="/auth" />} />
          <Route path="/FindRoommate" element={isAuthenticated ? <FindRoommate /> : <Navigate to="/auth" />} />
          <Route path="/Profile" element={isAuthenticated ? <Profile /> : <Navigate to="/auth" />} />
          <Route path="/AddRoom" element={isAuthenticated ? <AddRoom /> : <Navigate to="/auth" />} />
          <Route path="/room/:id" element={isAuthenticated ? <AdDetailPagee /> : <Navigate to="/auth" />} />
          <Route path="/AddRoommate" element={isAuthenticated ? <AddRoommate /> : <Navigate to="/auth" />} />
          <Route path="/buddy/:id" element={isAuthenticated ? <BuddyDetailAd /> : <Navigate to="/auth" />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/Your_ad" element={isAuthenticated ? <Yourad /> : <Navigate to="/auth" />} />
          <Route path="/update/:id" element={isAuthenticated ? <UpdateAd /> : <Navigate to="/auth" />} />
          <Route path="/updatebuddy/:id" element={isAuthenticated ? <UpdateBuddyAd /> : <Navigate to="/auth" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
