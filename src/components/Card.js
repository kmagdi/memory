import React from 'react';
import PropTypes from 'prop-types';
import back from "./back.png"


export const Card=({id,type,handleClick,flipped,disabled,solved,colNr})=>{
    console.log("oszlopok szama="+colNr)
     return(
        <div className={`col-${12/colNr} pb-1  text-center`} onClick={()=>disabled? null : handleClick(id)}>
                   <img className="img-fluid" src={flipped || solved ? `${type}` : `${back}` }/>
        </div>
    )
}

Card.propTypes={
    flipped:PropTypes.bool.isRequired,
    handleClick:PropTypes.func.isRequired,
    id:PropTypes.number.isRequired,
    type:PropTypes.string.isRequired,
    disabled:PropTypes.bool.isRequired,
    solved:PropTypes.bool.isRequired,
    colNr: PropTypes.number.isRequired
}


