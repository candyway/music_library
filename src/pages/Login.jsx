import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigation = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginProcess = (e) => {
    e.preventDefault();
    if (validate()) {
      axios(`http://localhost:8000/users/${username}`)
        .then((res) => {
          if (res.data.password === password) {
            navigation('/music');
          }
        })
        .catch((err) => alert('ERROR'));
    }
  };

  const validate = () => {
    let result = true;
    if (username === '' || username === null) {
      result = false;
      alert('Check inputs');
    }
    if (password === '' || password === null) {
      result = false;
      alert('Check inputs');
    }
    return result;
  };

  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <div className="border-2 border-indigo-600 p-8 rounded-lg mb-32">
        <input className="w-64 mb-4 p-2 border border-gray-400 rounded-md focus:outline-none"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}/>
        <input className="w-64 mb-4 p-2 border border-gray-400 rounded-md focus:outline-none ml-5 mr-5"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
          onClick={loginProcess}>
          Log in
        </button>
      </div>
    </div>
  );
};

export default Login;
