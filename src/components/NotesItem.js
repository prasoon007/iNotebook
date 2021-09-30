import React from 'react'

function NotesItem(props) {
    const {title, description, tag} = props.notes;
    return (
        <>
            <div className="card my-3">
                <div class ="card-body">
                <h5 class ="card-title">{title}</h5>
                <p class ="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo iste pariatur, fugit corrupti necessitatibus accusantium excepturi dolorum earum officia facilis laboriosam magnam? Quidem aspernatur, tempore quo quis iure officiis dicta.</p>
                </div>
            </div>
        </>

    )
}

export default NotesItem
