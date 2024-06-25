import React, { useState } from 'react'
import { API_URL } from '../../data/apiPath'




function Login({showWelcomepage}) {
  const[email,setemail]=useState("")
  const[password,setpassword]=useState("")




 const handelLogin=async(e)=>{
  e.preventDefault();
  try{
 const responce=await fetch(`${API_URL}/vendor/login`,{
  method:"POST",
  headers:{
    'Content-Type':'application/json'
  },
  body:JSON.stringify({email,password})
 })
const data = await responce.json()
 if( responce.ok){
   console.log(data)
alert("Vendor Login sussfully")

  setemail("")
  setpassword("")
  localStorage.setItem("loginToken",data.token)
  showWelcomepage()
 }
 
// firmid api
  const vendorId=data.vendorId
   console.log(vendorId)

 const vendorResonce=await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)

  const vendorData=await vendorResonce.json()
  if(vendorResonce.ok){
    const  vendorFirmId=vendorData.vendorFirmId;

    const vendorFirmName=vendorData.vendor.firm[0].firmName
    
     localStorage.setItem('firmId',vendorFirmId)
     localStorage.setItem('firmName',vendorFirmName)
     window.location.reload()
  }


}
   catch(error){
     console.error("login faild",error)
      alert("Vendor LOgin faild")
   }
 }


  return (
    <div className='loginSection'>
       

        <form className='authform' onSubmit={handelLogin}>
            
             <h3>Vendor-Login</h3>

            <lable>Email</lable>
            <input type='text' value={email} onChange={(e)=>setemail(e.target.value)} placeholder='Enter your Email'/><br/>
       
          

            <lable>Password</lable>
            <input type='text' value={password} onChange={(e=>setpassword(e.target.value))} placeholder='Enter your Password'/>
                
                
                 <div className='btnSubmit'><br/>
                <button type='submit'>Submit</button><br/>

               </div>
        
        
        </form>
    </div>
  )
}

export default Login