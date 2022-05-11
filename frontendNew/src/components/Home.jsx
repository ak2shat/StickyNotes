import React , { useState , useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CreateArea from './CreateArea';
import Footer from './Footer';
import HeaderSign from './HeaderSign';
import Note from './Note';




export default function Home() {
   
   let history = useHistory();
   
   let [state,setState] = useState({noteArr : [] ,loading : true});
   // let [loading,setLoading] = useState(true);


 useEffect (()=>{    
    
  getNotes();
       
  },[]);


async function getNotes(){              // fetching all notes

   if(!localStorage.getItem('token')){
      history.push("/");
   }

   else{

   let notes = await fetch("http://localhost:5000/api/notes/fetchallnotes",{         
      method : "GET",
      headers : {
         "auth-token" : localStorage.getItem('token')
      }
   });

       let json = await notes.json();
       setState({noteArr : json, loading : false});
       console.log(json);
}
}
  

async function addToArray(note){            //add note function
   
   let jsonData = {
      title : note.title,
      content : note.content
   };

     let notes = await fetch("http://localhost:5000/api/notes/addnote",{
        method : "POST",
        headers: {
         'Content-Type': 'application/json',
         "auth-token" : localStorage.getItem('token')
        },
        body : JSON.stringify(jsonData)
     });
     let json = await notes.json();
     setState({noteArr : json, loading : false});
              
     }

  

async function deleteNote(id){             //  deleting function

   console.log("note id "+ id);
   
   let notes = await fetch("http://localhost:5000/api/notes/deletenote/" + id,{
        method : "DELETE",
        headers : {
           "Content-Type":"application/json",
           "auth-token" : localStorage.getItem('token')
         }
     });
     let json = await notes.json();
     setState({noteArr : json, loading : false});
  }

  
  if(state.loading){
     return <div><h1>Loading...</h1></div>
  }

else{
   return(
      <div>
        <HeaderSign/>
        <CreateArea onAdd={addToArray}/> 
           <div className="mx-5">
        {
           state.noteArr.map((element,index)=>{
              return(           
              <Note  onDeleteNote={deleteNote} key={element._id} id={element._id}  title={element.title} content={element.content}/>
              )
            })
         }
         </div>
        <Footer/>
      </div>
  );
      }
}
