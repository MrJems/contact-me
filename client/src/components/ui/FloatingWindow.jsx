import React, { useState, useEffect } from "react";

import { Fullscreen, FullscreenExit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import {getLocalStream} from "../../socketCommunication/webRTCHandler";
import { useDispatch, useSelector } from "react-redux";

const FloatingWindow = ({
  callType = "audio",
  avatarUrl = "https://avatar.iran.liara.run/public/32",
  onEndCall,
  remoteVideoRef,
  localVideoRef,
}) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const [isMaximized, setIsMaximized] = useState(false);

  const WINDOW_WIDTH = 300;
  const WINDOW_HEIGHT = 200;
  const { localStream } = useSelector((state) => state.call);

  getLocalStream(false)
  const handleMouseDown = (e) => {
    if (!isMaximized) {
      setIsDragging(true);
      setOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging && !isMaximized) {
      const newX = e.clientX - offset.x;
      const newY = e.clientY - offset.y;

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

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  });

  const toggleMaximize = () => {
    setIsMaximized((prev) => !prev);
  };


  const windowStyle = {
    position: "fixed",
    left: isMaximized ? 0 : position.x,
    top: isMaximized ? 0 : position.y,
    width: isMaximized ? "100%" : `${WINDOW_WIDTH}px`,
    height: isMaximized ? "100%" : `${WINDOW_HEIGHT}px`,
    backgroundColor: "#222",
    border: "1px solid #555",
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.3)",
    zIndex: 9999,
    cursor: isMaximized ? "default" : isDragging ? "grabbing" : "grab",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#E91E63",
    color: "#fff",
    padding: "4px 8px",
    cursor: isMaximized ? "default" : "grab",
    userSelect: "none",
  };

  const bodyContainerStyle = {
    flex: 1,
    position: "relative",
    backgroundColor: "#333",
  };

  const remoteVideoStyle = {
    width: isMaximized ? "100%" : "100%",
    height: isMaximized ? "100%" : "100%",
    objectFit: "cover",
    backgroundColor: "#000",
  };

  const localVideoContainerStyle = {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 120,
    height: 90,
    border: "2px solid #fff",
    overflow: "hidden",
    backgroundColor: "#333",
  };

  const localVideoStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    backgroundColor: "#000",
  };

  return (
    <div style={windowStyle} onMouseDown={handleMouseDown}>
      <div style={headerStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {callType === "audio" ? (
            <strong>Audio Call</strong>
          ) : (
            <strong>Video Call</strong>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {onEndCall && (
            <IconButton
              onClick={onEndCall}
              style={{ color: "#fff" }}
              size="small"
              aria-label="end-call"
            >
              <span role="img" aria-label="end call">
                \uD83D\uDD34
              </span>
            </IconButton>
          )}

          <IconButton
            onClick={toggleMaximize}
            style={{ color: "#fff" }}
            size="small"
            aria-label="fullscreen-toggle"
          >
            {isMaximized ? <FullscreenExit /> : <Fullscreen />}
          </IconButton>
        </div>
      </div>

      <div style={bodyContainerStyle}>
        {callType === "audio" ? (
          <img
            src={avatarUrl}
            alt="Avatar"
            style={{
              width: isMaximized ? "200px" : "80px",
              height: isMaximized ? "200px" : "80px",
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
                  ref={localStream}
                  style={localVideoStyle}
                  autoPlay
                  muted
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FloatingWindow;
