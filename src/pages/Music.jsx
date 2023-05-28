import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Music = ({ name, setName, artist, setArtist, img, setImg, music, setMusic }) => {

  const addMusic = () => {
    axios
      .post('http://localhost:8000/music', {
        name: name,
        artist: artist,
        img: img,
      })
      .then((res) => {
        setMusic([ ...music,res.data]);
        setName('');
        setArtist('');
        setImg('');
        
      });
  };

  const deleteMusic = (id) => {
    axios.delete(`http://localhost:8000/music/${id}`).then(() => {
      const newMusic = music.filter((mus) => mus.id !== id);
      setMusic(newMusic);
    });
  };

  return (
    <div className='md:container md:mx-auto'>
      <div className='flex justify-center mt-10 mb-20'>
        <input type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Song'
          className='w-64 p-2 rounded border border-gray-300 mr-2'/>
        <input type='text'
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          placeholder='Artist(s)'
          className='w-64 p-2 rounded border border-gray-300 mr-2'/>
        <input type='text'
          value={img}
          onChange={(e) => setImg(e.target.value)}
          placeholder='Image URL'
          className='w-64 p-2 rounded border border-gray-300 mr-2'/>
        <button onClick={addMusic} className='bg-blue-500 text-white px-4 py-2 rounded'>Add</button>
      </div>
      <div className='flex justify-start gap-20 flex-wrap'>
        {music.map((mus) => (
          <div key={mus.id} className='bg-white rounded-lg shadow-md p-4 w-72 h-96 mb-4 flex flex-col justify-between'>
            <Link to={`/music/${mus.id}`}>
            <div className='flex flex-col items-center'>
                <img className='w-48 h-48 object-cover rounded-lg' src={mus.img} alt='' />
            </div>
            <div className='flex flex-col justify-center items-center pt-4'>
              <h2 className='text-xl font-bold mt-2'>{mus.name}</h2>
              <h3 className='text-sm mt-2'>{mus.artist}</h3>
              </div>
              </Link>
              <button className='bg-blue-500 text-white px-4 py-2 mt-2 rounded'
                onClick={() => deleteMusic(mus.id)}>Delete</button> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default Music;
