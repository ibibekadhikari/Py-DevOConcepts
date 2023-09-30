import React, { useEffect, useState } from 'react'
import "./ChatHome.css";
import axios from 'axios';


export const ChatHome = () => {
 
  let [url, setUrl] = useState(null);
  let [allMessages, setAllMessages] = useState([]);
  //DATE AND TIME START:

  const options = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, // Use AM/PM format
  };
  
  const date = new Date(); // Get the current date and time
  const formattedTime = new Intl.DateTimeFormat('en-US', options).format(date);

  //DATE AND TIME END:
  const [wikiData, setWikiData] = useState([])
  const [sentData, setSentData] = useState([])
  const [typedValue, setTypedValue] = useState("")
  const [data, setData] = useState({})
  
  const handleInputChange = (e) => {
    setTypedValue(e.target.value)
  }
  
  
  const sendRequest = () => {
    const url = 'http://192.168.0.4:8000/wikisearch/'+typedValue; // Replace with your actual API endpoint
    // Fetch data when the component mounts
    setSentData([...sentData,typedValue])
    allMessages.push({'time': formattedTime, 'data': typedValue})
    axios.get(url)
      .then(response => {
        setData(response.data); // Store the fetched data in state // Set loading to false
        allMessages.push({'time': formattedTime , 'data': response.data.content});
        console.log(allMessages)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
      
  }

  
  return (
    <div  className='ChatBox'>
              <div className="message-box">
        <ul>
            {
              allMessages.map((text, index)=>{
                if(index%2 === 0){
                return  <li className='sent-msg' style={{fontSize: '14px', margin: '4px'}}> <span style={{color: '#ba3f36'}}>{text.time} </span><span style={{color: '#f02213'}}> You:</span> {text.data}</li>
                }else{
                  return <li className='received-msg' style={{fontSize: '13px', margin: '4px', marginRight: '0px'}}><span style={{color: '#659c6c'}}>{text.time} </span><span style={{color: 'lightgreen'}}>Wiki:</span> {text.data} </li>
                }
              })
            }
        </ul>       
        </div>
        <div className="writebox">
            <input id="msgtext" value={typedValue} onChange={handleInputChange} type="text"></input>
            <button onClick={sendRequest} className="btn">SEND</button>
        </div> 
    </div>
  )
}
