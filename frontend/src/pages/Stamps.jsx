import React, { useState, useEffect } from 'react';
import { toDoApi } from '../api/toDoApi';
import Pagination from 'react-bootstrap/Pagination';
import Stamp from '../components/Stamp';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

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

    let items = [];
    for (let number = 1; number <= Math.ceil(stamps.length / stampsPerPage); number++) {
        items.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <div>
            <h1>Stamps</h1>
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            <Button variant='primary' onClick={() => queryStamps()}>SEARCH</Button>
            <Button variant='outline-danger' onClick={() => handleReset()}>RESET</Button>
            <Accordion>
                {(stamps.length > 0) ? currentStamps.map((stamp) => {
                    return (
                        <Stamp key={stamp.id} stamp={stamp} />
                    )
                }) : <p>No stamps</p>}
            </Accordion>
            <Pagination>{items}</Pagination>
        </div>
    )
}

export default Stamps