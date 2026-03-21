import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')
    setLoading(true)

    try {
      const res = await axios.post(
        'http://localhost:5600/api/auth/register',
        formData
      )

      setMessage(res.data.message || 'Registration successful')

      setFormData({
        name: '',
        email: '',
        password: ''
      })

      setTimeout(() => {
        navigate('/login')
      }, 1000)
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow border-0">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Register</h2>

              {message && <div className="alert alert-success">{message}</div>}
              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={submitHandler}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={changeHandler}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={changeHandler}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={changeHandler}
                  />
                </div>

                <button className="btn btn-primary w-100" disabled={loading}>
                  {loading ? 'Please wait...' : 'Register'}
                </button>
              </form>

              <p className="text-center mt-3 mb-0">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register