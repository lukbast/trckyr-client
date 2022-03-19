import { FC } from "react"
import { ActionTypes, useCargoDataContext } from "../../context/cargo-data-context"
import { ICargoData } from "../../interfaces"
import "./cargo-list.scss"

interface IProps {
    data: ICargoData[]
}


const CargoList:FC<IProps> =  ({data}):JSX.Element =>{

    const cargoDataContext = useCargoDataContext()


    const removeItem = (item: ICargoData) =>{
      cargoDataContext.dispatch({type: ActionTypes.DELETE_CARGO, payload:item})
    }

    return (
        <div className="cargo-list">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Weigth</th>
                  <th></th>
                  <th>Quantity</th>
                  <th></th>
                  <th>Additional Info</th>
                </tr>
              </thead>
                <tbody>
                  {data.map((val, key) => {
                    return (
                      <tr onClick={ () => {removeItem(val)}} key={key}>
                        <td>{val.name}</td>
                        <td>{val.weight}</td>
                        <td>{val.weightUnit}</td>
                        <td>{val.quantity}</td>
                        <td>{val.quantityUnit}</td>
                        <td>{val.info}</td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
        </div>
    )
}


export default CargoList