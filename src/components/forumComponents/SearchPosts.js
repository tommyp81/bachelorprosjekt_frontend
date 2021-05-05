import React, { useState } from 'react'
import "./Forum.css"
import { Button, Form, InputGroup } from "react-bootstrap"
import { host } from '../../App'
import { FaSearch } from 'react-icons/fa'

const SearchPosts = ({ setFilteredPosts }) => {

  const [searchInput, setSearchInput] = useState("")

  const search = async (e) => {
    e.preventDefault()

    // &subTopicId=1&pageNumber=1&pageSize=10&sortOrder=Asc&sortType=Date
    const res = await fetch(host + 
      `posts/search?query=${searchInput}`)
    const searchData = await res.json()
    setFilteredPosts(searchData.data)
  }

  return (
    <div className="SearchPosts">
      <Form onSubmit={search}>
      {/* <InputGroup className="mb-3">
        <FormControl
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
          <Button variant="outline-secondary">Button</Button>
        </InputGroup.Append>
      </InputGroup> */}
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Søk i poster..."
            onChange={e => setSearchInput(e.target.value)}
          />
          <InputGroup.Append>
            <Button type="submit" disabled={searchInput.length < 1}>
              <FaSearch size={18} />
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    </div>
  )

}

export default SearchPosts;