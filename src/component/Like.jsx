import React from 'react'

const Like = ({onToggle,movie}) => {

    const {like} = movie

    return (
        <i onClick={onToggle} style={{cursor:'pointer'}} className={like?"fa fa-heart":"fa fa-heart-o"} aria-hidden="true"></i>
    )
}

export default Like
