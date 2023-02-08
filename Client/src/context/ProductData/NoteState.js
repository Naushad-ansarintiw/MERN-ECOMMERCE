import React, { useState } from "react";
import NoteContext from "./noteContext";


// Getting All data from backend
const NoteState = (props) => {
    const host = 'http://localhost:406';
    const productInitial = [];

    const [products,setProducts] = useState(productInitial);
    const [account,setaccount] = useState('');

    // Get ALl Note 
    const getNotes = async()=>{
        // API CALL
        const res = await fetch(`${host}/api/getproducts`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // console.log(products)

        const data = await res.json();
        setProducts(data);
    }

    // for account setting when i refrese the account value is not set its show that (undefined reding length in navbar.js) so i created this routes
    


    return (
        <NoteContext.Provider value={{products,getNotes,account,setaccount}}>
            {props.children}
        </NoteContext.Provider>
    )

}


export default NoteState;