import React ,{useState} from 'react';
import {
    useHistory
  } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';

function SignIn(){


    let [credentials,setCredentials] = useState({username : "",password : ""});

    function handleChange(event){
  
      setCredentials({...credentials, [event.target.name]: event.target.value});
  
    }
  
    let history = useHistory();

    async function handleSubmit(event){
        event.preventDefault();
    
        let signin = await fetch("http://localhost:5000/api/auth/createuser",{
          method : "POST",
          headers : {
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({username : credentials.username , password : credentials.password })
        });
    
        const json = await signin.json()
            console.log(json);
            if (json.success){
                // Save the auth token and redirect
                localStorage.removeItem('token');
                localStorage.setItem('token', json.authtoken); 
                history.push("/home");
            }
            else{
                alert("Invalid credentials");
            }
    
      }


    return(
        <>
        <Header/>
        <div className=" container">
       
        <div className="row">
           
            <div className="col-4 position-absolute top-50 start-50 translate-middle">
                <div className="heading">
                    <h1 className="text-center">Sign In</h1>
                </div>
    <form onSubmit={handleSubmit}>
        <div className="mb-3 mx-5 mt-5">
          <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
          <input onChange={handleChange} type="text" className="form-control" value={credentials.username} name="username" id="exampleInputEmail1"/>
          
        </div>
        <div className="mb-3 mx-5">
          <label  htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input onChange={handleChange} type="password" className="form-control" name="password" value={credentials.password} id="exampleInputPassword1"/>
        </div>
       <div className="button text-center my-3">
        <button className="btn btn-primary w-75">Sign In</button>
    </div>
      </form>
    </div>
    </div>
    </div>
    <Footer/>
    </>
    );
}

export default SignIn;