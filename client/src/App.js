import React, {useState} from 'react';
import UploadFile from './components/UploadFile'
import OrderList from "./components/OrdersList";
import GetReport from "./components/GetReport";

function App() {

  return (
    <div className="container">
      <h1 className="mt-5">List of order records</h1>
      <UploadFile/>
      <OrderList/>
      <GetReport/>
    </div>
  );
}

export default App;
