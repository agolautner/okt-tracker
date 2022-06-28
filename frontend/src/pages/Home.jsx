import React from 'react';
import { useCounter } from '../hooks/useCounter';
import { useCounter as useGlobalCounter } from '../providers/counter';
import { useAuth } from '../providers/auth';
import { useEffect } from 'react';

const Home = () => {
    const { value, increment, decrement } = useCounter(Home);
    const { 
        value: globalValue,
        increment: globalIncrement, 
        decrement: globalDecrement 
    } = useGlobalCounter();

    const { auth, token } = useAuth();

    return (
        <>
            <div>Home</div>
            <p>{token ? 'logged in' : 'anonymous user'}</p>

            <img src="https://maps.googleapis.com/maps/api/staticmap?center=Berkeley,CA&zoom=14&size=400x400&key=AIzaSyDDbZlvSn8DHvxfUFUHv0My4G8th56JMZM" alt="a map" />
            <img src="https://maps.googleapis.com/maps/api/staticmap?markers=47.252173,16.252941&size=400x400&key=AIzaSyDDbZlvSn8DHvxfUFUHv0My4G8th56JMZM" alt="a map" />

            <button onClick={decrement}>-</button>
            <button onClick={increment}>+</button>
            <p>{value}</p>
            <button onClick={globalDecrement}>-</button>
            <button onClick={globalIncrement}>+</button>
            <p>{globalValue}</p>
            
            {token ? 'welcome!' : (
                <>
                    <button onClick={() => auth('google')}>Login with Google</button>
                    <button onClick={() => auth('oid')}>Login with my oID</button>
                </>
            )}
        </>
  )
}

export default Home