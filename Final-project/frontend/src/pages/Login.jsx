import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const [loginType, setLoginType] = useState('password')

  const [passwordData, setPasswordData] = useState({
    email: '',
    password: ''
  })

  const [otpData, setOtpData] = useState({
    email: '',
    otp: ''
  })

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    })
  }

  const handleOtpChange = (e) => {
    setOtpData({
      ...otpData,
      [e.target.name]: e.target.value
    })
  }

  const passwordLoginHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    try {
      const res = await axios.post(
        'http://localhost:5600/api/auth/login',
        passwordData
      )

      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))

      setMessage(res.data.message || 'Login successful')

      setTimeout(() => {
        navigate('/home')
      }, 800)
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const sendOtpHandler = async () => {
    setLoading(true)
    setMessage('')
    setError('')

    try {
      const res = await axios.post(
        'http://localhost:5600/api/auth/send-otp-login',
        { email: otpData.email }
      )

      setMessage(res.data.message || 'OTP sent successfully')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  const verifyOtpHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    try {
      const res = await axios.post(
        'http://localhost:5600/api/auth/verify-otp-login',
        otpData
      )

      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))

      setMessage(res.data.message || 'OTP login successful')

      setTimeout(() => {
        navigate('/home')
      }, 800)
    } catch (err) {
      setError(err.response?.data?.message || 'OTP verification failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="card shadow border-0">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Login</h2>

              <div className="d-flex justify-content-center mb-4 gap-2 flex-wrap">
                <button
                  className={`btn ${loginType === 'password' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => {
                    setLoginType('password')
                    setMessage('')
                    setError('')
                  }}
                >
                  Password Login
                </button>
                <button
                  className={`btn ${loginType === 'otp' ? 'btn-success' : 'btn-outline-success'}`}
                  onClick={() => {
                    setLoginType('otp')
                    setMessage('')
                    setError('')
                  }}
                >
                  OTP Login
                </button>
              </div>

              {message && <div className="alert alert-success">{message}</div>}
              {error && <div className="alert alert-danger">{error}</div>}

              {loginType === 'password' && (
                <form onSubmit={passwordLoginHandler}>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter email"
                      value={passwordData.email}
                      onChange={handlePasswordChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter password"
                      value={passwordData.password}
                      onChange={handlePasswordChange}
                    />
                  </div>

                  <button className="btn btn-primary w-100" disabled={loading}>
                    {loading ? 'Please wait...' : 'Login'}
                  </button>
                </form>
              )}

              {loginType === 'otp' && (
                <form onSubmit={verifyOtpHandler}>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter email"
                      value={otpData.email}
                      onChange={handleOtpChange}
                    />
                  </div>

                  <div className="mb-3">
                    <button
                      type="button"
                      className="btn btn-warning w-100"
                      onClick={sendOtpHandler}
                      disabled={loading}
                    >
                      {loading ? 'Sending...' : 'Send OTP'}
                    </button>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">OTP</label>
                    <input
                      type="text"
                      name="otp"
                      className="form-control"
                      placeholder="Enter OTP"
                      value={otpData.otp}
                      onChange={handleOtpChange}
                    />
                  </div>

                  <button className="btn btn-success w-100" disabled={loading}>
                    {loading ? 'Please wait...' : 'Verify OTP Login'}
                  </button>
                </form>
              )}

              <p className="text-center mt-3 mb-0">
                New user? <Link to="/">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login