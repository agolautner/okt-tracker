import React from 'react';
import { useEffect, useState } from 'react';
import { toDoApi } from '../api/toDoApi';
import NewHike from '../components/NewHike';
import Hike from '../components/Hike';
import Pagination from 'react-bootstrap/Pagination';
import Accordion from 'react-bootstrap/Accordion';

const Hikes = () => {
    const [hikes, setHikes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hikesPerPage, setHikesPerPage] = useState(10);
    
    const { get } = toDoApi();

    const getAllHikes = async () => {
        setLoading(true);
        const response = await get('/hike/all');
        console.log(response.data); // this is the array of hikes belonging to the user
        const dataArray = response.data;
        const reversedArray = dataArray.reverse();
        setHikes(reversedArray);
        return setLoading(false);
    }

    useEffect(() => {
        getAllHikes();
    }, []);

    // get current stamps
    const indexOfLastHike = currentPage * hikesPerPage;
    const indexOfFirstHike = indexOfLastHike - hikesPerPage;
    const currentHikes = hikes.slice(indexOfFirstHike, indexOfLastHike);

    // change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    
    let items = [];
    for (let number = 1; number <= Math.ceil(hikes.length / hikesPerPage); number++) {
        items.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
                {number}
            </Pagination.Item>,
        );
    }

  return (
    <div>
        <h1>Hikes</h1>
        <NewHike getAllHikes={getAllHikes}/>
        <h2>Your hike logs</h2>
        <Accordion>
            {(hikes.length > 0) ? currentHikes.map((hike) => {
                return (
                    <Hike key={hike._id} hike={hike} getAllHikes={getAllHikes}/>
                )
            }) : <p>No hikes</p>}
        </Accordion>
        <Pagination>{items}</Pagination>
    </div>
  )
}

export default Hikes