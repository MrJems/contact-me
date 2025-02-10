// import React, { useRef, useState, useEffect } from "react";
// import { Fullscreen, FullscreenExit } from "@mui/icons-material";
// import { IconButton } from "@mui/material";
// import { useSelector , useDispatch} from "react-redux";
// import { setLocalStream } from "../../features/call/callSlice";


// const FloatingWindow = ({
//   callType = "audio",
//   avatarUrl = "https://avatar.iran.liara.run/public/32",
//   onEndCall,
// }) => {
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
// const dispatch = useDispatch();

//   const {localStream, remoteStream }= useSelector((state) => state.call);

//   const [position, setPosition] = useState({ x: 50, y: 50 });
//   const [offset, setOffset] = useState({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);
//   const [isMaximized, setIsMaximized] = useState(false);

//   const WINDOW_WIDTH = 300;
//   const WINDOW_HEIGHT = 200;

//   useEffect(() => {
//     if (localStream && localVideoRef.current) {
//         console.log("local steam 2")
//       localVideoRef.current.srcObject = localStream;
//     }
//     if( remoteStream && remoteVideoRef.current){
//         console.log("local steam 2")
//         remoteVideoRef.current.srcObject = remoteStream;
//     }

//   }, [localStream, remoteStream, isMaximized]);

//   const handleMouseDown = (e) => {
//     if (!isMaximized) {
//       setIsDragging(true);
//       setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
//     }
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   const handleMouseMove = (e) => {
//     if (isDragging && !isMaximized) {
//       const newX = e.clientX - offset.x;
//       const newY = e.clientY - offset.y;

//       const clampedX = Math.max(
//         0,
//         Math.min(window.innerWidth - WINDOW_WIDTH, newX)
//       );
//       const clampedY = Math.max(
//         0,
//         Math.min(window.innerHeight - WINDOW_HEIGHT, newY)
//       );

//       setPosition({ x: clampedX, y: clampedY });
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousemove", handleMouseMove);
//     document.addEventListener("mouseup", handleMouseUp);
//     return () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("mouseup", handleMouseUp);
//     };
//   });

//   const toggleMaximize = () => {
//     setIsMaximized((prev) => !prev);
//   };

//   const windowStyle = {
//     position: "fixed",
//     left: isMaximized ? 0 : position.x,
//     top: isMaximized ? 0 : position.y,
//     width: isMaximized ? "100%" : `${WINDOW_WIDTH}px`,
//     height: isMaximized ? "100%" : `${WINDOW_HEIGHT}px`,
//     backgroundColor: "#222",
//     border: "1px solid #555",
//     boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.3)",
//     zIndex: 9999,
//     cursor: isMaximized ? "default" : isDragging ? "grabbing" : "grab",
//     overflow: "hidden",
//     display: "flex",
//     flexDirection: "column",
//   };

//   const headerStyle = {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     backgroundColor: "#E91E63",
//     color: "#fff",
//     padding: "4px 8px",
//     cursor: isMaximized ? "default" : "grab",
//     userSelect: "none",
//   };

//   const bodyContainerStyle = {
//     flex: 1,
//     position: "relative",
//     backgroundColor: "#333",
//   };

//   const remoteVideoStyle = {
//     width: isMaximized ? "100%" : "100%",
//     height: isMaximized ? "100%" : "100%",
//     objectFit: "cover",
//     backgroundColor: "#000",
//   };

//   const localVideoContainerStyle = {
//     position: "absolute",
//     bottom: 10,
//     right: 10,
//     width: 120,
//     height: 90,
//     border: "2px solid #fff",
//     overflow: "hidden",
//     backgroundColor: "#333",
//   };

//   const localVideoStyle = {
//     width: "100%",
//     height: "100%",
//     objectFit: "cover",
//     backgroundColor: "#000",
//   };

//   return (
//     <div style={windowStyle} onMouseDown={handleMouseDown}>
//       <div style={headerStyle}>
//         <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//           {callType === "audio" ? (
//             <strong>Audio Call</strong>
//           ) : (
//             <strong>Video Call</strong>
//           )}
//         </div>

//         <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//           {onEndCall && (
//             <IconButton
//               onClick={onEndCall}
//               style={{ color: "#fff" }}
//               size="small"
//               aria-label="end-call"
//             >
//               <span role="img" aria-label="end call">
//                 \uD83D\uDD34
//               </span>
//             </IconButton>
//           )}

//           <IconButton
//             onClick={toggleMaximize}
//             style={{ color: "#fff" }}
//             size="small"
//             aria-label="fullscreen-toggle"
//           >
//             {isMaximized ? <FullscreenExit /> : <Fullscreen />}
//           </IconButton>
//         </div>
//       </div>

//       <div style={bodyContainerStyle}>
//         {callType === "audio" ? (
//           <img
//             src={avatarUrl}
//             alt="Avatar"
//             style={{
//               width: isMaximized ? "200px" : "80px",
//               height: isMaximized ? "200px" : "80px",
//               borderRadius: "50%",
//               objectFit: "cover",
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//             }}
//           />
//         ) : (
//           <>
//             <video
//               ref={remoteVideoRef}
//               style={remoteVideoStyle}
//               autoPlay
//               muted={false}
//             />

//             {isMaximized && (
//               <div style={localVideoContainerStyle}>
//                 <video
//                   ref={localVideoRef}
//                   style={localVideoStyle}
//                   autoPlay
             
//                   muted={true} 
//                 />
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FloatingWindow;



// import React, { useRef, useState, useEffect } from "react";
// import {
//   Fullscreen,
//   FullscreenExit,
//   Mic,
//   MicOff,
//   Videocam,
//   VideocamOff,
//   CallEnd,
// } from "@mui/icons-material";
// import { IconButton } from "@mui/material";
// import { useSelector } from "react-redux";

// const CallWindow = ({
//   avatarUrl = "https://avatar.iran.liara.run/public/32",
//   onEndCall,
// }) => {
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);

//   const { localStream, remoteStream, audioOnly } = useSelector(
//     (state) => state.call
//   );

//   // --- Dragging / Position ---
//   const [position, setPosition] = useState({ x: 50, y: 50 });
//   const [offset, setOffset] = useState({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);

//   // --- Window / Fullscreen state ---
//   const [isMaximized, setIsMaximized] = useState(false);

//   // --- Mute / Camera states ---
//   const [isMuted, setIsMuted] = useState(false);
//   const [isVideoOn, setIsVideoOn] = useState(true);

//   // Non-fullscreen (floating) width/height
//   const WINDOW_WIDTH = 300;
//   const WINDOW_HEIGHT = 200;

//   // ----------------------------------------------------------------
//   // Use Effects
//   // ----------------------------------------------------------------
//   useEffect(() => {
//     if (localStream && localVideoRef.current) {
//       localVideoRef.current.srcObject = localStream;
//     }
//     if (remoteStream && remoteVideoRef.current) {
//       remoteVideoRef.current.srcObject = remoteStream;
//     }
//   }, [localStream, remoteStream, isMaximized]);

//   // ----------------------------------------------------------------
//   // Pointer Events for Drag-and-Drop
//   // ----------------------------------------------------------------
//   const handlePointerDown = (e) => {
//     if (!isMaximized) {
//       // If user clicked on bottom menu, do not start dragging
//       if (e.target.getAttribute("data-bottom-menu")) return;

//       setIsDragging(true);
//       setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
//       // Capture pointer so we continue to get pointer events even if we move off the element
//       e.target.setPointerCapture(e.pointerId);
//     }
//   };

//   const handlePointerMove = (e) => {
//     if (isDragging && !isMaximized) {
//       const newX = e.clientX - offset.x;
//       const newY = e.clientY - offset.y;

//       // Keep window within viewport
//       const clampedX = Math.max(
//         0,
//         Math.min(window.innerWidth - WINDOW_WIDTH, newX)
//       );
//       const clampedY = Math.max(
//         0,
//         Math.min(window.innerHeight - WINDOW_HEIGHT, newY)
//       );
//       setPosition({ x: clampedX, y: clampedY });
//     }
//   };

//   const handlePointerUp = (e) => {
//     if (isDragging) {
//       setIsDragging(false);
//       // Release pointer capture
//       e.target.releasePointerCapture(e.pointerId);
//     }
//   };

//   // ----------------------------------------------------------------
//   // Toggle Fullscreen
//   // ----------------------------------------------------------------
//   const toggleMaximize = () => {
//     setIsMaximized((prev) => !prev);
//   };

//   // ----------------------------------------------------------------
//   // Mute / Camera
//   // ----------------------------------------------------------------
//   const toggleMute = () => {
//     if (localStream) {
//       localStream.getAudioTracks().forEach((track) => {
//         // If currently muted, unmute => track.enabled = true
//         track.enabled = isMuted;
//       });
//     }
//     setIsMuted((prev) => !prev);
//   };

//   const toggleVideo = () => {
//     if (localStream) {
//       localStream.getVideoTracks().forEach((track) => {
//         // If video is on, turn off => track.enabled = false
//         track.enabled = !isVideoOn;
//       });
//     }
//     setIsVideoOn((prev) => !prev);
//   };

//   // ----------------------------------------------------------------
//   // Styles
//   // ----------------------------------------------------------------

//   // Container: either floating or fullscreen
//   const containerStyle = {
//     position: "fixed",
//     left: isMaximized ? 0 : position.x,
//     top: isMaximized ? 0 : position.y,
//     width: isMaximized ? "100vw" : `${WINDOW_WIDTH}px`,
//     height: isMaximized ? "80vh" : `${WINDOW_HEIGHT}px`,
//     backgroundColor: "#222",
//     border: isMaximized ? "none" : "1px solid #555",
//     boxShadow: isMaximized ? "none" : "0px 0px 6px rgba(0, 0, 0, 0.3)",
//     zIndex: 9999,
//     display: "flex",
//     flexDirection: "column",
//     overflow: "hidden",
//     boxSizing: "border-box",
//     // Show grab/grabbing cursor only if not maximized
//     cursor: isMaximized ? "default" : isDragging ? "grabbing" : "grab",
//   };

//   // Draggable area: pointer events
//   const videoAreaStyle = {
//     flex: 1,
//     position: "relative",
//     overflow: "hidden", // ensures the video is cropped
//     backgroundColor: "#333",
//     touchAction: "none", // important for preventing scroll on touch
//   };

//   // Remote video
//   const remoteVideoStyle = {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "100%",
//     objectFit: "cover",
//     backgroundColor: "#000",
//   };

//   // Local video in the corner (if fullscreen)
//   const localVideoContainerStyle = {
//     position: "absolute",
//     bottom: 10,
//     right: 10,
//     width: 120,
//     height: 90,
//     border: "2px solid #fff",
//     overflow: "hidden",
//     backgroundColor: "#333",
//     borderRadius: "4px",
//     zIndex: 1,
//   };

//   const localVideoStyle = {
//     width: "100%",
//     height: "100%",
//     objectFit: "cover",
//     backgroundColor: "#000",
//   };

//   // Bottom menu
//   const bottomMenuWrapperStyle = {
//     display: "flex",
//     justifyContent: "center",
//     backgroundColor: "transparent",
//     boxSizing: "border-box",
//   };

//   const bottomMenuStyle = {
//     backgroundColor: "#E91E63",
//     borderRadius: "24px",
//     padding: "8px 16px",
//     display: "flex",
//     justifyContent: "space-evenly",
//     alignItems: "center",
//     width: "100%",
//     maxWidth: "600px",
//     margin: "8px 0",
//   };

//   const iconColorStyle = { color: "#FFFFFF" };

//   // ----------------------------------------------------------------
//   // Render
//   // ----------------------------------------------------------------
//   return (
//     <div style={containerStyle}>
//       {/* Draggable / Video area */}
       

//       <div
//         style={videoAreaStyle}
//         onPointerDown={handlePointerDown}
//         onPointerMove={handlePointerMove}
//         onPointerUp={handlePointerUp}
//       >
//         {audioOnly ? (
//           <img
//             src={avatarUrl}
//             alt="Avatar"
//             style={{
//               width: "40%",
//               maxWidth: "200px",
//               borderRadius: "50%",
//               objectFit: "cover",
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//             }}
//           />
//         ) : (
//           <>
//             <video
//               ref={remoteVideoRef}
//               style={remoteVideoStyle}
//               autoPlay
//               muted={false}
//             />
//             {isMaximized && (
//               <div style={localVideoContainerStyle}>
//                 <video
//                   ref={localVideoRef}
//                   style={localVideoStyle}
//                   autoPlay
//                   muted={true}
//                 />
//               </div>
//             )}
//           </>
//         )}
//       </div>

//      {/* Bottom Menu (non-draggable area) */}
//      <div style={bottomMenuWrapperStyle} data-bottom-menu>
//         <div style={bottomMenuStyle}>
//           {/* Mute / Unmute */}
//           <IconButton onClick={toggleMute} style={iconColorStyle} size="medium">
//             {isMuted ? <MicOff /> : <Mic />}
//           </IconButton>

//           {/* Video On/Off (only if NOT audio-only) */}
//           {!audioOnly && (
//             <IconButton
//               onClick={toggleVideo}
//               style={iconColorStyle}
//               size="medium"
//             >
//               {isVideoOn ? <Videocam /> : <VideocamOff />}
//             </IconButton>
//           )}

//           {/* Toggle Fullscreen */}
//           <IconButton onClick={toggleMaximize} style={iconColorStyle} size="medium">
//             {isMaximized ? <FullscreenExit /> : <Fullscreen />}
//           </IconButton>

//           {/* End Call */}
//           {onEndCall && (
//             <IconButton onClick={onEndCall} style={iconColorStyle} size="medium">
//               <CallEnd />
//             </IconButton>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CallWindow;

import React, { useRef, useState, useEffect } from "react";
import {
  Fullscreen,
  FullscreenExit,
  Mic,
  MicOff,
  Videocam,
  VideocamOff,
  CallEnd,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";

const CallWindow = ({
  avatarUrl = "https://avatar.iran.liara.run/public/32",
  onEndCall,
}) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const { localStream, remoteStream, audioOnly } = useSelector(
    (state) => state.call
  );

  // --- Dragging / Position ---
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // --- Window / Fullscreen state ---
  const [isMaximized, setIsMaximized] = useState(false);

  // --- Mute / Camera states ---
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);

  // Non-fullscreen (floating) width/height
  const WINDOW_WIDTH = 300;
  const WINDOW_HEIGHT = 200;

  // ----------------------------------------------------------------
  // Use Effects
  // ----------------------------------------------------------------
  useEffect(() => {
    if (localStream && localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }
    if (remoteStream && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [localStream, remoteStream, isMaximized]);

  // ----------------------------------------------------------------
  // Pointer Events for Drag-and-Drop
  // ----------------------------------------------------------------
  const handlePointerDown = (e) => {
    if (!isMaximized) {
      // If user clicked on bottom menu or any element with data-bottom-menu, do not start dragging
      if (e.target.getAttribute("data-bottom-menu")) return;

      setIsDragging(true);
      setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
      // Capture pointer so we continue to get pointer events even if we move off the element
      e.target.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e) => {
    if (isDragging && !isMaximized) {
      const newX = e.clientX - offset.x;
      const newY = e.clientY - offset.y;

      // Keep window within viewport
      const clampedX = Math.max(
        0,
        Math.min(window.innerWidth - WINDOW_WIDTH, newX)
      );
      const clampedY = Math.max(
        0,
        Math.min(window.innerHeight - WINDOW_HEIGHT, newY)
      );
      setPosition({ x: clampedX, y: clampedY });
    }
  };

  const handlePointerUp = (e) => {
    if (isDragging) {
      setIsDragging(false);
      // Release pointer capture
      e.target.releasePointerCapture(e.pointerId);
    }
  };

  // ----------------------------------------------------------------
  // Toggle Fullscreen
  // ----------------------------------------------------------------
  const toggleMaximize = () => {
    setIsMaximized((prev) => !prev);
  };

  // ----------------------------------------------------------------
  // Mute / Camera
  // ----------------------------------------------------------------
  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        // If currently muted, unmute => track.enabled = true
        track.enabled = isMuted;
      });
    }
    setIsMuted((prev) => !prev);
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        // If video is on, turn off => track.enabled = false
        track.enabled = !isVideoOn;
      });
    }
    setIsVideoOn((prev) => !prev);
  };

  // ----------------------------------------------------------------
  // Styles
  // ----------------------------------------------------------------

  // Container: either floating or fullscreen
  const containerStyle = {
    position: "fixed",
    left: isMaximized ? 0 : position.x,
    top: isMaximized ? 0 : position.y,
    width: isMaximized ? "100vw" : `${WINDOW_WIDTH}px`,
    height: isMaximized ? "100vh" : `${WINDOW_HEIGHT}px`,
    backgroundColor: "#222",
    border: isMaximized ? "none" : "1px solid #555",
    boxShadow: isMaximized ? "none" : "0px 0px 6px rgba(0, 0, 0, 0.3)",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxSizing: "border-box",
    borderRadius: isMaximized ? "0px": "30px",
    // Show grab/grabbing cursor only if not maximized
    cursor: isMaximized ? "default" : isDragging ? "grabbing" : "grab",
  };

  // Draggable area: pointer events
  const videoAreaStyle = {
    flex: 1,
    position: "relative",   // so the bottom menu can be positioned absolutely
    overflow: "hidden",     // ensures the video is cropped
    backgroundColor: "#333",
    touchAction: "none",    // important for preventing scroll on touch
  };

  // Remote video
  const remoteVideoStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    backgroundColor: "#000",
  };

  // Local video in the corner (if fullscreen)
  const localVideoContainerStyle = {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 120,
    height: 90,
    border: "2px solid #fff",
    overflow: "hidden",
    backgroundColor: "#333",
    borderRadius: "4px",
    zIndex: 1,
  };

  const localVideoStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    backgroundColor: "#000",
  };

  // Bottom menu (absolute over the video)
  const bottomMenuWrapperStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    boxSizing: "border-box",
    padding: isMaximized ? "36px": "8px", // optional spacing
  };

  const bottomMenuStyle = {
    backgroundColor: "#E91E63",
    borderRadius: "24px",
    padding: "8px 16px",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    maxWidth: "600px",
  };

  const iconColorStyle = { color: "#FFFFFF" };

  // ----------------------------------------------------------------
  // Render
  // ----------------------------------------------------------------
  return (
    <div style={containerStyle}>
      {/* Draggable / Video area */}
      <div
        style={videoAreaStyle}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Remote or audio-only view */}
        {audioOnly ? (
          <img
            src={avatarUrl}
            alt="Avatar"
            style={{
              width: "40%",
              maxWidth: "200px",
              borderRadius: "50%",
              objectFit: "cover",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ) : (
          <>
            <video
              ref={remoteVideoRef}
              style={remoteVideoStyle}
              autoPlay
              muted={false}
            />
            {isMaximized && (
              <div style={localVideoContainerStyle}>
                <video
                  ref={localVideoRef}
                  style={localVideoStyle}
                  autoPlay
                  muted
                />
              </div>
            )}
          </>
        )}

        {/* Bottom menu floating over the video */}
        <div style={bottomMenuWrapperStyle} data-bottom-menu>
          <div style={bottomMenuStyle}>
            {/* Mute / Unmute */}
            <IconButton
              onClick={toggleMute}
              style={iconColorStyle}
              size="medium"
              data-bottom-menu
            >
              {isMuted ? <MicOff /> : <Mic />}
            </IconButton>

            {/* Video On/Off (only if NOT audio-only) */}
            {!audioOnly && (
              <IconButton
                onClick={toggleVideo}
                style={iconColorStyle}
                size="medium"
                data-bottom-menu
              >
                {isVideoOn ? <Videocam /> : <VideocamOff />}
              </IconButton>
            )}

            {/* Toggle Fullscreen */}
            <IconButton
              onClick={toggleMaximize}
              style={iconColorStyle}
              size="medium"
              data-bottom-menu
            >
              {isMaximized ? <FullscreenExit /> : <Fullscreen />}
            </IconButton>

            {/* End Call */}
            {onEndCall && (
              <IconButton
                onClick={onEndCall}
                style={iconColorStyle}
                size="medium"
                data-bottom-menu
              >
                <CallEnd />
              </IconButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallWindow;
