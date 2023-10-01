// client/src/components/Home.js
import React, { useRef, useEffect } from 'react';
import { drawMesh } from './mediapipeUtils';
import { recognizeFace } from '../utils/faceApi';


const Home = () => {
  const [attendance, setAttendance] = useState([]);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

 useEffect(() => {
    const runMediaPipe = async () => {
      // ... Previous code

      const results = await recognizeFace(referenceImageUrl, currentImageUrl);

      // Check if a face is recognized
      if (results && results.length > 0) {
        // Log the attendance
        setAttendance([...attendance, new Date().toLocaleString()]);
      }
    };

    runMediaPipe();
  }, [attendance]);


  useEffect(() => {
    const runMediaPipe = async () => {
      // Load MediaPipe and set up facial recognition
      const mediapipe = require('@mediapipe/drawers');
      const webcam = webcamRef.current;
      const canvas = canvasRef.current;

      const faceMesh = new mediapipe.FaceMesh();
      await faceMesh.initialize();
      faceMesh.setOptions({
        selfieMode: false,
      });

      await faceMesh.load();
      faceMesh.drawFaceLandmarks(canvas);
      const camera = new mediapipe.Camera(webcam);

      camera.setEventListener((msg) => {
        if (msg.status) {
          canvas.width = camera.videoWidth;
          canvas.height = camera.videoHeight;
          faceMesh.send({ image: msg.image });
        }
      });
      camera.start(webcam);

      // TODO: Implement attendance logging based on face recognition
    };
    

    runMediaPipe();
  }, []);


  
  useEffect(() => {
  const runMediaPipe = async () => {
    // ... (Previous code)

    // Facial recognition with face-api.js
    const referenceImageUrl = 'URL_TO_REFERENCE_IMAGE'; // Replace with the actual URL of the reference image
    const currentImageUrl = 'URL_TO_CAPTURED_IMAGE'; // Replace with the actual URL of the captured image

    const results = await recognizeFace(referenceImageUrl, currentImageUrl);

    // results contains information about recognized faces

    // TODO: Implement attendance logging based on face recognition
  };

  runMediaPipe();
}, []);


  return (
    <div>
      <h2>User Homepage</h2>
      <video ref={webcamRef} autoPlay playsInline muted width="640" height="480" />
      <canvas ref={canvasRef} width="640" height="480" />
    </div>
  );
};

export default Home;
