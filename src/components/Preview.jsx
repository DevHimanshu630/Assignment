import React from 'react';

const Preview = ({ recording }) => {
  if (!recording) return null;
  const { dataUrl, type } = recording;
  const isVideo = type.startsWith('video');
  const isAudio = type.startsWith('audio');

  return (
    <div className="preview">
      <h3>Preview</h3>
      {isVideo && <video src={dataUrl} controls className="preview-media" />}
      {isAudio && <audio src={dataUrl} controls className="preview-media" />}
      <a href={dataUrl} download={`recording.${isVideo ? 'webm' : 'webm'}`} className="download-btn">
        Download
      </a>
    </div>
  );
};

export default Preview; 