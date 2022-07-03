import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/auth';
import Button from 'react-bootstrap/Button';

const Register = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const { register, user, auth } = useAuth();

    useEffect(() => {
        if(user.userId) navigate('/profile')
    }, [user, navigate])

  return (
    <>
        <h1>Register</h1>
        <p>Before you can continue using the site, please choose a name!</p>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='choose a username'/>
        <Button variant="primary" onClick={() => register(username)}>register</Button>
        {/* <hr />
        <h1>OR!</h1>
        <hr />
        <button onClick={() => auth('google')}>google</button>
        <button onClick={() => auth('oid')}>oid</button> */}
    </>
  )
}

export default Register