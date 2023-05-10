import { JitsiMeeting } from "@jitsi/react-sdk";
import jwt_decode from "jwt-decode";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from "react";
import axios from "axios";
function JitsiMett () {
  const [user, setUser] = useState("");
  const token = localStorage.getItem("jwtToken");
  const decodedToken = jwt_decode(token); 
  const Patient = useSelector((state) => 
  state.userSelectedSlice.meetWithPatient);
  useEffect(() => {
    axios
  .get(`http://localhost:5000/patient/getUserById/${decodedToken.id}`)
  .then((response) => {
    console.log("response is "+ response.data.userName)
    setUser(response.data.userName)
    console.log("Patient is" + Patient._id)
  })
  })
  
    return (  
        <>
         {(<JitsiMeeting
        domain="meet.jit.si"
        roomName={Patient._id}
        configOverwrite={{
          startWithAudioMuted: true,
          startWithVideoMuted: true,
        }}
        interfaceConfigOverwrite={{
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
          DEFAULT_REMOTE_DISPLAY_NAME: "Participant",
        }}
        userInfo={{ displayName: `${user}` }}
        onApiReady={(externalApi) => {
          // custom event listeners and commands can be attached here
          // the `externalApi` reference can also be stored locally to execute commands
        }}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = "800px";
        }}
      />)} 
        </>
    );
}

export default JitsiMett;