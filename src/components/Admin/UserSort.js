import React from 'react'
import { Dropdown } from 'react-bootstrap'

const UserSort = ({setSort}) => {

  const sortByIdAsc = () => {
    setSort({sortOrder: "Asc", sortType: "id"})
  }

  const sortByIdDesc = () => {
    setSort({sortOrder: "Desc", sortType: "id"})
  }

  const sortByUsername = () => {
    setSort({sortOrder: "Asc", sortType: "username"})
  }

  const sortByAdmin = () => {
    setSort({sortOrder: "Desc", sortType: "admin"})
  }


  return (
    <Dropdown>
          
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Sorter:  
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="" onClick={() => sortByIdAsc()}       >id Høy/lav</Dropdown.Item>
        <Dropdown.Item href="" onClick={() => sortByIdDesc()}       >id Lav/høy</Dropdown.Item>
        <Dropdown.Item href="" onClick={() => sortByUsername()}       >Brukernavn</Dropdown.Item>
        <Dropdown.Item href="" onClick={() => sortByAdmin()}       >Admin</Dropdown.Item>
      </Dropdown.Menu>


    </Dropdown>
  )

}

export default UserSort
