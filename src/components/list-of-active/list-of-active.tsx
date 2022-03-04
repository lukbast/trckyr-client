import { FC, useState } from "react"
import TransportTile from "../transport-tile/transport-tile"
import "./list-of-active.scss"

const ListOfActive:FC = ():JSX.Element =>{

    const example_state = {
        name: "Chocholate bars for babushka",
        from: "UK, London",
        to: "Poland, Warsaw",
        drivers: ["Grzegorz Brzęszyczykiewicz", "Kargul"],
        cargo: "Chocolate bars",
        quantity: "10000000",
        total: 1234,
        remaining: 86,
        eta: "2 hr 32 min",
        state: "In progress"
    }

    const [selected, setSelected] = useState<number>(0)

    const changer = (index:number) =>{
        setSelected(index)
    }

    const renderList = () =>{
        const temp = []
        for (let i = 0; i< 8; i++){
            if(i === selected){
                temp.push(<TransportTile key={i} changer={changer} isSelelected={true} data={example_state} index={i}/>)
            } else{
                temp.push(<TransportTile key={i} changer={changer} isSelelected={false} data={example_state} index={i}/>)
            }
        }
        return temp
    }

    return(
        <div className="main-list">
            {renderList()}
        </div>
    )
}


export default ListOfActive