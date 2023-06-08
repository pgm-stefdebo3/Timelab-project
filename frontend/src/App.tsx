import { Outlet } from 'react-router-dom';

import 'intro.js/introjs.css';
import './main.css'

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
