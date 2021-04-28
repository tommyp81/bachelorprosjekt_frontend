import React, { useState } from 'react'
import { Form } from "react-bootstrap"

const SearchContent = ({ setSearchInput }) => {

  return (
    <div className="SearchContent">
      <Form onSubmit={e => e.preventDefault()}>
        <Form.Group>
          <Form.Control
            placeholder="Søk i kunnskapsportalen"
            onChange={e => setSearchInput(e.target.value)}
          />
        </Form.Group>
      </Form>
    </div>
  )

}

export default SearchContent;