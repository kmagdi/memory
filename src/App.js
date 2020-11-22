import React,{useState,useEffect} from 'react';
import Board from "./components/Board"
import init from "./components/init"
import  "../node_modules/bootstrap/dist/css/bootstrap.css"
import "./App.css"

export const cardNumber= [4, 9, 16, 25];

export const App=()=>{
    const [gameSize,setGameSize]=useState(cardNumber[1])
    const [cards,setCards]=useState([])
    const [flipped,setFlipped]=useState([])
    const [solved,setSolved]=useState([])
    const [disabled,setDisabled]=useState(false) //hogy a felhasznalo ne kattinthasson tobbszor ugyanarra a kartyara
    const [clickCounter,setClickCounter]=useState(0)

    

    useEffect(()=>{
        setCards(init())

    },[])//csak legeloszr egyszer hivofdik meg

    
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
      <div className="container-fluid jumbotron border shadow">
        <div class="text-center d-flex justify-content-center flex-column">
            <div class="flex flex-row ">
                <span >Select game size: </span>
                <select  value={gameSize} onChange={e=>setGameSize(e.target.value)}>
                   {cardNumber.map(nr => <option value={nr}>{nr}x{nr}</option>)}        
                </select>
            </div>
            <span class="text-right"> A rossz tippek szama:{clickCounter}</span>

                <Board
                    cards={cards}
                    flipped={flipped}
                    handleClick={handleClick}
                    disabled={disabled}
                    solved={solved}
                    colNr={gameSize}
            />

        </div>
      </div>
  )
  }