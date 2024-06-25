import React from 'react'
import { Link } from 'react-router-dom'

function PageNotfound() {
  return (
    <>
     <div className='errorsection'>
        <h1>404</h1>
        <h4>Page not found</h4>
        <Link to="/">
    <h5 style={{color:"black"}}> Click to go back</h5>
    </Link>
    </div>
 
    </>
   
  )
}

export default PageNotfound