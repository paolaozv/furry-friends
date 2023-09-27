import Link from 'next/link'
 
// Not found page UI(User Interface)
export default function NotFound() {
  return (
    <div className="w-full h-screen bg-primary/70 flex content-center items-center justify-center">
      <div className="text-center">
        <h2>Not Found | 404</h2>
        <p>Could not find requested resource</p>
        <p>
          Go to <Link href="/" className="font-semibold">Home</Link>
        </p>
      </div>
    </div>
  )
}