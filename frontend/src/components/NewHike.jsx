import React, {useState} from 'react';
// import DatePicker from 'react-date-picker'; // this is the original datepicker component i used, might go back to it later
import DatePicker from 'react-datepicker';
import { toDoApi } from '../api/toDoApi';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert'

import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from 'react';

const NewHike = ({getAllHikes}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [start, setStart] = useState(1);
    const [end, setEnd] = useState(2);
    // const [selectedDate, setSelectedDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    const [stamps, setStamps] = useState([]);

    const [showAlert, setShowAlert] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const { post, get } = toDoApi(); 

    const handleSubmit = async (e) => {
        const data = {
            title,
            description,
            start,
            end,
            date: startDate
        };
        const response = await post('/hike/new', data); // we don't need to import axios here, we already imported it in the todoapi.js file
        if (response.status === 200) {
            setShowSuccess(true);
            setTitle('');
            setDescription('');
            setStart(1);
            setEnd(2);
            setStartDate(new Date());
            getAllHikes();
        } else {
            setShowAlert(true);
        }
    }

    const getAllStamps = async () => {
      const response = await get('/stamp/all');
      setStamps(response.data);
    }

    useEffect(() => {
      getAllStamps();
    }, []);

  return (
    <div>
      <h2>Add new hike log</h2>

      {showAlert && (<Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
        <Alert.Heading>Oh snap! Something must have gone wrong!</Alert.Heading>
        <p>
          A wild error has appeared! Please try again. If the error persists, please contact the administrator.
        </p>
      </Alert>)}

      {showSuccess && (<Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
        <Alert.Heading>Hike log added successfully!</Alert.Heading>
      </Alert>)}

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">😁</InputGroup.Text>
        <Form.Control
          onChange={(e) => setTitle(e.target.value)} value={title}
          placeholder="Name your hike!" 
          aria-label="Name your hike!"
          aria-describedby="basic-addon1"
        />
      </InputGroup>

      <InputGroup>
        <InputGroup.Text>📝</InputGroup.Text>
        <Form.Control as="textarea"
          onChange={(e) => setDescription(e.target.value)} value={description}
          placeholder="Describe your hike!"
          aria-label="Describe your hike!" 
          aria-describedby="basic-addon1"
        />
      </InputGroup>

      <InputGroup>
        <InputGroup.Text>🟢 Starting point</InputGroup.Text>
        <Form.Select onChange={(e) => setStart(e.target.value)} aria-label="Hike starting point">
        {stamps.map(stamp => {
            return <option key={stamp.id} value={stamp.id}>{stamp.id} - {stamp.name}</option>
          })}
        </Form.Select>
      </InputGroup>

      <InputGroup>
        <InputGroup.Text>🏁 Finishing point</InputGroup.Text>
        <Form.Select onChange={(e) => setEnd(e.target.value)} aria-label="Hike finishing point">
          {stamps.map(stamp => {
            return <option key={stamp.id} value={stamp.id}>{stamp.id} - {stamp.name}</option>
          })}
        </Form.Select>
      </InputGroup>
      
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />

      <Button variant='primary' onClick={() => handleSubmit()} disabled={(title === '' || description === '')}>Add</Button>
    </div>
  )
}

export default NewHike