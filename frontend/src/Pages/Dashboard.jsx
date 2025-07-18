import ColorGrid from '../../Components/FWCM'
import React, { useState, useEffect } from 'react';
import TodoPrev from '../../Components/TodoPrev'
import '../../Assets/css/dashboard.css'

function Dashboard(){
  return <div className='dashboard'>
    <TodoPrev />
    <ColorGrid />
  </div>
}

export default Dashboard
