import React from 'react'
import AddNote from './AddNote';
import Notes from './Notes';


function Home(props) {
    return (
        <>
            <div className="container my-3" style={{ width: '80%' }}>
                <AddNote updateAlert={props.updateAlert}/>
                <h1>Your Notes</h1>
                <Notes updateAlert={props.updateAlert}/>
            </div>
        </>
    )
}

export default Home
