import React,{useContext} from 'react'
import noteContext from '../../context/ProductData/noteContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Option = ({deletedataID,get}) => {

  const context = useContext(noteContext);
  const { setaccount} = context; // used to set the new cart data after delete the previous data dynamically


  const removedata = async(dataID)=>{
      try {
        const res = await fetch(`http://localhost:406/api/remove/${dataID}`,{
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type' : 'application/json'
          },
          credentials: 'include'
        });
        const data = await res.json();
        console.log(data);

        if(res.status === 400){
          console.log('error');
        }else{
          console.log('user details')
          setaccount(data);
          toast.success('Item Deleted', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
          get();
        }
      } catch (error) {
        console.log(error.message + 'error occured');
      }
  }
  return (
    <div className='add_remove_select'>
      <select>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <p style={{cursor: 'pointer'}} onClick={()=>{removedata(deletedataID)}}>Delete</p><span>|</span>
      <p className='forremovemedia'>Save Or Later</p><span>|</span>
      <p className='forremovemedia'>See More like this</p>
      <ToastContainer />
    </div>
  )
}

export default Option
