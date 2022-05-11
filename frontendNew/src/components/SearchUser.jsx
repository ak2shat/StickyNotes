import React,{useState} from 'react';

function SeacrhUser(){

    let [username,setUsername] = useState("");

    function handleChange(event){
        setUsername(event.target.value);
    }    

     return(
         <div id='searchBox'>
             <input onChange={handleChange} type="text" name="username" id="userID" value={username}/>
             <button  type="submit" id='submitBtn'>fetch data</button>
         </div>
     );
}

export default SeacrhUser;
