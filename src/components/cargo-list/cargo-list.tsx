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
    cargoWindowContext.dispatch({type:WindowActionTypes.SHOW_SELECTED, payload: id - 1})
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
      <div className={cargoWindowContext.state.selected === (data._id - 1 )? "row cols-2 selected": "row cols-2"} 
      onClick={() =>{ onItemCLick(data._id)}} key={key}>
        <div className="field">{data._id}</div>
        <div className="field">{data.name}</div>
      </div>
    )
  }


  const renderSortedItems = ():JSX.Element[] => {
    const sortedData = sortItems()
    const renderedList:JSX.Element[] = sortedData.map( (data) => {return renderItem(data, data._id)})
    console.log(renderItem)
    return( renderedList)
  }

  const renderList = ():JSX.Element => {
    return(
      <div className="table hide-srollbars">
          <div className="row cols-2 head">
            <div className="field" onClick={() => {setOrderingState({columnName: "id", descending: !orderingState.descending})}}>ID </div> 
            <div className="field"  onClick={() => {setOrderingState({columnName: "name", descending: !orderingState.descending})}}>Name</div> 
          </div>
        {renderSortedItems()}
      </div>
    )
  }

  return (
      <div className="cargo-list">
          {renderList()}
      </div>
  )
}


export default CargoList