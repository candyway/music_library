import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from "react-router-dom";

const Solomus = ({ name, setName, artist, setArtist, img, setImg, music, setMusic }) => {
  const { id } = useParams();
  const mus = music[id]
  const [edit,setEdit] = useState(false)


  const changeMus = () => {
    axios
    .patch(`http://localhost:8000/music/${id}`,{
        name : name,
        artist: artist,
        img: img
    }).then((res) => {setMusic((m) => 
        m.map((song) => song.id === id ? {name,artist,img,...song} : song))
        setEdit(false)
    })
    .catch((err) => {console.log(err)})
  }


  return (
    <div className='flex justify-center mt-20'>
        {edit === false ?(
            <div className='max-w-4xl bg-white shadow-lg rounded-lg p-6 flex flex-col'>
            <div className='text-center'>
              <img src={mus.img} alt='' className='w-64 h-64 mx-auto rounded-full' />
              <h1 className='text-4xl mt-8 font-bold'>{mus.name}</h1>
              <h2 className='text-2xl text-gray-600'>{mus.artist}</h2>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5" onClick={() => setEdit(true)}>Change</button>
          </div> ) : (
            <div className='max-w-4xl bg-white shadow-lg rounded-lg p-6 flex flex-col justify-around h-96 w-80'>
            <div className='text-center flex flex-col items-center justify-around h-64'>
              <input type="text" value={img} placeholder='URL img' onChange={(e) => setImg(e.target.value)}/>
              <input type="text" value={name} placeholder='Song' onChange={(e) =>setName(e.target.value)}/>
              <input type="text" value={artist} placeholder='Artist' onChange={(e) => setArtist(e.target.value)}/>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5" onClick={() => changeMus()}>Save</button>
          </div>
          )
    } 
    </div>
  );
};

export default Solomus;
