import React from 'react'

function SideBar({showFirm,showAllProducts,showproductss,showfirmtitle}) {
  return (
    <div className='sideBarSection'>

        <ul>
          {showfirmtitle ? <li onClick={showFirm}>Add Firm</li> :" "}
          
           <li onClick={showAllProducts}>Add Product</li>
           <li onClick={showproductss}>All Product</li>
           <li>User Details</li>

        </ul>
    </div>
  )
}

export default SideBar