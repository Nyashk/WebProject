import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useParams
} from 'react-router-dom';

import LoginForm      from './pages/LoginForm';
import RegisterForm   from './pages/RegisterForm';
import MainPage       from './pages/MainPage';
import SearchPage     from './pages/SearchPage';
import NotFoundPage   from './pages/NotFoundPage';
import Header         from './components/Header';
import ArtDetailPage  from './pages/ArtDetailPage';
import UserPage       from './pages/UserPage';
import UserProfile    from './pages/UserProfile';
import UploadArtPage  from './pages/UploadArtPage';

import './styles.css';

const UserProfileWrapper = () => {
  const { username } = useParams();
  return <UserProfile userId={username} />;
};

const AppContent = () => {
  const location   = useLocation();
  const hideOn     = ['/login', '/register'];
  const showHeader = !hideOn.includes(location.pathname);

  return (
    <>
      {showHeader && <Header />}
      <div className="app-container">
        <Routes>
          <Route path="/"         element={<Navigate to="/main" replace />} />
          <Route path="/login"    element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/main"     element={<MainPage />} />
          <Route path="/search"   element={<SearchPage />} />
          <Route path="/me"       element={<UserPage />} />
          <Route path="/user/:username" element={<UserProfileWrapper />} />
          <Route path="/upload"   element={<UploadArtPage />} />
          <Route path="/art/:id"  element={<ArtDetailPage />} />
          <Route path="*"          element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => (
  <div className="background">
    <Router>
      <AppContent />
    </Router>
  </div>
);

export default App;