/**
 * Filter a list of pets to find a specific one by its ID.
 */
function filterPetData(pets, petId) {
  const pet = pets.filter((pet) => pet.id === petId);

  return pet;
}

export default filterPetData;