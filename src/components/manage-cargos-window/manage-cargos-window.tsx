import { FC, useState } from "react"
import { ICargoData } from "../../interfaces"
import CargoList from "../cargo-list/cargo-list"
import NewCargoForm from "../new-cargo-form/new-cargo-form"
import Subwindow from "../subwindow/subwindow"
import "./manage-cargos-window.scss"



const exampleState:ICargoData[] = [
    {name: "Chocolate bars",
    weight: 10000,
    weightUnit: "kg",
    quantity: 1000000,
    quantityUnit: "pcs",
    info: "" },
    {name: "Cars",
    weight: 20000,
    weightUnit: "kg",
    quantity: 6,
    quantityUnit: "pcs",
    info: "" },
    {name: "Windows",
    weight: 8000,
    weightUnit: "kg",
    quantity: 1000,
    quantityUnit: "pcs",
    info: "Fragile" },
] 


const NewCargoWindow:FC = ():JSX.Element =>{

    const [state, setState] = useState(exampleState)


    return(
        <div className="manage-cargo-window">
            <CargoList data={state}/>
            <Subwindow>
                <NewCargoForm/>
            </Subwindow>
            
        </div>
    )
}

export default NewCargoWindow