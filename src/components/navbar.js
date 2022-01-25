import logo from '../images/logo.jpg';
import { auth } from '../fire';
import { signOut } from 'firebase/auth';

export default function Navbar(){

    //CREATE SIGNOUT FUNCTIONALITY
    function HandleLogout(){
        signOut(auth).catch((err)=>{
            console.log(err)
        }).then(
            alert('successfully logged out')
        )
    }
    //listen for changes
    return (
        <nav>
            <img src={logo} className='logo'/>
            <button type='button' className='logOutbtn' onClick={()=> HandleLogout()}>Sign Out</button>
        </nav>
    )
}