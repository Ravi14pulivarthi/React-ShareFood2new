import React, { useState } from 'react'
import { API_URL } from '../../data/apiPath'



function Register({showlogin}) {
 const[username,setusername]=useState("")
const [email,setemail]=useState("")
 const[password,setpassword]=useState("")
const[error,seterror]=useState("")
  const[loding,setloding]=useState(true)



   const handleSubmit=async(e)=>{
     e.preventDefault();

     try{
        const responce=await fetch(`${API_URL}/vendor/register`,{
              method:"POST",
              headers:{
                'Content-Type':'application/json'
              },
               body:JSON.stringify({username,email,password})

           })
            const data=await responce.json()
             if( responce.ok){
               console.log(data)
                setusername("")
                setemail("")
                setpassword("")
              alert("Vendor register successfully")
              showlogin()
             }
     }
      catch(error){
      console.log("register ",error)
      alert(" registation failed")
      }
   }



  return (
    <div className='registerSection'>
       

       <form className='authform' onSubmit={handleSubmit} >
            
            <h3>Vendor-Register</h3>

            <lable>Name</lable>
           <input type='text' name='username' value={username} onChange={(e)=>setusername(e.target.value)}  placeholder='Enter your Name'/><br/>


           <lable>Email</lable>
           <input type='text' name='email' value={email} onChange={(e)=>setemail(e.target.value)}  placeholder='Enter your Email'/><br/>
      
          
           <lable>Password</lable>
           <input type='text' name='password' value={password} onChange={(e)=>setpassword(e.target.value)}  placeholder='Enter your Password'/>
               
               
                <div className='btnSubmit'><br/>
               <button type='submit' >Submit</button><br/>

              </div>
       
       
       </form>
    </div>
  )
}

export default Register