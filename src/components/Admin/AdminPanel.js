import React, { useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import { host } from '../../App'
import SearchUsers from "./SearchUsers.js"
import './AdminPanel.css'
import PasswordDialog from './PasswordDialog'

const AdminPanel = ({users, setUsers}) => {

  const [selectedUsers, setSelectedUsers] = useState([])
  const [searchFilter, setSearchFilter] = useState("");
  


  const selectUser = (e) => {
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
    const formData = new FormData()
    formData.append('id', id)
    formData.append('admin', Boolean(value))
    const res = await fetch(host+'setAdmin', {
      method: 'POST',
      body: formData
    })
    const data = await res.json()
    setUsers(users.map(u => {
      if (u.id == data.id) {
        return data
      }
      return u
    }))
  }

  const currentUsers = users
    .filter((users) => {
      if (searchFilter === "") {
        return users;
      } else if (
        users.username.toLowerCase().includes(searchFilter.toLowerCase()) ||
        users.firstName.toLowerCase().includes(searchFilter.toLowerCase()) ||
        users.lastName.toLowerCase().includes(searchFilter.toLowerCase()) ||
        users.email.toLowerCase().includes(searchFilter.toLowerCase())
      ) {
        return users;
      }
    })


  return (
    <div className="containerPanel container col-12">
      <div className="toppanel">
        <Button className="deletebutton" variant="danger" onClick={deleteSelectedUsers} disabled={selectedUsers.length < 1}>Slett bruker(e)</Button>
        <SearchUsers setSearchInput={setSearchFilter}/>
      </div>
      <Table className="usertable" striped bordered responsive>
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Brukernavn</th>
            <th className="d-none d-xl-table-cell">Fornavn</th>
            <th className="d-none d-xl-table-cell">Etternavn</th>
            <th className="d-none d-xl-table-cell">E-post</th>
            <th>Admin</th>
            <th>Passord</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((u) => (
            <tr key={u.id} >
              <td width={50}><Form.Check onChange={e => selectUser(e)} id={u.id} disabled={u.id === 1} type="checkbox" custom/></td>
              <td width={50}>{u.id}</td>
              <td>{u.username}</td>
              <td className="d-none d-xl-table-cell">{u.firstName}</td>
              <td className="d-none d-xl-table-cell">{u.lastName}</td>
              <td className="d-none d-xl-table-cell">{u.email}</td>
              <td width={130}>
                <Form.Control size="sm"  id={u.id} as="select" defaultValue={u.admin} onChange={adminToggle} disabled={u.id === 1}>
                  <option value={true}>true</option>
                  <option value={false}>false</option>
                </Form.Control>
                {/* {String(u.admin)} */}
              </td>
              <td width={125}><PasswordDialog user={u}/></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default AdminPanel
