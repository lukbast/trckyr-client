import { FC, useState } from "react"
import { useSelectedTransport } from "../../context/selected-transport-context"
import { useWindowState } from "../../context/window-context"
import { exampleState } from "../main-window/main-window"
import TransportTile from "../transport-tile/transport-tile"
import "./list-of-active.scss"

interface IProps {
    data: typeof exampleState
}

const ListOfActive:FC<IProps> = ({data}):JSX.Element =>{

    const windowState = useWindowState()
    const selectedTransport = useSelectedTransport()

    const changer = (index:number) =>{
        selectedTransport.dispatch(index)
        windowState.dispatch("openTransport")
    }

    const renderList = () =>{
        const temp = []
        for (let i = 0; i< 8; i++){
            if(i === selectedTransport.state.index){
                temp.push(<TransportTile key={i} changer={changer} isSelelected={true} data={data} index={i}/>)
            } else{
                temp.push(<TransportTile key={i} changer={changer} isSelelected={false} data={data} index={i}/>)
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