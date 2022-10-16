import './App.css';
import Navbar from './components/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router } from "react-router-dom";
import {RoutesContext} from './contexts/RoutesContext';

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
        <div>
          <Navbar />
        </div>
          <RoutesContext/>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;