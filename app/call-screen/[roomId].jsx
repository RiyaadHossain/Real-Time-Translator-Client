// // app/call/[roomId].js
// import { useEffect, useRef } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { RTCView, mediaDevices, RTCPeerConnection, RTCIceCandidate } from 'react-native-webrtc';
// import { useCall } from '@/contexts/CallContext';
// import { useLocalSearchParams } from 'expo-router';

// const pcConfig = {
//   iceServers: [
//     { urls: 'stun:stun.l.google.com:19302' },
//     // Add TURN server here for production
//   ]
// };

// export default function VideoCallScreen() {
//   const { roomId } = useLocalSearchParams();
//   const { localStream, setLocalStream, remoteStreams, setRemoteStreams, socket } = useCall();
//   const pcRefs = useRef({});

//   // 1. Initialize local media
//   useEffect(() => {
//     const initLocalStream = async () => {
//       const stream = await mediaDevices.getUserMedia({
//         audio: true,
//         video: { facingMode: 'user' }
//       });
//       setLocalStream(stream);
//     };

//     initLocalStream();

//     return () => {
//       localStream?.release();
//     };
//   }, [localStream, setLocalStream]);

//   // 2. Setup WebRTC connections
//   useEffect(() => {
//     if (!socket || !localStream) return;

//     const createPeerConnection = (userId) => {
//       const pc = new RTCPeerConnection(pcConfig);
//       pcRefs.current[userId] = pc;

//       // Add local tracks
//       localStream.getTracks().forEach(track => pc.addTrack(track, localStream));

//       // Handle remote stream
//       pc.ontrack = (event) => {
//         setRemoteStreams(prev => [...prev, event.streams[0]]);
//       };

//       // ICE Candidate handling
//       pc.onicecandidate = (event) => {
//         if (event.candidate) {
//           socket.emit('signal', userId, {
//             candidate: event.candidate
//           });
//         }
//       };

//       return pc;
//     };

//     socket.on('user-connected', (userId) => {
//       const pc = createPeerConnection(userId);
      
//       // Create offer if initiator
//       pc.createOffer()
//         .then(offer => pc.setLocalDescription(offer))
//         .then(() => {
//           socket.emit('signal', userId, {
//             sdp: pc.localDescription
//           });
//         });
//     });

//     socket.on('signal', (fromId, signal) => {
//       const pc = pcRefs.current[fromId] || createPeerConnection(fromId);
      
//       if (signal.sdp) {
//         pc.setRemoteDescription(new RTCSessionDescription(signal.sdp))
//           .then(() => {
//             if (signal.sdp.type === 'offer') {
//               return pc.createAnswer()
//                 .then(answer => pc.setLocalDescription(answer))
//                 .then(() => {
//                   socket.emit('signal', fromId, {
//                     sdp: pc.localDescription
//                   });
//                 });
//             }
//           });
//       } else if (signal.candidate) {
//         pc.addIceCandidate(new RTCIceCandidate(signal.candidate));
//       }
//     });

//     socket.on('user-disconnected', (userId) => {
//       pcRefs.current[userId]?.close();
//       delete pcRefs.current[userId];
//       setRemoteStreams(prev => prev.filter(stream => stream.id !== userId));
//     });

//     // Join the room
//     socket.emit('join-room', roomId, socket.id);

//     const pcRefCurr = pcRefs.current;

//     return () => {
//       Object.values(pcRefCurr).forEach(pc => pc.close());
//       socket.off('user-connected');
//       socket.off('signal');
//       socket.off('user-disconnected');
//     };
//   }, [socket, localStream, roomId, setRemoteStreams]);

//   return (
//     <View style={{ flex: 1, backgroundColor: 'black' }}>
//       {/* Remote Streams */}
//       {remoteStreams.map(stream => (
//         <RTCView
//           key={stream.id}
//           streamURL={stream.toURL()}
//           style={{ flex: 1 }}
//           objectFit="cover"
//         />
//       ))}

//       {/* Local Stream */}
//       {localStream && (
//         <RTCView
//           streamURL={localStream.toURL()}
//           style={{
//             position: 'absolute',
//             width: 100,
//             height: 150,
//             top: 20,
//             right: 20,
//             borderRadius: 8,
//           }}
//           objectFit="cover"
//           zOrder={1}
//         />
//       )}

//       {/* Call Controls */}
//       <TouchableOpacity
//         style={{
//           position: 'absolute',
//           bottom: 30,
//           alignSelf: 'center',
//           backgroundColor: 'red',
//           padding: 15,
//           borderRadius: 30,
//         }}
//         onPress={() => navigation.goBack()}
//       >
//         <Text style={{ color: 'white' }}>End Call</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }