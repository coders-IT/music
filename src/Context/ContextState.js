import React from "react";
import BaseContext from "./BaseContext";

const ContextState = (props)=>{
    const name = "No Name";
    return(
        <BaseContext.Provider value={{name}}>
            {props.children}
        </BaseContext.Provider>
    )

}


export default ContextState;