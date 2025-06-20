import { useRef, useState, useCallback } from 'react';

const getSupportedAudioMimeType = () => {
  const types = [
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/ogg;codecs=opus',
    'audio/ogg',
  ];
  for (const type of types) {
    if (window.MediaRecorder.isTypeSupported(type)) return type;
  }
  return '';
};

const getSupportedVideoMimeType = () => {
  const types = [
    'video/webm;codecs=vp9',
    'video/webm;codecs=vp8',
    'video/webm',
  ];
  for (const type of types) {
    if (window.MediaRecorder.isTypeSupported(type)) return type;
  }
  return '';
};

const useRecorder = (mode = 'audio', onSave) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(null);
  const [mediaStreamSupported] = useState(!!(navigator.mediaDevices && window.MediaRecorder));
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  const streamRef = useRef(null);
  const videoRef = useRef(null);

  const startRecording = useCallback(async () => {
    setError(null);
    setDuration(0);
    try {
      const constraints = mode === 'video' ? { audio: true, video: true } : { audio: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (mode === 'video' && videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      let mimeType = '';
      if (mode === 'video') {
        mimeType = getSupportedVideoMimeType();
      } else {
        mimeType = getSupportedAudioMimeType();
      }
      const options = mimeType ? { mimeType } : undefined;
      const mediaRecorder = new window.MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType || mediaRecorder.mimeType });
        const url = URL.createObjectURL(blob);
        onSave && onSave({ blob, url, type: mimeType || mediaRecorder.mimeType });
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }
        if (mode === 'video' && videoRef.current) {
          videoRef.current.srcObject = null;
        }
      };
      mediaRecorder.start();
      setIsRecording(true);
      setIsPaused(false);
      timerRef.current = setInterval(() => setDuration((d) => d + 1), 1000);
    } catch (err) {
      setError('Permission denied, device not found, or unsupported format.');
    }
  }, [mode, onSave]);

  const pauseRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      clearInterval(timerRef.current);
    }
  }, []);

  const resumeRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      timerRef.current = setInterval(() => setDuration((d) => d + 1), 1000);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      clearInterval(timerRef.current);
    }
  }, [mode]);

  const reset = useCallback(() => {
    setIsRecording(false);
    setIsPaused(false);
    setDuration(0);
    setError(null);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (mode === 'video' && videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, [mode]);

  return {
    isRecording,
    isPaused,
    duration,
    error,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    reset,
    mediaStreamSupported,
    videoRef,
  };
};

export default useRecorder; 