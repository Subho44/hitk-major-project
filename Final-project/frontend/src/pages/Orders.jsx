import React,{useState,useEffect} from 'react'
import axios from 'axios'

const Orders = () => {
  const [orders,setOrders] = useState([]);
  const fetchorders = async ()=> {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get("http://localhost:5600/api/orders/my-orders",{
      headers:{
            Authorization:`Bearer ${token}`
          }
      })
      setOrders(res.data)
    } catch(err){
      console.error(err)
    }
  }
  useEffect(()=>{
    fetchorders()
  },[]);

  return <>
   <div className='container py-4'>
 <h2>My Orders</h2>
 
   
 {
  orders.length === 0 ? (
<div className='alert alert-info text-center'>
  no order found
</div>
  ) :(
   <div className='card'>
    <table>
      <tr>
        
        <th>Product</th>
        <th>Price</th>
        <th>Qty</th>
            
      </tr>
      {
        orders.map((x)=>(
          <tr>
            <td>{x.name}</td>
             <td>₹ {x.price}</td>
             <td>₹ {x.quantity}</td>
           
          </tr>
        ))
      }
    </table>
   </div>
   
   
  )




 }  




  </div>
  
  
  
  </>
}

export default Orders