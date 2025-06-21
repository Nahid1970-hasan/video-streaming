import { Outlet } from "react-router-dom"

export const LayoutWidget = () => {
    return (<div  style={{margin:0, height:"100vh",  background: "#aab4ba"}}> <Outlet /></div>)
}