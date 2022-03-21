import { FC, useState } from "react"
import { useDriverDataContext } from "../../context/driver-data-context"
import { IDriverData } from "../../interfaces"
import {quickSort} from "./quicksort"
import { ActionTypes as WindowActions, useDriversWindowContext } from "../../context/drivers-window-context"

interface IState {
    columnName: "id" | "firstName"| "lastName",
    descending: boolean
  }

const DriversList:FC = ():JSX.Element =>{

    const driverDataContext = useDriverDataContext()
    const driversWindowContext = useDriversWindowContext()
    const [orderingState, setOrderingState] = useState<IState>({columnName: "id", descending:false})

    const onItemCLick = (id: number) => {
      driversWindowContext.dispatch({type:WindowActions.SHOW_SELECTED, payload: id})
    }

    const sortItems = () =>{
        const data = driverDataContext.state
        let listOfElements:IDriverData[] = []
        switch(orderingState.columnName){
          case "id":
            listOfElements = quickSort(data, 0, data.length -1, "_id")
            break;
          case "firstName":
            listOfElements = quickSort(data, 0, data.length -1, "firstName")
            break;
          case "lastName":
            listOfElements = quickSort(data, 0, data.length -1, "lastName")
            break;
        }
          if (orderingState.descending){
            listOfElements.reverse()
          } 
        return (listOfElements)
      }



    const renderItem =  (data:IDriverData, key:number):JSX.Element =>{
        return(
          <tr className={driversWindowContext.state.selected === data._id? "selected": ""} 
          onClick={() =>{ onItemCLick(data._id)}} key={key}>
            <td>{data._id}</td>
            <td>{data.lastName}</td>
            <td>{data.firstName}</td>
          </tr>
        )
      }
    
      const renderItems = ():JSX.Element => {
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
                <th onClick={() => {setOrderingState({columnName:"id", descending: !orderingState.descending})}}>ID</th>
                <th onClick={() => {setOrderingState({columnName:"lastName", descending: !orderingState.descending})}}>Last name</th>
                <th onClick={() => {setOrderingState({columnName:"firstName", descending: !orderingState.descending})}}>First name</th>
              </tr>
            </thead>
            {renderItems()}
          </table>
        )
      }

      return (
        <div className="cargo-list">
            {renderList()}
        </div>
    )
}

export default DriversList
