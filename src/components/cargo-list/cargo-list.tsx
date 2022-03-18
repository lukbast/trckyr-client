import { FC } from "react"
import { ICargoData } from "../../interfaces"
import "./cargo-list.scss"

interface IProps {
    data: ICargoData[]
}


const CargoList:FC<IProps> =  ({data}):JSX.Element =>{
    return (
        <div className="cargo-list">
            <table className="table">
              <tr>
                <th>Name</th>
                <th>Weigth</th>
                <th></th>
                <th>Quantity</th>
                <th></th>
                <th>Additional Info</th>
              </tr>
              {data.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{val.name}</td>
                    <td>{val.weight}</td>
                    <td>{val.weightUnit}</td>
                    <td>{val.quantity}</td>
                    <td>{val.quantityUnit}</td>
                    <td>{val.info}</td>
                  </tr>
                )
              })}
            </table>
        </div>
    )
}


export default CargoList