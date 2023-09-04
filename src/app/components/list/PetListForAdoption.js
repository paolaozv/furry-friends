import PetCard from "../PetCard";

const PetListForAdoption = ({ pets }) => {
  return (
    <div>
      {pets && pets.length === 0 &&
        <div className="mt-36 text-center">There is no pets for adoption added yet</div>
      }
      {pets && pets.length > 0 &&
        <div className="grid grid-cols-3 gap-16">
          {pets.map((pet) => {
            return (
              <div key={pet.id}>
                <PetCard
                  id={pet.id}
                  name={pet.name}
                  photo={pet.photo}
                  age={pet.age}
                  breed={pet.breed}
                  description={pet.description}
                />
              </div>
            )
          })}
        </div>
      }
    </div>
  )
}

export default PetListForAdoption;