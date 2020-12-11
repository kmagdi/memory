import React from 'react';
import back from "./yellow.png"
//import nl2br from 'react-newline-to-break'; 


export const Card=({id,type,handleClick,flipped,disabled,solved,gameSize,height,width,index,counter})=>{
    console.log("oszlopok szama="+gameSize+" height="+height)
    console.log("index="+index)
    const newRow=(index+1)%gameSize===0 ? true : false
    const url=flipped || solved ? type : back
    let divStyle = {
                backgroundImage: 'url(' + url + ')'
            }
    let box="box"+gameSize
    console.log(box)
 
    return(
         <React.Fragment>
             <div className={`${box}`} style={divStyle} onClick={()=>disabled? null : handleClick(id)}>
                  
            {/*    <img  style={{borderRadius: 5, height: height , width: width}}  src={flipped || solved ? `${type}` : `${back}` }/>*/}
            
            
            </div>
           {/* { newRow ?  <div className="break"></div> : "" }*/}
        </React.Fragment>
    )
}




