import React, { useEffect, useState } from 'react'
 import { API_URL } from '../data/apiPath'

function AllProduct() {
   const[products,setproducts]=useState([])
    

    const producthandler=async()=>{
       const firmId=localStorage.getItem('firmId')
       try{
        const responce =await fetch(`${API_URL}/product/${firmId}/products`)
         const newProducstData=await responce.json()
          setproducts(newProducstData.products)
           console.log(newProducstData)
       }
        catch(error){
           console.log("faild to fetch")
            alert("faild to fetch")
        }

    }


    useEffect(()=>{
      producthandler()
  console.log("this is use effect")
    },[])


    // delete
const deleteproductbyid=async(productId)=>{
try{
   const  resonce=await fetch(`${API_URL}/product/${productId}`,{
    method:"DELETE"
   })
    if( resonce.ok){
       setproducts(products.filter(product=> product._id !== productId))
  confirm("are you sure want to delete ?")
   alert('Producted successfully')
      }
}
 catch(error){
  console.error('faild to delte product ')
   alert("faild to delete product ")
 }
}




  return (
    <div>
     {!products ? (
      <h1>No Products</h1>):(
        <table className='produt-table'>
               <thead>
                <tr>
                  <th>Product Name</th>
                <th>Price</th>
                <th>Image</th>
                <th>Delete</th></tr>
              </thead>

               <tbody>
                {products.map((item)=>{
            // const images=`${API_URL}/uploads/${item.image}`
            //  console.log(images)
                 return(
                  <>
                  <tr key={item._id}>
                      <td>{item.productName}</td>
                      <td>{item.price}</td>
                      <td>{item.image && (<img style={{width:"50px"}} src={item.image} alt={item.productName}/>)}</td>
                  
                   <td><button onClick={()=>deleteproductbyid(item._id)}>Delete</button></td>
                  </tr>
                  </>
                 )
                  })}
               </tbody>
        </table>
      )}
    </div>
  )
}

export default AllProduct