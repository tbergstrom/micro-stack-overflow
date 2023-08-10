
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Login from './components/login';
import Home from './components/Home';

import jwtDecode from 'jwt-decode';
import AuthContext from './contexts/AuthContext';


function App() {
  
  const [posts, setPosts] = useState([]);
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

  const loadPosts = () => {
    fetch("http://localhost:8080/api/post")
    .then(response => response.json())
    .then(payload => setPosts(payload))
  }

  useEffect(loadPosts, [])

  useEffect(() => {
    const token = localStorage.getItem("auth-token")
    if (token) {
      login(token)
    }
  }, []);

  return (

    <AuthContext.Provider value={auth}>
      <BrowserRouter>
        <Nav />

        <Routes>
          {/* always visible */}
          <Route path='/' element={<Home />}/>
          <Route path="/postlist" element={<PostList />}/>
          <Route path='*' element={<p>Page Not Found</p>} />

          {/* logged in only */}
          <Route path='/addpost' element={ user ? <PostForm /> : <Navigate to="/" /> }/>

          {/* logged out only */}
          <Route path='/login' element={ user ? <Navigate to="/" /> : <Login /> }/>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
