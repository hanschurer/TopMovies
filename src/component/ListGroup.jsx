import React from 'react'

const ListGroup = ({items,onItemSelected,currentGenres}) => {
    
    return (
        <ul class="list-group">
            {items.map((item)=> <li  onClick={()=>onItemSelected(item)} key={item._id} className={item===currentGenres?"list-group-item list-group-item-action active":"list-group-item list-group-item-action"}>{item.name} </li>)}
        </ul>
    )
}

export default ListGroup
