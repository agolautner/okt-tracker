import React from 'react';
import { useCounter } from '../hooks/useCounter';
import { useCounter as useGlobalCounter } from '../providers/counter';
import { useAuth } from '../providers/auth';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';

const Home = () => {
    const { auth, token } = useAuth();

    return (
        <>
            <h1>Welcome to the OKT Tracker</h1>
            <p>{token ? 'You are currently logged in.' : 'Please sign in to continue using the site!'}</p>
            {token ? 'Welcome!' : (
                <>
                    <Button variant='primary' onClick={() => auth('google')}>GOOGLE LOGIN</Button>
                </>
            )}
        </>
  )
}

export default Home