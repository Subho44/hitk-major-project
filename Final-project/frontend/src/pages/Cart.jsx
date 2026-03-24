import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
 const [cartItems,setCartItems] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  useEffect(()=>{
    const cart = JSON.parse(localStorage.getItem('cart'))||[];
    setCartItems(cart);
  },[])

  //update cart
  const updatecart = (updatedcart)=> {
    setCartItems(updatedcart)
    localStorage.setItem('cart',JSON.stringify(updatedcart))
  }
  //incrse qty
  const increaseqty = (id)=>{
    const updated = cartItems.map((x)=>
    x._id === id ? {...x,quantity:x.quantity+1} : x
    )
    updatecart(updated)
  }
  //decrease
  const decreaseqty = (id)=>{
    const updated = cartItems.map((x)=>
    x._id === id ? {...x,quantity:x.quantity-1} : x
    )
    .filter((x)=>x.quantity>0)
    updatecart(updated)
  }
  //removeitem
  const removeitem = (id)=>{
    const updated = cartItems.filter((x)=>x._id !==id)
    updatecart(updated)
  }
  //total amount
  const totalamount = cartItems.reduce(
    (total,x)=> total + x.price * x.quantity, 0
  )
  //place order

  const placeorder = async ()=>{
    try {
      const token = localStorage.getItem('token');
      const orderdata = {
        items:cartItems.map(x=>({
          productId:x._id,
          name:x.name,
          price:x.price,
          quantity:x.quantity
        })),
        totalamount
      }
      const res = await axios.post(
        'http://localhost:5600/api/orders/place',
        orderdata,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      )
      setMessage(res.data.message)
      localStorage.removeItem('cart')
      setCartItems([])
      setTimeout(()=>{
        navigate('/orders')
      },800)
    } catch(err) {
      console.error(err)
      setMessage('place order failed')
    }
  }

  return <>
  <div className='container py-4'>
 <h2>My Cart</h2>
 {message && <div className='alert alert-success text-center'>{message}</div>}
   
 {
  cartItems.length === 0 ? (
<div className='alert alert-info text-center'>
  cart is empty
</div>
  ) :(
   <div className='card'>
    <table>
      <tr>
        <th>SL</th>
        <th>Name</th>
        <th>Price</th>
        <th>Qty</th>
        <th>Subtotal</th>
        <th>Action</th>      
      </tr>
      {
        cartItems.map((x,index)=>(
          <tr>
            <td>{index + 1}</td>
            <td>{x.name}</td>
             <td>₹ {x.price}</td>
            <td>
              <button className='btn btn-sm btn-dark me-2' onClick={()=>increaseqty(x._id)}>
                +
              </button>
              {x.quantity}
               <button className='btn btn-sm btn-dark ms-2' onClick={()=>decreaseqty(x._id)}>
                -
              </button>
            </td>
            <td>₹ {x.price * x.quantity}</td>
            <td>
               <button className='btn btn-sm btn-dark' onClick={()=>removeitem(x._id)}>
                Remove
              </button>
            </td>
          </tr>
        ))
      }
    </table>
    <h4>Total: ₹ {totalamount}</h4>
    <div>
     <button className='btn btn-sm btn-dark' onClick={placeorder}>
                place order
     </button>
    </div>  
   </div>
   
   
  )




 }  




  </div>
  
  </>
}

export default Cart