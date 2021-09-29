import React, { useContext, useEffect} from 'react'
import NoteContext from './context/notes/NoteContext'

function About() {
    const a = useContext(NoteContext);
    useEffect(() => {
        a.update();
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <div className="container">
                <p>This is About {a.state.name} and he is in {a.state.class}</p>
            </div>
        </>
    )
}

export default About
