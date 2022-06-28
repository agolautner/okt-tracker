import React, { useState, useEffect } from 'react';
import { toDoApi } from '../api/toDoApi';
import Pagination from '../components/Pagination';
import Stamp from '../components/Stamp';

const Stamps = () => {
    const [stamps, setStamps] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [stampsPerPage, setStampsPerPage] = useState(10);

    const { get } = toDoApi();

    const getAllStamps = async () => {
        setLoading(true);
        const response = await get('/stamp/all');
        setStamps(response.data);
        return setLoading(false);
    }

    const queryStamps = async () => {
        if (searchQuery.length > 0) {
            setLoading(true);
            const response = await get(`/stamp/search?q=${searchQuery}`);
            console.log(response.data);
            setStamps(response.data);
            return setLoading(false);
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

    // get current stamps
    const indexOfLastStamp = currentPage * stampsPerPage;
    const indexOfFirstStamp = indexOfLastStamp - stampsPerPage;
    const currentStamps = stamps.slice(indexOfFirstStamp, indexOfLastStamp);

    // change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <h1>Stamps</h1>
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            <button onClick={() => queryStamps()}>SEARCH</button>
            <button onClick={() => handleReset()}>RESET</button>
            {(stamps.length > 0) ? currentStamps.map((stamp) => {
                return (
                    <Stamp key={stamp.id} stamp={stamp} />
                )
            }) : <p>No stamps</p>}
            <Pagination stampsPerPage={stampsPerPage} totalStamps={stamps.length} paginate={paginate}/>
        </div>
    )
}

export default Stamps