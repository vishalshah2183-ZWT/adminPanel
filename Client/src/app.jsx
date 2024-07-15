/* eslint-disable perfectionist/sort-imports */
import { useEffect, useState } from 'react';
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import { MyContext } from './context/MyContext';

import Cookies from 'js-cookie';
import { isModuleEmpty } from './utils/HelperFunctions';
import navConfig from './layouts/dashboard/config-navigation';
import axios from 'axios';



export default function App() {
  useScrollToTop();

  const [user, setUser] = useState()
  const [userDetails,setUserDetails] = useState()
  const [modules, setModules] = useState([])
  const [cookieFlag,setCookieFlag] = useState(false)
  const [updatedNavConfig,setUpdatedNavConfig] = useState();
  const User = JSON.parse(Cookies.get('user') || '{"token":"DummyToken"}')
 
  /* const token = setInterval(() => {
    if(Cookies.get('user')){
      setTokenFlag(tokenFlag => !tokenFlag)
    }
}, 1000); */
// console.log(tokenFlag)

cookieStore.addEventListener("change", (event) => {
  console.log(event?.changed)
  if(event?.changed?.length > 0)
    {
      setCookieFlag(true)
    }
    else{
      setCookieFlag(false)
    }
});

  useEffect(() => {
    // let User = JSON.parse(Cookies.get('user') || '{"token":"DummyToken"}')
    setUser(JSON.parse(Cookies.get('user') || '{"token":"DummyToken"}'))
    setModules(User?.access?.map((module) => Object.keys(module)).flat())
  }, [Cookies.get('user')])
  
  useEffect(()=>{
    let ModulesVariable2 = []
    userDetails?.accessDetails?.map((module)=>{
       if(isModuleEmpty(module?.[Object.keys(module)[0]]))
        {}
        else{
          ModulesVariable2?.push((Object.keys(module)[0])?.toLowerCase()?.replace(/[^a-z]/g, ""))
        }
    })
  
    setUpdatedNavConfig(navConfig?.filter((route)=> (ModulesVariable2?.includes(route?.title?.toLowerCase()?.replace(/[^a-z]/g, ""))) ))
  },[userDetails])
  useEffect(()=>{
    let token = JSON.parse(Cookies.get('user') || '{"token":"token not Available"}')?.token
    if(token !== "token not Available")
      {
          axios.get('http://localhost:5001/accessDetails',{headers:{Authorization:`${token}`}}).then((res)=>{
            setUserDetails(res?.data)
          }).catch((err)=>{
            console.log(err,"ERR")
          })

          
      }

  },[Cookies.get('user')])

  return (
    <MyContext.Provider value={{ user, setUser,updatedNavConfig, userDetails , cookieFlag}}>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </MyContext.Provider>

  );
}
