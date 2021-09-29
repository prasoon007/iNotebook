import NoteContext from "./NoteContext";
import { useState } from "react";


const NoteState = (props) => {   
    const [state, setstate] = useState({name: 'prasoon', class: 'mca'});
    const update = () => {
        setTimeout(() => {
            setstate({
                name: 'akash',
                class: 'mba'
            })
        }, 1500);
    };
    return (
        <NoteContext.Provider value={{state, update}}>
            {props.children}
        </NoteContext.Provider>

    )
}

export default NoteState;