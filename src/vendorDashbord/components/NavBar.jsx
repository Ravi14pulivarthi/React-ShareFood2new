import React from 'react'

function NavBar({showlogin,showRegister,showlogout,logOuthandeler}) {
  const firmName=localStorage.getItem("firmName")
 
 
 
  return (
    <div className='navSection'>
   
<div className='company'>
    <h1 style={{fontFamily:"Finger Paint"}}>Vendor Dashbord</h1>
</div>
<div className="firmName">
  <h4>FirmName:{firmName}</h4>
</div>
<div className='userAuth'>
  {!showlogout ?   <><span onClick={showlogin}>Login/</span>
  <span onClick={showRegister}>Register</span></>:
  
  <span onClick={logOuthandeler}>Log-Out</span> }




</div>
    </div>
  )
}

export default NavBar