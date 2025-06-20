import React from 'react';

const RecordingsList = ({ recordings }) => {
  if (!recordings || recordings.length === 0) return null;
  return (
    <div className="recordings-list">
      <h3>Past Recordings</h3>
      <ul>
        {recordings.map((rec, idx) => (
          <li key={idx}>
            {rec.type.startsWith('video') ? (
              <video src={rec.dataUrl} controls width={120} />
            ) : (
              <audio src={rec.dataUrl} controls />
            )}
            <a href={rec.dataUrl} download={`recording-${idx}.${rec.type.startsWith('video') ? 'webm' : 'webm'}`}>Download</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecordingsList; 