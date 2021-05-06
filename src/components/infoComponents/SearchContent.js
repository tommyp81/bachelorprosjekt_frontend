import React from 'react'
import "./Kunnskapsportalen.css"
import { Form } from "react-bootstrap"

const SearchContent = ({ setSearchInput, placeholderText }) => {

  return (
    <div className="SearchContent">
      <Form onSubmit={e => e.preventDefault()}>
        <Form.Group>
          <Form.Control
            placeholder={placeholderText}
            onChange={e => setSearchInput(e.target.value)}
          />
        </Form.Group>
      </Form>
    </div>
  )

}

export default SearchContent;