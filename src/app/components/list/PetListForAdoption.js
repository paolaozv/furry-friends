import PetCard from "../PetCard";

const PetListForAdoption = ({ pets }) => {
  return (
    <div>
      {pets && pets.length === 0 &&
        <div className="mt-36 text-center text-sm lg:text-base">There is no pets for adoption added yet</div>
      }
      {pets && pets.length > 0 &&
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-16">
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
                  rescueGroup={pet.uid}
                  requestSent={pet.requestSent}
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