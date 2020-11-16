import React,{useState,useEffect} from 'react';
import Board from "./components/Board"
import init from "./components/init"
import  "../node_modules/bootstrap/dist/css/bootstrap.css"
import "./App.css"



export const App=()=>{
    const [gameSize,setGameSize]=useState(2)
    const [cards,setCards]=useState([])
    const [flipped,setFlipped]=useState([])
    const [solved,setSolved]=useState([])
    const [disabled,setDisabled]=useState(false) //hogy a felhasznalo ne kattinthasson tobbszor ugyanarra a kartyara
    //const [dimension, setDimension]=useState(400)
    const [clickCounter,setClickCounter]=useState(0)


    useEffect(()=>{
        //setCards(init(boardSize))
       //resizeBoard();
        setCards(init())

    },[])//csak legeloszr egyszer hivofdik meg

    /*const resizeBoard=()=>{
        setDimension(Math.min(document.documentElement.clientHeight,document.documentElement.clientWidth))
    }
    useEffect(()=>{
        const resizeListener=window.addEventListener('resize',resizeBoard)
        return ()=>window.removeEventListener('resize',resizeListener)//to clean up when component unmount
    })*/
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
      <div className="container-fluid jumbotron border">
        <b> Memory game size : </b><select onChange={e=>setGameSize(e.target.value)}>
                <option value="{8}">4*4</option>
                <option value="{18}">6*6</option>
                <option value="{32}">8*8</option>
            </select>
        <span> A rossz tippek szama:{clickCounter}</span>

              <Board
                cards={cards}
                flipped={flipped}
                handleClick={handleClick}
                disabled={disabled}
                solved={solved}
                colNr={Math.sqrt(cards.length)}
           />


      </div>
  )
  }