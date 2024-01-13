import React, { useEffect, useState } from "react"
import { io } from "socket.io-client"

const URL = 'http://localhost:3000'
const socket = io.connect(URL)

function App() {
  const [id, setId] = useState('')

  const[allChats, setAllChats] = useState([])

  const [chat, setChat] = useState('')

  const [roomId, setRoomId] = useState('')

  useEffect(() => {
    socket.on('connect', () => {
      console.log("Connected with socket id ", socket.id)
      setId(socket.id)
    })
  }, [])

  useEffect(() => {
    socket.on('chat-rcvd', (msg) => {
      console.log(msg)
      setAllChats((prevChats) => [...prevChats, {id: msg.id, message: msg.message}])
    })
  }, [socket])

  const sendChat = (e) => {
    socket.emit('chat', {id: socket.id, message: chat}, roomId)
    setAllChats((prevChats) => [...prevChats, {id: socket.id, message: chat}])
    setChat('')
  }

  const [joinedRoom, setJoinedRoom] = useState('')

  const joinRoom = () => {
    socket.emit('join-room', roomId)
    setJoinedRoom(roomId)
  }

  return (
    <div className="w-[100vw] h-[100vh] bg-purple-500 flex flex-col pt-5 items-center text-white">
      <div
      className="flex gap-10 items-center"
      >
        <div className="flex flex-col w-[90%] justify-center items-center gap-3">
          <h1 className="text-[30px]">Web Sockets</h1>  
          <p className="text-[20px]">My ID - {id}</p>
        </div>
        <div className="w-[10%] flex flex-col gap-5">
          <div className="flex gap-5">
            <input
            type="text"
            placeholder="Enter room code"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="outline-none text-black text-[20px] h-[30px] py-2 px-2 rounded-md"
            ></input>
            <button 
            onClick={joinRoom}
            className="bg-purple-900 px-3 py-1 font-semibold rounded-lg">Enter</button>
          </div>
          <div className="min-w-[300px] ">Joined Room - {joinedRoom}</div>
        </div>
        
      </div>
      
      <div className="flex flex-col gap-3 mt-5">
        {
          allChats.length > 0 &&
          allChats.map((chat, idx) => (
            <div 
            key={idx}
            className="text-[30px] flex items-center gap-10 bg-purple-950 px-3 py-2">
              <p className="text-[20px] opacity-75">{chat.id} - </p>
              <p>{chat.message}</p>
            </div>
          ))
        }
      </div>
      <div className="w-full flex justify-center mt-[90vh] fixed">
        <label htmlFor="message"></label>
        <input
        id="message"
        placeholder="Enter a message"
        className="w-[80%] h-[40px] px-3 text-[20px] outline-none text-black"
        value={chat}
        onChange={(e) => setChat(e.target.value)}
        > </input>
        <button 
        onClick={sendChat}
        className="h-[40px] px-3 border-l-2 font-bold bg-white text-purple-950">
          Send
        </button>
      </div>
    </div>
  )
}

export default App
