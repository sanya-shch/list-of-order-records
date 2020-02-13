import React, {useState} from 'react';
import UploadFile from './components/UploadFile'
import OrderList from "./components/OrdersList";

function App() {

  return (
    <div className="container">
      <h1 className="mt-5">List of order records</h1>
      <UploadFile/>
      <OrderList/>
    </div>
  );
}

export default App;
