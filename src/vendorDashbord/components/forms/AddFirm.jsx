import React, { useState } from 'react'
import { API_URL } from '../../data/apiPath'

function AddFirm() {
   const[firmName,setfirmName]=useState("")
   const[area,setarea]=useState("")
   const[category,setcategory]=useState([])
   const[region,setregion]=useState([])
    const[offer,setoffer]=useState("")
    const[file,setfile]=useState(null)

// category
 const handelCategory=(event)=>{
 const value =event.target.value;
 if(category.includes(value)){
   setcategory(category.filter((item)=> item !== value))
 }
  else{
   setcategory([...category,value])
  }
 }


 const handelRegion=(event)=>{
   const value =event.target.value
   if(region.includes(value)){
     setregion(region.filter((item)=> item !== value))
   }
    else{
     setregion([...region,value])
    }
   }
  
  
// image

const  handelimageuplode=(event)=>{
 const selectedimage=event.target.files[0]
  setfile(selectedimage)
}




const handelFirmsubmit=async(e)=>{
   e.preventDefault();
   try{
  const  loginToken=localStorage.getItem("loginToken")
   if( !loginToken){
      console.error("user  not found")
   }

    const formData=new FormData()
   formData.append("firmName",firmName)
   formData.append("area",area)
   formData.append("offer",offer)
   formData.append("image",file)

 category.forEach((value)=>{
 formData.append("category",value)
 })
 region.forEach((value)=>{
   formData.append("region",value)
   })
   
 

// api

        const  responce=await fetch(`${API_URL}/firm/add-firm`,{
         method:"POST",
         headers:{
            'token':`${loginToken}`
         },
         body:formData
        })
         const data=await responce.json()
         if( responce.ok){
            console.log(data)
             alert("Firm Added Successfully")
              setfirmName("")
              setarea("")
              setcategory([])
              setoffer("")
              setregion([])
              setfile(null)
         }
          else if(data.message === 'vendor can have only one firm'){
           alert("Firm Existes .Only one firm  can be added")
          }
           else{
            alert('Faild to  add firm')
           }
           
         console.log("this is firm id",data)

         const firmId=data.firmId;
          localStorage.setItem('firmId',firmId)
   }
    catch(error){
    console.log("faild to add fir",error)
    }
}



  return (
    <div className='firmSection'>
    
     <form className='tableform'onSubmit={handelFirmsubmit}>
        <h1 >Add Firm</h1>

      <label> Firm Name</label>
      <input type='text' name='firmName' value={firmName} onChange={(e)=>setfirmName(e.target.value)}/>

      <label>Area</label>
      <input type='text' name='area' value={area} onChange={(e)=>setarea(e.target.value)}/>

      {/* <label> Category</label>
      <input type='text'/> */}
      
       <div className=' check-inp'>
        <label>Category</label>
         <div className='innercontainer'>
            <div className='checkboxcontainer'>
              <label>veg</label>
              <input type='checkbox' value="veg" checked={category.includes('veg')}  onChange={ handelCategory}/>
           </div>

           <div className='checkboxcontainer'>
              <label>No-veg</label>
              <input type='checkbox' value="non-veg" checked={category.includes('non-veg')}  onChange={ handelCategory}  />
           </div>

          </div>
       </div>




       <label> Offer</label>
       <input type='text' name='offer' value={offer}  onChange={(e)=>setoffer(e.target.value)}/>
{/* Region */}


<div className=' check-inp'>
        <label>Region</label>
         <div className='innercontainer'>
            <div className='regboxcontainer'>
              <label>South-indian</label>
              <input type='checkbox' value="south-indian" checked={region.includes('south-indian')} onChange={handelRegion}/>
             
           </div>

           <div className='regboxcontainer'>
              <label>Northn-indian</label>
              <input type='checkbox' value="north-indian" checked={region.includes('north-indian')}  onChange={handelRegion} />
           </div>

           <div className='regboxcontainer'>
              <label>Chinese</label>
              <input type='checkbox' value="chinese" checked={region.includes('chinese') }  onChange={handelRegion}/>
           </div>

           <div className='regboxcontainer'>
              <label>Bakery</label>
              <input type='checkbox' value="bakery" checked={region.includes('bakery')}  onChange={handelRegion}/>
           </div>
          </div>
       </div>





      <label> Firm  Image</label>
      <input type='file'  onChange={ handelimageuplode}/>


      <div className='btnSubmit'><br/>
      <button type='submit'>Submit</button><br/>
      </div>

      </form>

     </div>
    
  )
}

export default AddFirm