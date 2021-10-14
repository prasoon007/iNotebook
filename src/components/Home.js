import React from 'react'
import AddNote from './AddNote';
import Notes from './Notes';


function Home() {
    return (
        <>
            <div className="container my-3" style={{ width: '80%' }}>
                <AddNote />
                <h1>Your Notes</h1>
                <Notes />
            </div>
        </>
    )
}

export default Home
