import { debounce } from "lodash";
import { useCallback, useEffect } from "react";
import { createContext, useState } from "react";



export const cardContext = createContext()

export const CardContextProvider = ({children}) => {

  
  const [seeModal, setSeeModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState("")




    return  <cardContext.Provider value={{
        seeModal, setSeeModal, loading, setLoading, setIsLoggedIn, isLoggedIn, userType, setUserType
      }} > {children}</cardContext.Provider>
}