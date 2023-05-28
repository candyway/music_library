import { Link,Route,Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import { useState } from 'react';
import Music from './pages/Music';
import Solomus from './pages/Solomus';
import { useEffect } from 'react';
import axios from 'axios';


function App() {

  const [name,setName] = useState('')
  const [artist,setArtist] = useState('')
  const [img,setImg] = useState('')
  const [music, setMusic] = useState([]);

  useEffect(() => {
   axios.get('http://localhost:8000/music').then((res) => setMusic(res.data));
  }, []);

  return (
    <div className="App bg-gradient-to-r from-violet-500 to-fuchsia-500 pt-20">
      <header className='flex justify-center'><h1 className='text-4xl'><Link to={'/music'}>Музыкальная библиотека</Link></h1></header>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/music' element={<Music name={name} setName={setName} artist={artist} setArtist={setArtist} img={img} setImg={setImg} music={music} setMusic={setMusic}/>}/>
        <Route path="/music/:id" element={<Solomus music={music} name={name} setName={setName} artist={artist} setArtist={setArtist} img={img} setImg={setImg} />}/>    
      </Routes>
      <footer class="bg-gray-800 text-white text-center mt-20 py-4 shadow">
  <p class="text-sm">Anyway Candyway</p>
</footer>

    </div>
  );
}

export default App;
