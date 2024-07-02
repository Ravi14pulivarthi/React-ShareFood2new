import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";

function AddProducts() {
  const [productName, setproductName] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState([]);
  const [bestseller, setbestseller] = useState(false);
  const [description, setdescription] = useState("");
  const [image, setimage] = useState(null);

  // category
  const handelCategory = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setcategory(category.filter((item) => item !== value));
    } else {
      setcategory([...category, value]);
    }
  };

  //   bestseller

  const handelebestseller = (event) => {
    const value = event.target.value === 'true';
    setbestseller(value);
  };


 // image2
 const  imagehandler2=(file1)=>{
  return new Promise((resolve, reject) => {
     const filereader=new FileReader();
     filereader.readAsDataURL(file1)
     filereader.onload=()=>{
      resolve(filereader.result)  };
     filereader.onerror=(error)=>{reject(error)}
  })
  
}
  // image

const  handelimageuplode=async(event)=>{
   const selectedimage=event.target.files[0]
    const newimage=await imagehandler2(selectedimage)
     setimage(newimage)
  }
  


  const handelAddProduct = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem("loginToken");
      const firmId = localStorage.getItem("firmId");
      if (!loginToken || firmId) {
        console.error("user is no authentached");
      }
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("image", image);

      category.forEach((value) => {
        formData.append("category", value);
      });
      // api
      const responce = await fetch(`${API_URL}/product/add-product/${firmId}`, {
        method: "Post",
        body: formData,
      });
      const data = await responce.json();
      if (responce.ok) {
        alert("Product Added Successfully");
         setbestseller("")
         setcategory([])
         setproductName("")
         setimage(null)
         setprice("")
         
      }
    } catch (error) {
      console.error(error);
      alert("failed to add product");
    }
  };

  return (
    <div className="firmSection">
      <form className="tableform" onSubmit={handelAddProduct }>
        <h1>Add Product</h1>

        <label> Product Name</label>
        <input type="text" value={productName} onChange={(e)=>setproductName(e.target.value)} />

        <label>Price</label>
        <input type="text" value={price} onChange={(e)=>setprice(e.target.value)} />

        {/* Category */}
        <div className=" check-inp">
          <label>Category</label>
          <div className="innercontainer">
            <div className="checkboxcontainer">
              <label>veg</label>
              <input type="checkbox" value="veg" checked={category.includes('veg')} onChange={handelCategory} />
            </div>

            <div className="checkboxcontainer">
              <label>No-veg</label>
              <input type="checkbox" value="non-veg" checked={category.includes('non-veg')} onChange={handelCategory} />
            </div>
          </div>
        </div>

        {/* Bestseller */}
        <div className=" check-inp">
          <label>Bestseller</label>
          <div className="innercontainer">
            <div className="checkboxcontainer">
              <label>yes</label>
              <input type="radio" value="true" checked={bestseller === true} onChange={handelebestseller} />
            </div>

            <div className="checkboxcontainer">
              <label>No</label>
              <input type="radio" value="false" checked={bestseller === false}  onChange={handelebestseller} />
            </div>
          </div>
        </div>

        <label>Description</label>
        <input type="text" value={description}  onChange={(e)=>setdescription (e.target.value)}/>

        <label> Firm Image</label>
        <input type="file" onChange={handelimageuplode} />

        <div className="btnSubmit">
          <br />
          <button type="submit">Submit</button>
          <br />
        </div>
      </form>
    </div>
  );
}

export default AddProducts;
