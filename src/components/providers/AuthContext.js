import React, { useEffect, useState, useCallback, createContext } from 'react'
import firebase from '../../config/firebase'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(useCallback(() => {
    firebase.auth().onAuthStateChanged(setCurrentUser)
  }, []))

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      { children }
    </AuthContext.Provider>
  )
}

