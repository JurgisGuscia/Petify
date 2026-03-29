import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/Login';
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import Register from '../pages/Register/Register';
import Home from '../pages/Home/Home';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/Register" element={<Register />} />

        <Route
          path="/Home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
