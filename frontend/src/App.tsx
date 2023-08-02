import { Outlet } from 'react-router-dom';

function App() {
  return (    
    <div>
      <div className="App">
        <Outlet/>
      </div>
    </div>
  )
};

export default App;