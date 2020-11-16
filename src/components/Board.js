import React from 'react';
import PropTypes from 'prop-types';
import  {Card} from "./Card"

export default function Board({disabled,cards,flipped,handleClick,solved,colNr}){
    return(
        <div className="row">
            {
               cards.map(card=>
                    <Card
                        key={card.id}
                        id={card.id}
                        type={card.type}
                        flipped={flipped.includes(card.id)}
                        handleClick={handleClick}
                        disabled={disabled || solved.includes(card.id)}
                        solved={solved.includes(card.id)}
                        colNr={colNr}
                     

                    />
                    )
            }
        </div>
    )

}
Board.propTypes={
    cards:PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    flipped:PropTypes.arrayOf(PropTypes.number).isRequired,
    handleClick:PropTypes.func.isRequired,
    disabled:PropTypes.bool.isRequired,
    solved:PropTypes.arrayOf(PropTypes.number).isRequired,
    colNr:PropTypes.number.isRequired

}
