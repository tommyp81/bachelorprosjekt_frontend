import React, { useState } from 'react'
import { Form } from "react-bootstrap"
import './AdminPanel.css'

const SearchUsers = ({ setSearchInput }) => {

  return (
    <div className="SearchUsers">
      <Form onSubmit={e => e.preventDefault()}>
        <Form.Group>
          <Form.Control style={{width: "250px"}}
            placeholder="Søk i brukere..."
            onChange={e => setSearchInput(e.target.value)}
          />
        </Form.Group>
      </Form>
    </div>
  )

}

export default SearchUsers;