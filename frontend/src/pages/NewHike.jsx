import React, {useState} from 'react';
// import DatePicker from 'react-date-picker'; // this is the original datepicker component i used, might go back to it later
import DatePicker from 'react-datepicker';
import { toDoApi } from '../api/toDoApi';

import "react-datepicker/dist/react-datepicker.css";

const NewHike = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [start, setStart] = useState(1);
    const [end, setEnd] = useState(2);
    // const [selectedDate, setSelectedDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());

    const {post} = toDoApi(); 

    const handleSubmit = async (e) => {
        const data = {
            title,
            description,
            start,
            end,
            date: startDate
        };
        console.log(data);
        // i should import post from the todoapi.js file and use it here
        const response = await post('/hike/new', data); // we don't need to import axios here, we already imported it in the todoapi.js file
        console.log(response.status);
    }

  return (
    <div>
        <h1>Add new hike log</h1>
        <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} id="hiketitle"/>
        <input type="text" onChange={(e) => setDescription(e.target.value)} value={description} id="hikedescription"/>
        <input type="number" id="hikestart" value={start} onChange={(e) => setStart(e.target.value)}/>
        <input type="number" id="hikeend" value={end} onChange={(e) => setEnd(e.target.value)}/>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        <button onClick={() => handleSubmit()}>Add</button>
    </div>
  )
}

export default NewHike