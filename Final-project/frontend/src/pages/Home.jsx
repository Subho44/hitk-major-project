import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Productform from '../components/Productform'
import Producttable from '../components/Producttable'

const Home = () => {
  const API_URL = 'http://localhost:5600/api/pro'

  const [products, setProducts] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    price: ''
  })
  const [editId, setEditId] = useState(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL)
      setProducts(res.data)
    } catch (err) {
      console.error(err)
      setError('Failed to load products')
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // Input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Add / Update submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')

    if (!formData.name.trim() || !formData.price) {
      setError('Please fill all fields')
      return
    }

    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, formData)
        setMessage('Product updated successfully')
      } else {
        await axios.post(`${API_URL}/add`, formData)
        setMessage('Product added successfully')
      }

      setFormData({ name: '', price: '' })
      setEditId(null)
      fetchProducts()
    } catch (err) {
      console.error(err)
      setError('Something went wrong')
    }
  }

  // Edit product
  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price
    })
    setEditId(product._id)
    setMessage('')
    setError('')
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Delete product
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?')

    if (!confirmDelete) return

    try {
      await axios.delete(`${API_URL}/${id}`)
      setMessage('Product deleted successfully')
      setError('')
      fetchProducts()
    } catch (err) {
      console.error(err)
      setError('Delete failed')
    }
  }

  // Cancel edit
  const handleCancel = () => {
    setFormData({ name: '', price: '' })
    setEditId(null)
    setMessage('')
    setError('')
  }
  //addtocart
  const addToCart = (product)=>{
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    const existing = cart.find((x)=>x._id ===product._id)
    if(existing) {
      cart = cart.map((item)=>
      item._id === product._id
      ? {...item, quantity:item.quantity +1}
      : item
      )
    } else {
      cart.push({...product, quantity:1})
    }
    localStorage.setItem('cart',JSON.stringify(cart))
    setMessage(`${product.name} added to cart`)
    window.location.reload()
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="text-center mb-4">
            <h2 className="fw-bold text-dark">Product Dashboard</h2>
            <p className="text-muted mb-0">
              Add, update and manage your product list easily
            </p>
          </div>

          {message && (
            <div className="alert alert-success text-center">{message}</div>
          )}

          {error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}

          <Productform
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            editId={editId}
            handleCancel={handleCancel}
          />

          <Producttable
            products={products}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            addToCart={addToCart}
          />
        </div>
      </div>
    </div>
  )
}

export default Home