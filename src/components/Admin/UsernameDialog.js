import React, { useContext, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { host } from '../../App'
import { UserContext } from '../../UserContext'

const UsernameDialog = ({users, setUsers}) => {

  const {user, setUser} = useContext(UserContext)

  const [newUsername, setNewusername] = useState(user.username)
  const [password, setPassword] = useState("")

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setPassword("")
    setShow(true)
  }

  const isDisabled = (newUsername.length < 3 || newUsername === user.username) || !password;
  

  const changeUsername = async () => {
    // e.preventDefault();
    const res = await fetch(host+`users/${user.id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({...users.find(u => u.id == user.id), username: newUsername, password})
    })
    if(res.ok) { 
      const data = await res.json()
      setUser({...user, username: data.username})
      setUsers(users.map(u => {
        if(u.id == user.id) {
          return {
            ...u, 
            username: data.username
          }
        }
        return u
      }))
      alert("Brukernavn endret!")
    } else {
      const text = await res.text()
      alert(text)
    }
    setPassword("")
  }

  return (
    <>
      <span className="btn-link" onClick={handleShow}>Endre Brukernavn</span>
      <Modal animation={false} show={show} onHide={handleClose}>
        <Modal.Header closeButton={true}>
          <Modal.Title>Sett nytt Brukernavn for: {user.username}</Modal.Title>
        </Modal.Header>
        <div>
          <Form.Control 
            type='text'
            placeholder='Nytt Brukernavn'
            value={newUsername}
            onChange={e => setNewusername(e.target.value)}
          />
          <Form.Control 
            type='password'
            placeholder='Passord'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div className="float-right">
            <Button disabled={isDisabled} variant="success" onClick={changeUsername}>Bekreft</Button>
            <Button variant="danger" onClick={handleClose}>
              Lukk
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default UsernameDialog
