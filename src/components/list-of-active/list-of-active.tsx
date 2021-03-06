import { FC } from "react"
import { useDataContext } from "../../context/data-context"
import { useSelectedTransport } from "../../context/selected-transport-context"
import { useWindowState } from "../../context/window-context"
import TransportTile from "../transport-tile/transport-tile"
import "./list-of-active.scss"



const ListOfActive:FC = ():JSX.Element =>{

    const windowState = useWindowState()
    const selectedTransport = useSelectedTransport()
    const dataContext = useDataContext()
    const changer = (index:number) =>{
        selectedTransport.dispatch(index)
        windowState.dispatch("openTransport")
    }

    const renderList = () =>{
        const data = dataContext.state.transport
        const temp = []
        for (let i = 0; i< data.length; i++){
            if(i === selectedTransport.state.index){
                temp.push(<TransportTile key={i} changer={changer} isSelelected={true} data={data[i]} index={i}/>)
            } else{
                temp.push(<TransportTile key={i} changer={changer} isSelelected={false} data={data[i]} index={i}/>)
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