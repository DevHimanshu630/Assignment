# Audio & Video Recorder React App

---

## Features
- Record **audio** or **video** from your device
- **Toggle** between audio and video mode
- **Timer** shows recording duration
- **Preview** your recording before downloading
- **Download** your recording as a .webm file
- **List of past recordings** (saved in your browser)
- **Persists recordings** using localStorage (even after refresh)
- Handles permission errors gracefully

---

---

## Getting Started

1. **Clone or Download** this repository/folder.

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser** and go to the URL shown in your terminal (usually [http://localhost:5173](http://localhost:5173)).

---

## How to Use

1. **Choose Mode**: Click the "Audio" or "Video" button to select what you want to record.
2. **Start Recording**: Click the "Record" button. Grant permission to use your microphone (and camera for video).
3. **Stop Recording**: Click "Stop" when done.
4. **Preview**: Watch or listen to your recording in the preview section.
5. **Download**: Click the "Download" link to save your recording as a .webm file.
6. **Past Recordings**: See your previous recordings in the list below the preview. They are saved in your browser (localStorage).

---

## Folder Structure
```
Assignement/
  src/
    App.jsx             # Main app component
    components/
      Recorder.jsx      # Recording logic and UI
      Preview.jsx       # Preview and download
      RecordingsList.jsx# List of past recordings
    hooks/
      useRecorder.js    # Custom hook for recording logic
    App.css             # App styles
    index.css           # Global styles
    main.jsx            # React entry point
  README.md             # This file
  ...
```

---

