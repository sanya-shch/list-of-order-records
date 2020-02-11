import React, {useState} from 'react';
import UploadFile from './components/UploadFile'

function App() {

  return (
    <div className="container">
      <h1 className="mt-5">List of order records</h1>
      <UploadFile/>
    </div>
  );
}

export default App;
