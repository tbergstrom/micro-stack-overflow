import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import List from './components/List';
import Nav from './components/Nav';
import Form from './components/Form';
import ConfirmDelete from './components/ConfirmDelete';
import Login from './components/Login';
import jwtDecode from 'jwt-decode';
import AuthContext from './contexts/AuthContext';

function App() {
  
  const [panels, setPanels] = useState([]);
  const [user, setUser] = useState(null);

  const login = (token) => {
    // Decode the token
    const { sub: username, authorities: authoritiesString } = jwtDecode(token);
  
    // Split the authorities string into an array of roles
    const roles = authoritiesString.split(',');
  
    // Create the "user" object
    const user = {
      username,
      roles,
      token,
      hasRole(role) {
        return this.roles.includes(role);
      }
    };
    localStorage.setItem("auth-token", token)
    setUser(user);
    return user;
  };  

  const logout = () => {
    setUser(null)
    localStorage.removeItem("auth-token")
  }

  const auth = {
    login,
    logout,
    user
  }

  const loadPanels = () => {
    fetch("http://localhost:8080/api/solarpanel")
    .then(response => response.json())
    .then(payload => setPanels(payload))
  }

  useEffect(loadPanels, [])

  useEffect(() => {
    const token = localStorage.getItem("auth-token")
    if (token) {
      login(token)
    }
  }, []);

  return (
    <AuthContext.Provider value={auth}>
      <BrowserRouter>
        <h1>MICRO STACK OVERFLOW</h1>
        <Nav />

        <Routes>
          {/* always visible */}
          <Route path='/' element={<p>Click a link to get started</p>}/>
          <Route path="/list" element={<List />}/>
          <Route path='*' element={<p>Sorry, you must be logged in to see that.</p>} />

          {/* logged in only */}
          <Route path='/add' element={ user ? <Form /> : <Navigate to="/" /> }/>
          {/* <Route path='/edit/:id' element={ user ? <Form /> : <Navigate to="/" /> }/>
          <Route path='/delete/:id' element={ user ? <ConfirmDelete /> : <Navigate to="/" /> } /> */}

          {/* logged out only */}
          <Route path='/login' element={ user ?<Navigate to="/" /> : <Login /> }/>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;