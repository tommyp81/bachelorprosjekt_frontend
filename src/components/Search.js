import React, { useState } from 'react'
import "./forumComponents/Forum.css"
import { Button, ButtonGroup, Form, InputGroup } from "react-bootstrap"
import { FaSearch, FaTimes } from 'react-icons/fa'

const Search = ({ setSearchValue, searchValue, placeholderText, setCurrentPage }) => {

  const [searchInput, setSearchInput] = useState("")

  const search = (e) => {
    e.preventDefault()
    setSearchValue(searchInput)
    setCurrentPage(1)
  }

  const clearSearch = () => {
    setSearchInput("")
    setSearchValue("")
  }

  return (
    <div className="Search">
      <Form onSubmit={search}>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder={placeholderText}
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
          <InputGroup.Append>
            <ButtonGroup>
              {searchValue && 
                <Button variant="secondary" onClick={clearSearch}>
                  <FaTimes size={18} />
                </Button>
              }
              <Button type="submit" disabled={searchInput.length < 1}>
                <FaSearch size={18} />
              </Button>
            </ButtonGroup>
          </InputGroup.Append>
        </InputGroup>
      </Form>
      {searchValue && <p className="text-info">Trykk på "X" for å avbryte søk</p>}
    </div>
  )

}

export default Search;