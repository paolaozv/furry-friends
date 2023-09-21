// import PetCard from "../PetCard";

const RequestList = ({ requests }) => {
  return (
    <div>
      {requests && requests.length === 0 &&
        <div className="mt-36 text-center">There is no applications yet</div>
      }
      {requests && requests.length > 0 &&
        <div className="grid grid-cols-3 gap-16">
          {requests.map((request) => {
            return (
              <div key={request.id}>
                {request.applicant}
              </div>
            )
          })}
        </div>
      }
    </div>
  )
}

export default RequestList;