import React from 'react';
import { useHistory } from 'react-router-dom';

function HeaderSign(){

    let history = useHistory();

    function handleClick(){

        localStorage.removeItem('token');
        history.push("/");

    }

    return(
        <div  className="shadow bg-body rounded">
        <header className='d-flex position-relative'>
        <h1 className="p-3"> StickyNotes  <i class="bi bi-sticky-fill"></i> </h1>
            <button onClick={handleClick} type="button" class="btn btn-primary position-absolute top-0 mt-4 end-0 mx-3">Log out</button>
        </header>
        </div>
    );
}

export default HeaderSign;
