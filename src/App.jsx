import { useState, useEffect, useRef } from 'react'
import './App.css'
import Recorder from './components/Recorder'
import Preview from './components/Preview'
import RecordingsList from './components/RecordingsList'

// Helper to convert Blob to base64 data URL
const blobToDataURL = (blob) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.readAsDataURL(blob)
  })
}

function App() {
  const [mode, setMode] = useState('audio') 
  const [recording, setRecording] = useState(null) 
  const [recordings, setRecordings] = useState(() => {
    const saved = localStorage.getItem('recordings')
    return saved ? JSON.parse(saved) : []
  })
  const pendingBlobRef = useRef(null)

  
  useEffect(() => {
    const saved = localStorage.getItem('recordings')
    if (saved) {
      setRecordings(JSON.parse(saved))
    }
  }, [])

  // When a new recording is set, convert to base64 and update state
  useEffect(() => {
    if (recording && recording.blob) {
      blobToDataURL(recording.blob).then((dataUrl) => {
        const newRec = { dataUrl, type: recording.type }
        setRecording(newRec)
        const updated = [newRec, ...recordings]
        setRecordings(updated)
        localStorage.setItem('recordings', JSON.stringify(updated))
      })
    }
  
  }, [recording && recording.blob])

  // Called by Recorder when recording stops
  const handleSaveRecording = (rec) => {
    setRecording({ blob: rec.blob, type: rec.type })
  }

  return (
    <div className="app-container">
      <h1>Audio & Video Recorder</h1>
      <div className="mode-toggle">
        <button onClick={() => setMode('audio')} className={mode === 'audio' ? 'active' : ''}>Audio</button>
        <button onClick={() => setMode('video')} className={mode === 'video' ? 'active' : ''}>Video</button>
      </div>
      <Recorder mode={mode} onSave={handleSaveRecording} />
      <Preview recording={recording && recording.dataUrl ? recording : null} />
      <RecordingsList recordings={recordings} />
    </div>
  )
}

export default App
