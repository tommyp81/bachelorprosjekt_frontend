import React, { useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import { host } from '../../App'

const AdminPanel = ({users, setUsers}) => {

  const [selectedUsers, setSelectedUsers] = useState([])


  const test = (e) => {
    const {id, checked} = e.target
    console.log(id, checked)
    if(checked)
      setSelectedUsers(old => [...old, users.find(u => u.id == id)])
    else {
      setSelectedUsers(selectedUsers.filter(u => u.id != id))
    }
  }

  const deleteSelectedUsers = async () => {
    await Promise.all(
      selectedUsers.map(async u => {
        await fetch(host+`users/${u.id}`, {
          method: 'DELETE'
        })
      })
    )
    setUsers(users.filter(u => !selectedUsers.includes(u)))
    document.querySelectorAll('input[type=checkbox]').forEach( el => el.checked = false );
  }

  const adminToggle = async (e) => {
    const {id, value} = e.target;
    const user = users.find(u => u.id == id)
    const updatedUser = {
      ...user, 
      admin: Boolean(value)
    }
    const res = await fetch(host+`users/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser)
    })
    const data = await res.json()
    setUsers(users.map(u => {
      if (u.id == data.id) {
        return data
      }
      return u
    }))
  }

  


  return (
    <div style={{margin: '150px'}}>
      {selectedUsers.length > 0 && <Button variant="danger" onClick={deleteSelectedUsers}>Slett Bruker(e)</Button>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Brukernavn</th>
            <th>Fornavn</th>
            <th>Etternavn</th>
            <th>E-post</th>
            <th>Admin</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} >
              <td className="text-center"><Form.Check onChange={e => test(e)} id={u.id} type="checkbox" custom/></td>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.firstName}</td>
              <td>{u.lastName}</td>
              <td>{u.email}</td>
              <td>
                <Form.Control id={u.id} as="select" defaultValue={u.admin} onChange={adminToggle} disabled={true}>
                  <option value={true}>true</option>
                  <option value={false}>false</option>
                </Form.Control>
                {/* {String(u.admin)} */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default AdminPanel
