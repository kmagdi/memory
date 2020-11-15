
export default function init(){
    let id=0
    const cards=[]
    for(let i=0;i<18;i++)
        cards.push(`https://picsum.photos/200?random=${i}`)
    const cardsDupla=cards.reduce((acc,type)=>{
        acc.push({id:id++,type})
        acc.push({id:id++,type})
        return acc
        },[])
    cardsDupla.sort(() => Math.random() - 0.5);
    console.log(cardsDupla)
return cardsDupla
}