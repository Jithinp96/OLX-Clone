import React,{ createContext, useState } from "react";

export const productContext = createContext(null)


function Product({children}){
  const [productDetails,setProuctDetails] = useState(null)

  return (
    <productContext.Provider value={{productDetails,setProuctDetails}}>
      {children}
    </productContext.Provider>
  )
}

export default Product