import { createContext, useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import { loginUser, registerUser, logoutUser } from '../services/api'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  // Auto login on app load if a valid session exists in localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    if (storedToken && storedUser) {
      try {
        setToken(storedToken)
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (email, password) => {
    const res = await loginUser({ email, password })
    const { user: loggedInUser, token: newToken } = res.data
    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(loggedInUser))
    setUser(loggedInUser)
    setToken(newToken)
    return loggedInUser
  }, [])

  const register = useCallback(async (name, email, password) => {
    const res = await registerUser({ name, email, password })
    const { user: newUser, token: newToken } = res.data
    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(newUser))
    setUser(newUser)
    setToken(newToken)
    return newUser
  }, [])

  const logout = useCallback(async () => {
    try {
      await logoutUser()
    } catch {
      // even if backend logout fails, clear local session
    } finally {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setUser(null)
      setToken(null)
      toast.success('Logged out successfully')
    }
  }, [])

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
