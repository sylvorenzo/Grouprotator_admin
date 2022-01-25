import react, {useState,useEffect} from 'react';
import { CSVLink } from 'react-csv';
import { ref, set , onValue} from 'firebase/database';
import { database } from '../fire';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Interface(){

    //create states that would change constants
    const [shuffledArray,setShuffleArray] = useState([]);
    const [Group1, setGroup1] = useState([]);
    const [Group2, setGroup2] = useState([]);
    const [Group3, setGroup3] = useState([]); 
    const [closeform, setCloseform] = useState('close-form');
    const [modifiedArray, setModifiedArray] = useState([]);

    //states that would hold user input
    const [candidateName, setCandidateName] = useState('');
    const [searchInput, setSearchInput] = useState('');

    
    //create an array containing colleague names
    let array = ['Ayanda', 'Vusi', 'Innocentia', 'Castor', 
    'Micah', 'Simphiwe', 'Phiwa', 'Khutso', 'Tyson', 'Tivanni','Tondani',
    'Esta', 'Renzo', 'Molefe', 'Rudolph','Nonhlanhla', 'Sinazo'];

        //store 6 names in three different groups
        const group1 = shuffledArray.slice(0,6);
        const group2 =shuffledArray.slice(6,12);
        const group3 = shuffledArray.slice(12,18);

        //create firebase database instance
        const db = database;

    const csvData = [
        ['THE ATOMS'],
        [''],
        [Group1[0]],
        [Group1[1]],
        [Group1[2]],
        [Group1[3]],
        [Group1[4]],
        [Group1[5]],
        [''],
        ['THE TECHIES'],
        [''],
        [Group2[0]],
        [Group2[1]],
        [Group2[2]],
        [Group2[3]],
        [Group2[4]],
        [Group2[5]],
        [''],

        ['THE DEV CREW'],
        [''],
        [Group3[0]],
        [Group3[1]],
        [Group3[2]],
        [Group3[3]],
        [Group3[4]],
        [Group3[5]],
    ];
    
    //opens and closes the form where admin wants to add candidate
    function formDisplay(){
        setCloseform('addForm');
        if (closeform === "addForm"){
            setCloseform('close-form');
        }
        if(closeform === 'close-form'){
            setCloseform('addForm')
        }
    }
    //adds new candidate to the array
    function AddToArray(){
    
           array[array.length] = candidateName;
        console.log('Add to array ', array);
        set(ref(db, 'candidates/'),{
            array
        }).catch((err)=>
        console.log(err)).then(alert(`You have Successfully added ${candidateName}`));
    }
    //shuffles array randomly and places candidates in groups
    function Shuffle(){
        const sA = modifiedArray.sort((a, b) => 0.5 - Math.random());
        console.log('sorted array',sA)
        setShuffleArray(sA);
        console.log(shuffledArray);
        //store data in database
        set(ref(db, 'groups/'),{
            group1: group1,
            group2:group2,
            group3:group3
        }).catch(err=>{
            console.log(err);
        })
    }
    //deletes candidate from database
    function DeleteData(){
        const index = modifiedArray.indexOf(searchInput);
        if(index > -1){
            modifiedArray.splice(index, 1);
            console.log('Modified array from delete ', modifiedArray);
            var newData = modifiedArray;
            setModifiedArray(newData);
            alert(`${searchInput} has successfully been deleted!`)
        }
       

    }
        // listens for changes occuring
        useEffect(()=>{

            //get array of names from database
            //create a group array reference
            const arrayReference = ref(db,'candidates/array');
            
            //get candidates data
            onValue(arrayReference, (snapshot)=>{
                var data = snapshot.val();
                if(data !== null){
                    console.log('candidates ', data);
                    setModifiedArray(data);
                }
            })
            //create group reference
            const reference = ref(db, 'groups/group1');
            //GROUP1 DATA
            onValue(reference, (snapshot)=>{
                if(snapshot.val() !== null){
                    var data = snapshot.val();
                    console.log('Snapshot values ', data);
                    setGroup1(data);
                }
                
            });

            //GROUP2 DATA
            //create group reference
            const reference1 = ref(db, 'groups/group2');
            onValue(reference1, (snapshot)=>{
                if(snapshot.val() !== null){
                    var data = snapshot.val();
                    console.log('Snapshot values ', data);
                    setGroup2(data);
                }
                
            });

            //GROUP3 DATA
            //create group reference
            const reference2 = ref(db, 'groups/group3');
            onValue(reference2, (snapshot)=>{
                if(snapshot.val() !== null){
                    var data = snapshot.val();
                    console.log('Snapshot values ', data);
                    setGroup3(data);
                }
                
            })
    },[]);
   
    
    return(
        <main className='interface'>
            <input type={'search'} 
            placeholder='Search' 
            className='searchBar'
            value={searchInput}
            onChange={(e)=>setSearchInput(e.target.value)}
            /><button type='button' onClick={()=> DeleteData()}>Delete</button>
            <section className='wrapper'>
                <section className='container'>
                <h1>The Dev Crew</h1>
                    <p>{Group2[0]} <strong>Scrum Master</strong></p>
                    <p>{Group2[1]}</p>
                    <p>{Group2[2]}</p>
                    <p>{Group2[3]}</p>
                    <p>{Group2[4]}</p>
                    <p>{Group2[5]}</p>
                </section>
                <section className='container'>
                <h1>The Atoms</h1>
                    <p>{Group1[0]} <strong>Scrum Master</strong></p>
                    <p>{Group1[1]}</p>
                    <p>{Group1[2]}</p>
                    <p>{Group1[3]}</p>
                    <p>{Group1[4]}</p>
                    <p>{Group1[5]}</p>
                </section>
                <section className='container'>
                <h1>The Techies</h1>
                    <p>{Group3[0]} <strong>Scrum Master</strong></p>
                    <p>{Group3[1]}</p>
                    <p>{Group3[2]}</p>
                    <p>{Group3[3]}</p>
                    <p>{Group3[4]}</p>
                    <p>{Group3[5]}</p>
                </section>
            </section>
            <section className='operations'>
            <CSVLink data={csvData} className='downloadLink'>Download New Groups</CSVLink>
            <button onClick={()=> Shuffle()}>Shuffle</button>
            <button onClick={()=>formDisplay()}>Add</button>
            </section>
            <section className='controlSection'>
                <form className={closeform}>
                    <FontAwesomeIcon icon={faTimes} className='close ' onClick={()=>formDisplay()}/>
                    <h3>Add Candidate To Database...</h3>
                    <input 
                    className='textInput' 
                    placeholder='Insert Candidate Name...'
                    value= {candidateName}
                    onChange={(e)=> setCandidateName(e.target.value)}

                    /><br/>
                    <button type="button" onClick={()=>AddToArray()}>Add</button>
                </form>
            </section>
        </main>
    )
}