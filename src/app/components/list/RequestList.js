import RequestCard from "../RequestCard";

const RequestList = ({ requests }) => {
  return (
    <div>
      {requests && requests.length === 0 &&
        <div className="mt-36 text-center">There is no applications yet</div>
      }
      {requests && requests.length > 0 &&
        <div className="grid grid-cols-1 gap-4">
          {requests.map((request) => {
            return (
              <div key={request.id}>
                <RequestCard
                  applicant={request.applicant}
                  email={request.applicantEmail}
                  petId={request.idPet}
                />
              </div>
            )
          })}
        </div>
      }
    </div>
  )
}

export default RequestList;