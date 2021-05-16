import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import { host } from '../../App'
import SearchUsers from "./SearchUsers.js"
import './AdminPanel.css'
import PasswordDialog from './PasswordDialog'
import Pages from '../forumComponents/Pages'
import UserSort from './UserSort'
import Search from '../Search'
import { UserContext } from '../../App'

const AdminPanel = () => {

  const {user} = useContext(UserContext)

  const [users, setUsers] = useState([])

  const [selectedUsers, setSelectedUsers] = useState([])
  const [searchFilter, setSearchFilter] = useState("");

  const [sort, setSort] = useState({sortOrder: "Asc", sortType: "id"})
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(null)

  const usersURL = searchFilter ? 
    `users/search?query=${searchFilter}&pageNumber=${currentPage}
    &pageSize=${usersPerPage}&sortOrder=${sort.sortOrder}&sortType=${sort.sortType}`
      :
    `users?pageNumber=${currentPage}&pageSize=${usersPerPage}
    &sortOrder=${sort.sortOrder}&sortType=${sort.sortType}`


  useEffect( async () => {
    const res = await fetch(host + usersURL ,{
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
    const resData = await res.json()
    setUsers(resData.data)
    setTotalPages(resData.totalPages)

  }, [currentPage, sort, searchFilter])
  


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
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${user.token}`
          }
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
      headers: {
        Authorization: `Bearer ${user.token}`
      },
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
    <div className="AdminPanel">
    <div className="toppanel">
      <div className="searchusersdesktop">
        <Search setSearchValue={setSearchFilter} searchValue={searchFilter} placeholderText={"Søk..."} setCurrentPage={setCurrentPage}/>
      </div>
      <div className="sortusers">
        <UserSort setSort={setSort} />
      </div>
      <div className="deleteusers">
        <Button className="deletebutton" variant="danger" onClick={deleteSelectedUsers} disabled={selectedUsers.length < 1}>Slett bruker(e)</Button>
      </div>
      <div className="searchusersmobile">
        <Search setSearchValue={setSearchFilter} searchValue={searchFilter} placeholderText={"Søk..."} setCurrentPage={setCurrentPage}/>
      </div>
    </div>
      <Table className="usertable" striped bordered responsive>
        <thead>
          <tr>
            <th>Velg bruker(e)</th>
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
      {totalPages > 1 &&
        <Pages
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      }
    </div>
  )
}

export default AdminPanel
