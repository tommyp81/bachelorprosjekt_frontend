import React, { useState } from 'react'
import { Form } from "react-bootstrap"
import './AdminPanel.css'

const SearchPosts = ({ setSearchInput }) => {

  return (
    <div className="SearchPosts">
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

export default SearchPosts;