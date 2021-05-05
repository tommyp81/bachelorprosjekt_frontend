import React, { useEffect, useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import { host } from '../../App'
import SearchUsers from "./SearchUsers.js"
import './AdminPanel.css'
import PasswordDialog from './PasswordDialog'
import Pages from '../forumComponents/Pages'

const AdminPanel = () => {

  const [users, setUsers] = useState([])

  const [selectedUsers, setSelectedUsers] = useState([])
  const [searchFilter, setSearchFilter] = useState("");

  const [sort, setSort] = useState({sortOrder: "", sortType: ""})
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(null)


  useEffect( async () => {
    const res = await fetch(host + 
      `users?pageNumber=${currentPage}&pageSize=${usersPerPage}&sortOrder=${sort.sortOrder}&sortType=${sort.sortType}`)
    const resData = await res.json()
    setUsers(resData.data)
    setTotalPages(resData.totalPages)

  }, [currentPage, sort])
  

  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  const lastPage = currentPage === totalPages
  const firstPage = currentPage === 1;

  const goToLast = () =>
    setCurrentPage(totalPages);
  const goToFirst = () => setCurrentPage(1);


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

  // const currentUsers = users
  //   .filter((users) => {
  //     if (searchFilter === "") {
  //       return users;
  //     } else if (
  //       users.username.toLowerCase().includes(searchFilter.toLowerCase()) ||
  //       users.firstName.toLowerCase().includes(searchFilter.toLowerCase()) ||
  //       users.lastName.toLowerCase().includes(searchFilter.toLowerCase()) ||
  //       users.email.toLowerCase().includes(searchFilter.toLowerCase())
  //     ) {
  //       return users;
  //     }
  //   })


  return (
    <div className="containerPanel container col-12">
      <div className="d-flex justify-content-between">
        <Button className="deletebutton" variant="danger" onClick={deleteSelectedUsers} disabled={selectedUsers.length < 1}>Slett Bruker(e)</Button>
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
          {users.map((u) => (
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
      <Pages
        nextPage={nextPage}
        prevPage={prevPage}
        currentPage={currentPage}
        firstPage={firstPage}
        lastPage={lastPage}
        goToFirst={goToFirst}
        goToLast={goToLast}
      />
    </div>
  )
}

export default AdminPanel
