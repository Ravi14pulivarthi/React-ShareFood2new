import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Register from '../components/forms/Register'
import Login from '../components/forms/Login'
import  AddFirm from '../components/forms/AddFirm'
import  AddProducts from '../components/forms/AddProducts'
import Welcome from '../components/Welcome'
import AllProduct from '../components/AllProduct'





function LandingPage() {

 const[login,setlogin]=useState(false)
const[register,setregister]=useState(false)
const [firm,setfirm]=useState(false)
const[allproducts,setallproducts]=useState(false)
const[welcome,setwelcome]=useState(false)
const[showproducts,setshowproducts]=useState(false)
const[showlogout,setshowlogout]=useState(false)
const[showfirmtitle,setfirmtitle]=useState(true)

useEffect(()=>{
const loginToken=localStorage.getItem('loginToken')
if(loginToken){
setshowlogout(true)
}
},[])

useEffect(()=>{
const firmName=localStorage.getItem('firmName')
 if(firmName){
 setfirmtitle(false)
 }
},[])


// logoutfunction
 const logOuthandeler=()=>{
  confirm("areyou sure to logout")
  localStorage.removeItem("loginToken")
  localStorage.removeItem("firmId")
  localStorage.removeItem("firmName")
  setshowlogout(false)
  setfirmtitle(true)
 }




 const  showRegister=()=>{
   setregister(true)
   setlogin(false)
   setfirm(false)
   setallproducts(false)
   setwelcome(false)
   setshowproducts(false)

  }

  const showlogin=()=>{
    setlogin(true)
     setregister(false)
     setfirm(false)
     setallproducts(false)
     setwelcome(false)
     setshowproducts(false)
    }
  
const showFirm=()=>{
  if(showlogout){ 
    setfirm(true)
    setlogin(false)
    setregister(false)
    setallproducts(false)
    setwelcome(false)
    setshowproducts(false)}
else{
  alert("Plese log-in")
  setlogin(true)
}
  
}

const showAllProducts=()=>{
  if(showlogout){  setfirm(true)
  setallproducts(true)
  setlogin(false)
  setregister(false)
  setfirm(false)
  setwelcome(false)
  setshowproducts(false)}
  else{
    alert("Plese log-in")
    setlogin(true)
  }
}
const showWelcomepage=()=>{
  setwelcome(true)
  setallproducts(false)
  setlogin(false)
  setregister(false)
  setfirm(false)
  setshowproducts(false)
}

const showproductss=()=>{
  if(showlogout){ 
    setfirm(true)
  setwelcome(false)
  setallproducts(false)
  setlogin(false)
  setregister(false)
  setfirm(false)
  setshowproducts(true)}
  else{
    alert("Plese log-in")
    setlogin(true)
  }
}










  return (
    <div>
        <section className='landingSection'>
        <NavBar showlogin={showlogin} showRegister={showRegister} showlogout={showlogout} logOuthandeler={logOuthandeler} />
        
        <div className="colectionSection">
        
        <SideBar  showFirm={showFirm} showAllProducts={showAllProducts} showproductss={showproductss} showfirmtitle={showfirmtitle}/>
       
       
        {login &&  <Login showWelcomepage={showWelcomepage}/> }
        {register && <Register showlogin={showlogin}/> }
      
       {firm  && showlogout && <AddFirm/> }
       {allproducts && showlogout && <AddProducts/>}
       {welcome && <Welcome/>}
       {showproducts  && showlogout &&   <AllProduct/>}
        </div>

        </section>
    </div>
  )
}

export default LandingPage