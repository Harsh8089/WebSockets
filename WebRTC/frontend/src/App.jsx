import { useEffect, useRef, useState } from 'react'

function App() {
  const [myVideo, setMyVideo] = useState()
  const videoRef = useRef()



  useEffect(() => {  
    

    createOffer();
    

    // navigator.mediaDevices.getUserMedia({
    //   video: true,
    //   audio: true
    // })
    // .then(stream => {
    //   setMyVideo(stream)
    //   videoRef.current.srcObject = stream
    // })
    // .catch(err => {
    //   console.error('Error while accessing media devices. ', err)
    // })

    // async function getConnectedDevices(type) {
    //     const devices = await navigator.mediaDevices.enumerateDevices();
    //     return devices.filter(device => device.kind === type)
    // }
    
    // getConnectedDevices('videoinput')
    // .then(videoCameras => console.log(videoCameras));
    

  }, [])

  // Sender sending SDP (creates offer)
  const createOffer = async () => {
    try {
      let peerConnection = new RTCPeerConnection(
        {
            iceServers:[
                {
                    urls:['stun:stun1.1.google.com:19302', 'stun:stun2.1.google.com:19302']
                }
            ]
        }
      )
      
      let offer = await peerConnection.createOffer()
      await peerConnection.setLocalDescription(offer)

      console.log("OFFER SESSION DESCRIPTIVE PROTOCOL\n", JSON.stringify(offer))

      // Adding a stream to peerConnection for receiver peer
      // myVideo.getTrack().forEach(track => 
        
      // )


    } catch (error) {
      console.log("Error while creating offer ", error)
    }
  }

  return (
   <div>
      <video 
        className='w-[100vw] h-[100vh]' 
        autoPlay 
        muted 
        ref={videoRef}>
      </video>
   </div>
  )
}

export default App
