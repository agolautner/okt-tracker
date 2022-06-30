import React, {useEffect} from 'react';
import './Stamp.css';
import Accordion from 'react-bootstrap/Accordion';

const Stamp = ({stamp}) => {
    const {lat, lng} = stamp.coordinates;
    const apiKey = 'some string'; // process.env.REACT_APP_API_KEY doesn't seem to do the trick, don't know why

    useEffect(() => {
      console.log(apiKey);
    }, []);

  return (
        <Accordion.Item eventKey={stamp.id}>
          <Accordion.Header>{stamp.id} {stamp.name}</Accordion.Header>
          <Accordion.Body>
            <img className='Stamp-map' src={`https://maps.googleapis.com/maps/api/staticmap?&markers=color:blue%7Clabel:K%7C${lat},${lng}&size=400x400&key=${apiKey}`} alt={`map of stamp nr ${stamp.id}`}/>
          </Accordion.Body>
        </Accordion.Item>
  )
}

export default Stamp