import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, []);

  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const increaseQty = (id) => {
    const updated = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cartItems
      .map((item) =>
        item._id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updated);
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item._id !== id);
    updateCart(updated);
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + Number(item.price) * Number(item.quantity),
    0
  );

  const placeOrder = async () => {
    if (cartItems.length === 0) {
      setMessage('Cart is empty');
      return;
    }

    try {
      setLoading(true);
      setMessage('');

      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('Please login first');
        return;
      }

      const orderData = {
        items: cartItems.map((item) => ({
          productId: item._id,
          name: item.name,
          price: Number(item.price),
          quantity: Number(item.quantity),
        })),
        totalAmount,
      };

      const res = await axios.post('http://localhost:5600/api/orders/place', orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(res.data.message || 'Order placed successfully');
      localStorage.removeItem('cart');
      setCartItems([]);

      setTimeout(() => {
        navigate('/orders');
      }, 700);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Place order failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container py-4'>
      <h2 className='text-center mb-4'>My Cart</h2>

      {message && <div className='alert alert-info text-center'>{message}</div>}

      {cartItems.length === 0 ? (
        <div className='alert alert-warning text-center'>Cart is empty</div>
      ) : (
        <div className='card shadow-sm border-0'>
          <div className='card-body'>
            <div className='table-responsive'>
              <table className='table table-bordered table-hover text-center align-middle'>
                <thead className='thead-dark'>
                  <tr>
                    <th>SL</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Subtotal</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>₹ {item.price}</td>
                      <td>
                        <button
                          className='btn btn-sm btn-dark mr-2'
                          onClick={() => decreaseQty(item._id)}
                        >
                          -
                        </button>

                        <span className='mx-2'>{item.quantity}</span>

                        <button
                          className='btn btn-sm btn-dark ml-2'
                          onClick={() => increaseQty(item._id)}
                        >
                          +
                        </button>
                      </td>
                      <td>₹ {Number(item.price) * Number(item.quantity)}</td>
                      <td>
                        <button
                          className='btn btn-sm btn-danger'
                          onClick={() => removeItem(item._id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className='d-flex justify-content-between align-items-center mt-3 flex-wrap'>
              <h4 className='mb-2'>Total: ₹ {totalAmount}</h4>

              <button className='btn btn-success' onClick={placeOrder} disabled={loading}>
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
