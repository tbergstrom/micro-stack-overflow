
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PostList from './components/PostList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
