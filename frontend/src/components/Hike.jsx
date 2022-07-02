import React, {useState, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { toDoApi } from '../api/toDoApi';

const Hike = ({hike, getAllHikes}) => {
  const { del, update } = toDoApi();

  const [showEditor, setShowEditor] = useState(false);
  const [title, setTitle] = useState(hike.title);
  const [description, setDescription] = useState(hike.description);
  const [start, setStart] = useState(hike.start);
  const [end, setEnd] = useState(hike.end);
  const [startDate, setStartDate] = useState(new Date(hike.date));

  const deleteHike = async () => {
    console.log('deleting hike nr: ' + hike._id);
    const response = await del(`/hike/${hike._id}`);
    console.log(response);
    getAllHikes();
  }

  const updateHike = async () => {
    console.log('updating hike nr: ' + hike._id);
    const response = await update(`/hike/${hike._id}`, {
      title,
      description,
      start,
      end,
      date: startDate
    });
    console.log(response);
    setShowEditor(false);
    getAllHikes();
  }

  return (
    <Accordion.Item eventKey={hike._id}>
      {showEditor ? (
        <>
          <Accordion.Header>Editing hike</Accordion.Header>
          <Accordion.Body>

            <h5>Edit hike name</h5>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">😁</InputGroup.Text>
                <Form.Control
                  onChange={(e) => setTitle(e.target.value)} value={title}
                  placeholder={title}
                  aria-label={title}
                  aria-describedby="basic-addon1"
                />
              </InputGroup>

            <h5>Edit hike description</h5>
            <InputGroup>
              <InputGroup.Text>📝</InputGroup.Text>
              <Form.Control as="textarea"
                onChange={(e) => setDescription(e.target.value)} value={description}
                placeholder={description}
                aria-label={description} 
                aria-describedby="basic-addon1"
              />
            </InputGroup>

            <h5>Edit hike date</h5>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />

            <Button variant="primary" onClick={() => updateHike()}>SAVE</Button>
            <Button variant="outline-danger" onClick={() => setShowEditor(false)}>CANCEL</Button>
          </Accordion.Body>
        </>
      ) : (
        <>
          <Accordion.Header>{hike.title}</Accordion.Header>
          <Accordion.Body>
            <p>{hike.description}</p>
            <p>{hike.date}</p>
            <p>From stamp nr. {hike.start} to nr. {hike.end}</p>
            <Button variant="primary" onClick={() => setShowEditor(true)}>EDIT</Button>
            <Button variant="danger" onClick={() => deleteHike()}>DELETE</Button>
          </Accordion.Body>
        </>
      )
      }
      
    </Accordion.Item>
  )
}

export default Hike