import Carousel from 'react-bootstrap/Carousel';
import { useContext, useEffect, useState } from 'react';
import { PetsContext } from '../context/PetsContextProvider';


function PetsCarousel() {

    const {pets, fetchAllPetsNoToken} = useContext(PetsContext);

    useEffect(() => {
        fetchAllPetsNoToken();
    }, [])

  return (
    <Carousel>
        {pets.filter(pet => (pet.imageUrl)).map((pet) => (
        <Carousel.Item>
        <img style = {{borderRadius: '15px', width: '63%', height: '30rem', objectFit: 'cover', marginBottom: '0', position: 'relative', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.4)'}} src = {pet.imageUrl} />
        <Carousel.Caption>
          <h3 className = 'whiteOutline display-4'>{pet.name}</h3>
          
        </Carousel.Caption>
      </Carousel.Item>))}
      
    </Carousel>
  );
}

export default PetsCarousel;