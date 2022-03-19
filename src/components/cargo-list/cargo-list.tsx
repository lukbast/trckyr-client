import { FC } from "react"
import { ActionTypes, useCargoDataContext } from "../../context/cargo-data-context"
import { ICargoData } from "../../interfaces"
import "./cargo-list.scss"


const CargoList:FC =  ():JSX.Element =>{

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
                </tr>
              </thead>
                <tbody>
                  {cargoDataContext.state.data.map((val, key) => {
                    return (
                      <tr onClick={ () => {removeItem(val)}} key={key}>
                        <td>{val.name}</td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
        </div>
    )
}


export default CargoList