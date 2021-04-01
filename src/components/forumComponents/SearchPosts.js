import React, { useState } from 'react'
import "./Forum.css"
import { Form } from "react-bootstrap"

const SearchPosts = ({ setSearchInput }) => {


  return (
    <div className="SearchPosts">
      <Form onSubmit={e => e.preventDefault()}>
        <Form.Group>
          <Form.Control
            placeholder="Søk i poster..."
            onChange={e => setSearchInput(e.target.value)}
          />
        </Form.Group>
      </Form>
    </div>
  )

}

export default SearchPosts