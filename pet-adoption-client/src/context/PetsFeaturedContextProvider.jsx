import React, { createContext, useState } from 'react';

const PetsFeaturedContext = createContext();

export const PetsFeaturedContextProvider = ({children}) => {

    const[petsFeatured, setPetsFeatured] = useState(false);

    const loadPetsFeatured = (pets, id) => {
      let updatedPetsFeatured = [];
      for(let i=0; i<pets.length; i++) {
        if(pets[i].userIdFeaturing === id) {
          updatedPetsFeatured.push(pets[i])
        }
      }
      setPetsFeatured(updatedPetsFeatured);
    }
    

  return (
    <PetsFeaturedContext.Provider value={{loadPetsFeatured, petsFeatured, setPetsFeatured}}>
        {children}
    </PetsFeaturedContext.Provider>
  )
}

export {PetsFeaturedContext};
