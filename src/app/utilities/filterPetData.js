function filterPetData(pets, petId) {
  const pet = pets.filter((pet) => pet.id === petId);

  return pet;
}

export default filterPetData;