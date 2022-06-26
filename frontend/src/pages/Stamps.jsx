import React, { useState, useEffect } from 'react';
import { toDoApi } from '../api/toDoApi';

const Stamps = () => {
    const [stamps, setStamps] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const { get } = toDoApi();

    const getAllStamps = async () => {
        const response = await get('/stamp/all');
        setStamps(response.data);
    }

    const queryStamps = async () => {
        if (searchQuery.length > 0) {
            const response = await get(`/stamp/search?q=${searchQuery}`);
            console.log(response.data);
            return setStamps(response.data);
        }
        console.log('no search query');
    }

    const handleReset = () => {
        setSearchQuery('');
        getAllStamps();
    }

    useEffect(() => {
        console.log('useEffect ran');
        getAllStamps();
    }, []);

    return (
        <div>
            <h1>Stamps</h1>
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            <button onClick={() => queryStamps()}>SEARCH</button>
            <button onClick={() => handleReset()}>RESET</button>
            {(stamps.length > 0) ? stamps.map((stamp) => {
                return (
                    <div key={stamp.id}>{stamp.name}</div>
                )
            }) : <p>No stamps</p>}
        </div>
    )
}

export default Stamps