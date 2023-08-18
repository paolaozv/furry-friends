// components/ui/Loading.js
import Spinner from "./Spinner";

const Loading = () => {
  return (
    <div className="w-full h-screen bg-primary/70 flex content-center items-center justify-center">
      <div className="flex">
        <p className="text-primary-black text-lg mr-6">Loading</p>
        <Spinner />
      </div>
    </div>
  )
}

export default Loading;