import { FC } from "react"
import { useCargoDataContext } from "../../context/cargo-data-context"
import { useCargoWindowContext, ActionTypes as WindowActionTypes } from "../../context/cargo-window-context"
import "./cargo-list.scss"


const CargoList:FC =  ():JSX.Element =>{

  const cargoDataContext = useCargoDataContext()
  const cargoWindowContext = useCargoWindowContext()


  const onItemCLick = (id: number) => {
    cargoWindowContext.dispatch({type:WindowActionTypes.SHOW_SELECTED, payload: id})
    console.log(cargoWindowContext.state)
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
                    <tr className={cargoWindowContext.state.selected === val._id? "selected": ""} 
                    onClick={() =>{ onItemCLick(val._id)}} key={key}>
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