import React from 'react';
import PropTypes from 'prop-types';
import back from "./black.png"


export const Card=({id,type,handleClick,flipped,disabled,solved,colNr,counter})=>{
    console.log("oszlopok szama="+colNr)
    colNr=colNr<8 ? 12/colNr : 2;
     return(
         <React.Fragment>
            <div className={`col-${colNr} pb-1  text-center `} onClick={()=>disabled? null : handleClick(id)}>
                    <img className="img-fluid img-fluid  rounded shadow" src={flipped || solved ? `${type}` : `${back}` }/>
            </div>
        </React.Fragment>
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


