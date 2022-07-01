import React from 'react';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import { toDoApi } from '../api/toDoApi';

const Hike = ({hike, getAllHikes}) => {
  const { del } = toDoApi();

  const deleteHike = async () => {
    console.log('deleting hike nr: ' + hike._id);
    const response = await del(`/hike/${hike._id}`);
    console.log(response);
    getAllHikes();
  }

  return (
    <Accordion.Item eventKey={hike._id}>
      <Accordion.Header>{hike.title}</Accordion.Header>
      <Accordion.Body>
        <p>{hike.description}</p>
        <p>{hike.date}</p>
        <Button variant="primary" onClick={() => console.log('edit')}>Edit</Button>
        <Button variant="danger" onClick={() => deleteHike()}>Delete</Button>
      </Accordion.Body>
    </Accordion.Item>
  )
}

export default Hike