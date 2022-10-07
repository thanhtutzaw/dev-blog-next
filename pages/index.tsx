import { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
export default function Home() {
// const [User, setUser] = useState(null)

// useEffect(() => {
//   const value = localStorage.getItem("user")
//   const user = !!value ? JSON.parse(value) : undefined;
//   console.log("get from Local ", user)
//   setUser(user)
// }, [])

// if(User == null) return null

  return (
      <>
      <Navbar /> 
      </>
    
  )
}
