import React from 'react';
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
