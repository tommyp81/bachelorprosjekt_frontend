import React, { useState } from 'react'
import "./Forum.css"
import { Button, Form, InputGroup } from "react-bootstrap"
import { host } from '../../App'
import { FaSearch, FaTimes } from 'react-icons/fa'

const SearchPosts = ({ setFilteredPosts, setSearchValue, searchValue }) => {

  const [searchInput, setSearchInput] = useState("")

  const search = (e) => {
    e.preventDefault()

    // &subTopicId=1&pageNumber=1&pageSize=10&sortOrder=Asc&sortType=Date
    
    // const res = await fetch(host + 
    //   `posts/search?query=${searchInput}`)
    // const searchData = await res.json()
    // setFilteredPosts(searchData.data)
    setSearchValue(searchInput)
  }

  const clearSearch = () => {
    setSearchInput("")
    setSearchValue("")
  }

  return (
    <div className="SearchPosts">
      <Form onSubmit={search}>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Søk i poster..."
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
          <InputGroup.Append>
            {!searchValue ?
              <Button type="submit" disabled={searchInput.length < 1}>
                <FaSearch size={18} />
              </Button>
                : 
              <Button variant="secondary" onClick={clearSearch}>
                <FaTimes size={18} />
              </Button>
            }
          </InputGroup.Append>
        </InputGroup>
      </Form>
      {searchValue && <p className="text-info">Klikk på "X" for å fjærne "søkemodus"</p>}
    </div>
  )

}

export default SearchPosts;