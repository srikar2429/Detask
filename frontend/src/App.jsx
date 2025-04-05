import { Provider } from "@/components/ui/provider";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen.jsx';
import ProfileScreen from "./pages/ProfileScreen.jsx";
import Loader from "./components/Loader";

function App() {
  return (
    <>
      <Provider>
        <Router>
          <Loader />
          <Routes>
            <Route path="/" element={<ProfileScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App
