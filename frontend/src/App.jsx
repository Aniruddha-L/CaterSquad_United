import { use, useState } from 'react'
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

function App() {
  const [user, setUser] = useState()
  const routes = createBrowserRouter([
  {
    path:"/",
    element:<Home />
  },
  {
    path:"/dashboard",
    element:<Dashboard />
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
    element: <TodoApp />
  },
  {
    path:"/User/About",
    element:<User username={user}/>
  },
  {
    path:"/Task",
    element:<TaskTime />,
  },
  {
    path:"/prev",
    element:<TodoPrev />
  },
  {
    path:'/color',
    element:<ColorGrid />
  },
  {
    path:'/hub',
    element: <Hub />
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
