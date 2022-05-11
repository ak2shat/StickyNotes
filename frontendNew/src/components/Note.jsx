import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import EditRoundedIcon from '@mui/icons-material/EditRounded';



function Note(props){

    function insideDelete(event){
            event.preventDefault();
            props.onDeleteNote(props.id);
    }
    function insideEdit(event){
        event.preventDefault();
        props.onEditNote(props.id);
    }

    return(
       <div className="note mx-4 my-4">                      
           <h4>{props.title}</h4>
           <p>{props.content}</p>
           <Zoom in={true}>
           <Fab id='delete' onClick={insideDelete}>
                <DeleteIcon/>
           </Fab>
           </Zoom>
           <Zoom in={true}>
           <Fab id='edit' onClick={insideEdit}>
           <EditRoundedIcon/>
           </Fab>
           </Zoom>
       </div>
    );
}

export default Note;
