import { FC, useState } from "react"
import { useCargoDataContext } from "../../context/cargo-data-context"
import { useCargoWindowContext, ActionTypes as WindowActionTypes } from "../../context/cargo-window-context"
import { ICargoData } from "../../interfaces"
import "./cargo-list.scss"
import { quickSort } from "./quicksort"


const CargoList:FC =  ():JSX.Element =>{

  interface IState {
    columnName: "id" | "name",
    descending: boolean
  }

  const cargoDataContext = useCargoDataContext()
  const cargoWindowContext = useCargoWindowContext()
  const [orderingState, setOrderingState] = useState<IState>({columnName: "id", descending:false})


  const onItemCLick = (id: number) => {
    cargoWindowContext.dispatch({type:WindowActionTypes.SHOW_SELECTED, payload: id})
  }


  const sortItems = () =>{
    const data = cargoDataContext.state.data
    let listOfElements:ICargoData[] = []
    switch(orderingState.columnName){
      case "id":
        listOfElements = quickSort(data, 0, data.length -1, "_id")
        break;
      case "name":
        listOfElements = quickSort(data, 0, data.length -1, "name")
        break;
      }
      if (orderingState.descending){
        listOfElements.reverse()
      } 
    return (listOfElements)
  }


  const renderItem =  (data:ICargoData, key:number):JSX.Element =>{
    return(
      <tr className={cargoWindowContext.state.selected === data._id? "selected": ""} 
      onClick={() =>{ onItemCLick(data._id)}} key={key}>
        <td>{data._id}</td>
        <td>{data.name}</td>
      </tr>
    )
  }


  const renderSortedItems = ():JSX.Element => {
    const sortedData = sortItems()
    return(  
    <tbody>
      {sortedData.map( (data) => {return renderItem(data, data._id)})}
    </tbody>
    )
  }

  const renderList = ():JSX.Element => {
    return(
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => {setOrderingState({columnName: "id", descending: !orderingState.descending})}}>ID</th>
            <th onClick={() => {setOrderingState({columnName: "name", descending: !orderingState.descending})}}>Name</th>
          </tr>
        </thead>
        {renderSortedItems()}
      </table>
    )
  }

  return (
      <div className="cargo-list">
          {renderList()}
      </div>
  )
}


export default CargoList