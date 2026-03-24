import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');

      const res = await axios.get('http://localhost:5600/api/orders/my-orders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className='container py-4'>
      <h2 className='text-center mb-4'>My Orders</h2>

      {message && <div className='alert alert-danger text-center'>{message}</div>}

      {loading ? (
        <div className='alert alert-info text-center'>Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className='alert alert-info text-center'>No order found</div>
      ) : (
        orders.map((order, index) => (
          <div className='card shadow-sm border-0 mb-4' key={order._id}>
            <div className='card-body'>
              <div className='d-flex justify-content-between align-items-center flex-wrap mb-3'>
                <h5 className='mb-2'>Order #{index + 1}</h5>
                <span className='badge badge-success p-2'>{order.status}</span>
              </div>

              <div className='row mb-3'>
                <div className='col-md-6 mb-2'>
                  <strong>Order ID:</strong> {order._id}
                </div>
                <div className='col-md-6 mb-2'>
                  <strong>Total Amount:</strong> ₹ {order.totalAmount}
                </div>
              </div>

              <div className='table-responsive'>
                <table className='table table-bordered table-hover text-center'>
                  <thead className='thead-dark'>
                    <tr>
                      <th>SL</th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{item.name}</td>
                        <td>₹ {item.price}</td>
                        <td>{item.quantity}</td>
                        <td>₹ {Number(item.price) * Number(item.quantity)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className='mb-0 mt-2'>
                <strong>Placed On:</strong> {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
