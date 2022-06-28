import React from 'react'

const Stamp = ({stamp}) => {
    const {lat, lng} = stamp.coordinates;
    const apiURL = `https://maps.googleapis.com/maps/api/staticmap?&markers=color:blue%7Clabel:K%7C${lat},${lng}&size=400x400&key=AIzaSyDDbZlvSn8DHvxfUFUHv0My4G8th56JMZM`

  return ( 
        <div key={stamp.id}>
            <h5>{stamp.id} {stamp.name}</h5>
            <img src={apiURL} alt="map of the stamping location" />
        </div>
  )
}

export default Stamp