import { Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthContextProvider } from './contexts/AuthContextProvider';
import Home from './pages/Home';
import Policy from './pages/legal/Policy';
import Terms from './pages/legal/Terms';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import Signup from './pages/SignUp';
import Add from './pages/time/Add';

const App = () => {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/legal/terms" element={<Terms />} />
        <Route path="/legal/policy" element={<Policy />} />
        <Route path="/test" element={<ProtectedRoute>OKAYYYY</ProtectedRoute>} />

        <Route
          path="/time/add"
          element={
            <ProtectedRoute>
              <Add />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
