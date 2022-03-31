import { FC } from "react"
import { ITransportData } from "../../interfaces"
import "./transport-tile.scss"

interface IProps{
    data: ITransportData
    isSelelected: boolean,
    changer: any
    index: number
}

const TransportTile:FC<IProps> = ({data, isSelelected, changer, index}):JSX.Element =>{

    const SELECTED:string = "transport-tile-selector"
    const NOT_SELECTED:string = "transport-tile-selector hidden"
    const i:number = data.statuses.length - 1 

    return(
        <div onClick={() => {changer(index)}} className={isSelelected? " transport-tile transport-tile-selected": "transport-tile"}>
            <div className={isSelelected? SELECTED: NOT_SELECTED}></div>
            <div className="transport-tile-container">
                <div>{data.name}</div>
                <div><b>Status:</b> {data.state}</div>
                <div><b>Remain:</b> {data.statuses[i].remaining}km</div>
                <div><b>ETA:</b> {data.statuses[i].eta}</div>
            </div>
            
        </div>
    )
}

export default TransportTile