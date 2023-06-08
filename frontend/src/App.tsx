import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import 'intro.js/introjs.css';
import './main.css'

const options = {
  showProgress: true,
  showBullets: false,
  showButtons: true,
  exitOnOverlayClick: false,
  exitOnEsc: true,
  nextLabel: 'Next',
  prevLabel: 'Back',
  doneLabel: 'Done',
  toolTipClass: 'introjs-tooltip',
};

function App() {
  return (    
    <div>
      <div className="App">
        <Outlet/>
      </div>
    </div>
  )
}

export default App
