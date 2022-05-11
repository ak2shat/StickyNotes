import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';


function CreateArea(props){

    let [note,setNote] = useState({title:"",content:""});

    let [isClicked,setClicked] = useState(false);



    function handleChange(event){

        let {name,value} = event.target;

          setNote({
                
                    ...note,
                    [name]:value
                
          });
    }

    function openBoth(){
        setClicked(prevClick=>{
            return true;
        })
    }

    function sendNote(event){
         event.preventDefault();
         props.onAdd(note);
         setNote({title:"",content:""});
    }

    
 
    return(
            <form className='create-note'>

                <input style={{display : isClicked ? "inline" : "none"}}  onChange={handleChange} name="title" type="text"placeholder='Title' value={note.title}/>
                <textarea onClick={openBoth} onChange={handleChange} name="content" id="content" rows={isClicked ? 3 : 1} placeholder='Take a Note..' value={note.content}></textarea>

                <Zoom in={isClicked}>
                <Fab onClick={sendNote}>
                    <AddIcon/>
                </Fab>
                </Zoom>
            </form>
    )

}

export default CreateArea;
