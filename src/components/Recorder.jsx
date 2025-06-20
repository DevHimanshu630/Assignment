import React, { useEffect } from 'react';
import useRecorder from '../hooks/useRecorder';

const Recorder = ({ mode, onSave }) => {
  const {
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
  } = useRecorder(mode, onSave);

  useEffect(() => {
    reset();
  }, [mode, reset]);

  if (!mediaStreamSupported) {
    return <div>Your browser does not support media recording.</div>;
  }

  return (
    <div className="recorder">
      {mode === 'video' && <video ref={videoRef} autoPlay muted className="video-preview" />}
      <div className="controls">
        {!isRecording && (
          <button onClick={startRecording}>Record</button>
        )}
        {isRecording && !isPaused && (
          <>
            <button onClick={pauseRecording}>Pause</button>
            <button onClick={stopRecording}>Stop</button>
          </>
        )}
        {isRecording && isPaused && (
          <>
            <button onClick={resumeRecording}>Resume</button>
            <button onClick={stopRecording}>Stop</button>
          </>
        )}
      </div>
      <div className="timer">{duration > 0 && `Duration: ${duration}s`}</div>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Recorder; 