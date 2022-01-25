import react, {useState, useEffect} from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../fire';


export default function LoginScreen(){

    // create states to collect user input;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //create login function
    function HandleLogin(){
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
         // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
  }).then(alert('success'));
    }

    //listen for changes
    return(
        <main className='loginMain'>
            <h1>Samsung App Factory</h1>
            <form className='formContainer'>
            <label>Email:</label><br/>
            <input 
            type="text" 
            className='textInput' 
            placeholder='Email'
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            /><br/>
            <label>Password:</label><br/>
            <input 
            type="password"
            className='textInput' 
            placeholder='Password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            /><br/>
            <input type={"button"} value={"Login"} className='btnSubmit' onClick={()=>HandleLogin()}/>
            </form>
        </main>
    )
}