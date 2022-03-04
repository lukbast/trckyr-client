import { FC } from "react"
import "./transport-tile.scss"

interface IProps{
    data: {
        name: string,
        from:string,
        to:string,
        drivers: string[],
        cargo: string,
        quantity: string,
        total: number,
        remaining: number,
        eta: string,
        state: string
    }
    isSelelected: boolean,
    changer: any
    index: number
}

const TransportTile:FC<IProps> = ({data, isSelelected, changer, index}):JSX.Element =>{
    return(
        <div onClick={() => {changer(index)}} className="transport-tile">
            <div className={isSelelected? "transport-tile-selector": "transport-tile-selector hidden"}></div>
            <div className="transport-tile-container">
                <div>{data.name}</div>
                <div><b>Status:</b> {data.state}</div>
                <div><b>Remain:</b> {data.remaining}km</div>
                <div><b>ETA:</b> {data.eta}</div>
            </div>
            
        </div>
    )
}

export default TransportTile