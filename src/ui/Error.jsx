import { useNavigate, useRouteError } from "react-router-dom"

export default function Error() {
   const navigate= useNavigate()
    const error=useRouteError()
  return (
    <div>
     <h2>Something went wrong</h2> 
     <p>{error.data||error.message}</p>
     <button onClick={()=>navigate(-1)}>&larr;Go back</button>
    </div>
  )
}
