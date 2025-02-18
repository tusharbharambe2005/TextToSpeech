import React from 'react';

const SavedTranscriptionsList = ({ savedTranscriptions, setShowList }) => {
  return (
    <div className="saved-transcriptions">
      <button className="back-btn" onClick={() => setShowList(false)}>{'<-'}</button>
      <h3>Previously Converted Transcriptions</h3>
      {savedTranscriptions.length === 0 ? (
        <p>Loading transcriptions...</p>
      ) : (
        <ul className="transcriptions-list">
          {savedTranscriptions.map((item) => (
            <li key={item.id} className="transcription-item">
              <strong>{item.text}</strong>
              <br />
              <small>{new Date(item.created_at).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedTranscriptionsList;
