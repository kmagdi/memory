import React,{useState,useEffect} from 'react';
import Board from "./components/Board"
import init from "./components/init"
import  "../node_modules/bootstrap/dist/css/bootstrap.css"
import "./App.css"

import countapi from 'countapi-js';

countapi.visits().then((result) => {
    console.log(" Az oldal látogatottsági mutatója:"+result.value);
});

export const cardNumber= [2, 4, 6,8,10];

export const App=()=>{
    const [gameSize,setGameSize]=useState(cardNumber[1])
    const [cards,setCards]=useState([])
    const [flipped,setFlipped]=useState([])
    const [solved,setSolved]=useState([])
    const [disabled,setDisabled]=useState(false) //hogy a felhasznalo ne kattinthasson tobbszor ugyanarra a kartyara
    const [clickCounter,setClickCounter]=useState(0)
    const [dimension,setDimension]=useState(400)

    useEffect(()=>{
        setSolved([])
        resizeBoard()
        setCards(init(gameSize))
    },[gameSize])//ha ures arrayt adunk itt meg akkor csak legeloszor egyszer hivodik meg a useEFFECT
    //igy ahanyszor valtozik a gameSize annyiszor fog meghivodni itt a useEffect

useEffect(()=>{
    const resizeListener=window.addEventListener('resize',resizeBoard)
    return ()=>window.removeEventListener('resize',resizeListener)
})

const resizeBoard=()=>{
    setDimension(Math.min(
        document.documentElement.clientHeight,
        document.documentElement.clientWidth
    ))
}

useEffect(()=>{
    preloadImages()
},[])//annyiszor hivodik meg ahanyszor a cards valtozik

    const handleClick=(id)=>{
        setDisabled(true)
        if(flipped.length===0){
            setFlipped([id])
            setDisabled(false)
        } else{
            if(sameCard(id)) return
            setFlipped([flipped[0],id])

            if(isMatch(id)){
                setSolved([...solved,flipped[0],id])
               resetCards()
            }else{
                setClickCounter(clickCounter+1)
                setTimeout(resetCards,1000)
            } 

        }
    }
const sameCard=(id)=>{flipped.includes(id)}
const isMatch=(id)=>{
    const clickedCard=cards.find(card=>card.id===id)
    const flippedCard=cards.find(card=>card.id===flipped[0])
    return clickedCard.type===flippedCard.type
}
const resetCards=()=>{
    setFlipped([])//ha talalt volt kiuritjuk a tombot ujra
    setDisabled(false)
}
const preloadImages=()=>{
    cards.map(card=>{
        const src=card.type
        new Image().src=src
        console.log(src)
    })
}

  return(
      <div className="container  border shadow p-2">
            <div className="row justify-content-center pt-2 "> 
                <h5 className="p-2" id="visits">Game size: </h5>
                <select className="custom-select text-center w-25" value={gameSize} onChange={e=>setGameSize(e.target.value)}>
                   {cardNumber.map(nr => <option  value={nr}>{nr}x{nr}</option>)}        
                </select>
                <div className="btn btn-outline-danger ml-2 mb-2"> Mistakes: <b>{clickCounter}</b></div>
            </div>
            <Board
                cards={cards}
                flipped={flipped}
                handleClick={handleClick}
                disabled={disabled}
                solved={solved}
                gameSize={gameSize}
                dimension={dimension}
            />
        </div>
     )
  }