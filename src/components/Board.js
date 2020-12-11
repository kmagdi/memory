import React from 'react';
import  {Card} from "./Card"

export default function Board({disabled,cards,flipped,handleClick,solved,gameSize,dimension}){
     return(   
           <div class="board"> 
            {
               cards.map((card,index)=>
                    <Card
                        key={card.id}
                        id={card.id}
                        type={card.type}
                        flipped={flipped.includes(card.id)}
                        handleClick={handleClick}
                        disabled={disabled || solved.includes(card.id)}
                        solved={solved.includes(card.id)}
                        gameSize={gameSize}
                        width={dimension/4.5}
                        height={dimension/4.5}
                        index={index}
                    />
                    )
            }</div>
  
    )

}
