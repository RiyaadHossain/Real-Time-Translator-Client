// contexts/CallContext.js
import { createContext, useContext, useState } from 'react';
import { io } from 'socket.io-client';

const CallContext = createContext();

export const CallProvider = ({ children }) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);
  const [socket, setSocket] = useState(null);

  const connectSocket = () => {
    const newSocket = io('http://localhost:5000', {
      transports: ['websocket']
    });
    setSocket(newSocket);
    return newSocket;
  };

  return (
    <CallContext.Provider value={{
      localStream, setLocalStream,
      remoteStreams, setRemoteStreams,
      socket, connectSocket
    }}>
      {children}
    </CallContext.Provider>
  );
};

export const useCall = () => useContext(CallContext);