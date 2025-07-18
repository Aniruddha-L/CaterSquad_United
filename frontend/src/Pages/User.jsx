import React, {useState, useEffect} from 'react'
import axios from 'axios'
import '../../Assets/css/about.css'

const User = ({ username = "abc" }) => {

  username = "abc";
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [date, setDate] = useState("")
  const [msg, setMsg] = useState("")

  useEffect(() => {
  const fetchUserData = async () => {
    try {
      const resp = await axios.get(`http://localhost:5555/user/about/${username}`);
      if (resp.status === 200) {
        console.log(resp.data[0][0].DateOfJoin)
        setName(resp.data[0][0].name);
        setEmail(resp.data[0][0].email);
        const date = new Date(resp.data[0][0].DateOfJoin).toISOString().split("T")[0];
        setDate(date);
      }
      else{
        console.log(resp)
      }
    } catch (error) {
      setMsg("Error in fetching data. Please try again.");
    }
  };

  fetchUserData();
}, []); 


   return (
    // <div className='container-about'>
    //   <div className="name"><span>NAME:</span> <p> {name}</p></div>
    //   <div className="email"><span>EMAIL:</span> <p> {email}</p></div>
    //   <div className="doj"><span>DATE OF JOINING:</span> <p> {date}</p></div>
    // </div>
    <table className='container-about' border="2px solid white">
      <thead>
        <tr>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>DATE OF JOINING</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{name}</td>
          <td>{email}</td>
          <td>{date}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default User
