export const getProduct = () => async (dispatch) => {
    try {
        const data = await fetch('http://localhost:406/api/getproducts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const res = await data.json();
        console.log(res);
        dispatch({ type: 'SUCCESS_GET_PRODUCTS', payload: res })
    } catch (error) {
        dispatch({ type: 'FAIL_GET_PRODUCTS', payload: error.response })
    }
}


// export const getProduct = async () => {
//     try {
//         const data = await fetch('http://localhost:406/api/getproducts', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });
//         const res = data.json();
//         console.log(res);
//         return (dispatch) => {
//             dispatch({
//                 type: 'SUCCESS_GET_PRODUCTS',
//                 payload: res
//             })
//         }
//     } catch (error) {
//         return (dispatch) => {
//             dispatch({
//                 type: 'FAIL_GET_PRODUCTS',
//                 payload: res
//             })
//         }
//     }
// }