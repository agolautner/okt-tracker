import React from 'react';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

const Hike = ({hike}) => {
  return (
    <Accordion.Item eventKey={hike._id}>
      <Accordion.Header>{hike.title}</Accordion.Header>
      <Accordion.Body>
        <p>{hike.description}</p>
        <p>{hike.date}</p>
        <Button variant="primary" onClick={() => console.log('edit')}>Edit</Button>
        <Button variant="danger" onClick={() => console.log('delete')}>Delete</Button>
      </Accordion.Body>
    </Accordion.Item>
  )
}

export default Hike