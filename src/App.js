import './App.css';
import LoginScreen from './components/login';
import Interface from './components/interface';
import Navbar from './components/navbar';
import react, {useEffect} from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from './fire';
import { useState } from 'react/cjs/react.development';

function App() {

  //create state manager
  const [user, setUser] = useState('');
  //create an authication listener function
  const authListener = ()=>{
    onAuthStateChanged(auth, (user)=>{
      if(user){
        setUser(user.uid);
      }
    })
  }
  //listens for changes happening within web app
  useEffect(()=>{
    authListener();
  },[])

  return (
    <div className="App">
      {
        user ? (
          <section>
            <Navbar/>
            <Interface/>
          </section>
          
        ):(
          <LoginScreen/>
        )
      }
      
      
    </div>
  );
}

export default App;
