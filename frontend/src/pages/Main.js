import React, { useEffect, useState } from "react";
import './Main.css'

import api from  '../services/api'

import dislike from '../assets/dislike.png'
import like from '../assets/like.png'
import logo from '../assets/logo.png'

export default function Main({ match }) {
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/devs', {
        headers: { 
          user: match.params.id
        }
      })

      setUsers(response.data)
    }

    loadUsers()
  }, [match.params.id])

  return (
    <div className="main-container">
      <img id="logo" src={logo} alt="Trynder" />
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <img src={user.avatar} alt={user.name} />
            <footer>
              <strong>{user.name}</strong>
              <p>{user.bio}</p>
            </footer>

            <div className="buttons">
              <button type="button">
                <img src={dislike} alt="Disklike" />
              </button>
              <button type="button">
                <img src={like} alt="Like" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}