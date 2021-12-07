import './App.css';
import {useEffect,useState } from 'react'
import { io } from "socket.io-client";
import styled, { keyframes } from 'styled-components'


const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const Loader = styled.div`
  margin: auto;
  padding: 10px;
  border: 6px solid red;
  border-bottom-color: transparent;
  border-radius: 22px;
  animation: ${rotate} 1s infinite linear;
  height: 0;
  width: 0;
`



function App() {
  const [data, setData] = useState({})
  const [isLoad, setIsLoad] = useState(false)

  useEffect(()=>{

    setIsLoad(true)
    try{
    const socket = io("http://localhost:8080");
    socket.on("api", data => {
    setData(data)
    })
    }catch(err){
      console.log(err)
    }finally{
     setTimeout(()=>{setIsLoad(false)},400)
    }
     
}, []);

  function refreshPage() {
    window.location.reload(false);
  }



  return (
    <div className="App">
      {isLoad? <Loader/> : (
      <table>
    <thead>
        <tr>
            <th colSpan="4">BTC-USD</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Bid qty</td>
            <td>Bid price</td>
            <td>Ask price</td>
            <td>Ask qty</td>
        </tr>
        <tr>
            <td>{data.bidQty}</td>
            <td>{data.bidPrice}</td>
            <td>{data.askPrice}</td>
            <td>{data.askQty}</td>
        </tr>
    </tbody>
    </table>)}
<button className="button-9" onClick={refreshPage}>Refresh</button>
    </div>
    
  );
}

export default App;
