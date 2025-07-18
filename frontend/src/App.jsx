import { useState } from 'react'
import Headbar from '../Components/Headbar'
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import User from './Pages/User'
import TodoApp from './Pages/Todo'
import TaskTime from './Pages/TaskTime'
import TodoPrev from '../Components/TodoPrev'
import ColorGrid from '../Components/FWCM' 
import Dashboard from './Pages/Dashboard'
import Hub from './Pages/Hub'
import ClippyAssistant from '../../clippy-component/ClippyAssistant/ClippyAssistant'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'

function App() {
  const isLoggedIn = Cookies.get("user")
  const [user, setUser] = useState()
  const routes = createBrowserRouter([
  {
    path:"/",
    element:<Home />
  },
    {
      path:"/dashboard",
      element:isLoggedIn ? <Dashboard /> : <Navigate to="/" replace />
    },
  {
    path:"/User/Login",
    element: <Login setUser={setUser}/> 
  },
  {
    path:"/User/Register",
    element:<Register setuser={setUser}/>
  },
  {
    path:"/Todo",
    element: isLoggedIn ?  <TodoApp />:<Navigate to="/" replace />
  },
  {
    path:"/User/About",
    element:isLoggedIn?  <User username={user}/> : <Navigate to="/" replace />
  },
  {
    path:"/Task",
    element: isLoggedIn? <TaskTime />: <Navigate to="/" replace />,
  },
  {
    path:'/hub',
    element: isLoggedIn ? <Hub /> : <Navigate to="/" replace />
  }
])
  return (
    <>
      <Headbar />
      <RouterProvider router={routes}/>
      <ClippyAssistant geminiApiKey="AIzaSyB_n2AknjfeZi00VXJijvILYSlaGOiDueA"
/>
    </>
  )
}

export default App
