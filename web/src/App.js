import React, {useState, useEffect} from 'react';
import api from './services/api';
import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';


function App() {

  const [devs, set_devs] = useState([]);

  useEffect(()=> {
    async function load_devs() {
      const response = await api.get('/devs');
      set_devs(response.data);
    }

    load_devs();

  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);
    
    set_devs( [...devs, response.data] ); 
  }

  async function handleDelDev(data) {
    const response = await api.post('/devs/delete', data);

    set_devs( devs.filter(function(dev){
      return dev.github_username !== data.github_username
    }) ); 

  }

  return (
    <div id="app">
      <aside>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main >  
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} onDeleteDev={handleDelDev} />
          ))}
        </ul>




      </main>


    </div>
  );
}

export default App;
