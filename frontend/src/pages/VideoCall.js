import React, { useRef, useEffect } from 'react';
import io from 'socket.io-client';

const VideoCall = () => {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const peerConnection = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io('http://localhost:5000');

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localVideoRef.current.srcObject = stream;

        peerConnection.current = new RTCPeerConnection();

        stream.getTracks().forEach((track) => {
          peerConnection.current.addTrack(track, stream);
        });

        peerConnection.current.ontrack = (event) => {
          remoteVideoRef.current.srcObject = event.streams[0];
        };

        peerConnection.current.onicecandidate = (event) => {
          if (event.candidate) {
            socket.current.emit('ice-candidate', { candidate: event.candidate, room: 'room1' });
          }
        };

        socket.current.emit('join', 'room1');

        socket.current.on('user-joined', async () => {
          const offer = await peerConnection.current.createOffer();
          await peerConnection.current.setLocalDescription(offer);
          socket.current.emit('offer', { offer, room: 'room1' });
        });

        socket.current.on('offer', async (data) => {
          await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data));
          const answer = await peerConnection.current.createAnswer();
          await peerConnection.current.setLocalDescription(answer);
          socket.current.emit('answer', { answer, room: 'room1' });
        });

        socket.current.on('answer', async (data) => {
          await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data));
        });

        socket.current.on('ice-candidate', async (data) => {
          try {
            await peerConnection.current.addIceCandidate(data);
          } catch (e) {
            console.error('Error adding received ice candidate', e);
          }
        });
      });
  }, []);

  return (
    <div>
      <video ref={localVideoRef} autoPlay muted />
      <video ref={remoteVideoRef} autoPlay />
    </div>
  );
};

export default VideoCall;
