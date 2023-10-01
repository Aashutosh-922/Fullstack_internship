// client/src/utils/faceApi.js
import * as faceapi from 'face-api.js';

export const loadFaceApiModels = async () => {
  await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
  await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
  await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
};

export const recognizeFace = async (referenceImage, currentImage) => {
  const referenceImageBlob = await fetch(referenceImage).then((res) => res.blob());
  const currentImageBlob = await fetch(currentImage).then((res) => res.blob());

  const referenceImageBitmap = await createImageBitmap(referenceImageBlob);
  const currentImageBitmap = await createImageBitmap(currentImageBlob);

  await loadFaceApiModels();

  const referenceImageCanvas = faceapi.createCanvasFromMedia(referenceImageBitmap);
  const referenceImageDisplaySize = { width: referenceImageBitmap.width, height: referenceImageBitmap.height };
  faceapi.matchDimensions(referenceImageCanvas, referenceImageDisplaySize);

  const currentImageCanvas = faceapi.createCanvasFromMedia(currentImageBitmap);
  const currentImageDisplaySize = { width: currentImageBitmap.width, height: currentImageBitmap.height };
  faceapi.matchDimensions(currentImageCanvas, currentImageDisplaySize);

  const faceMatcher = new faceapi.FaceMatcher(referenceImageCanvas);

  const detectedFaces = await faceapi.detectAllFaces(currentImageCanvas).withFaceLandmarks().withFaceDescriptors();
  const results = detectedFaces.map((face) => faceMatcher.findBestMatch(face.descriptor));

  return results;
};
