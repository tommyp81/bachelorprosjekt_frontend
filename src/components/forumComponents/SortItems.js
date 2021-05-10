import React from 'react'
import moment from 'moment'

import { Dropdown } from "react-bootstrap";

const SortItems = ({setSort, isPost}) => {
  
   
  const sortByNewest = () => {
    setSort({sortOrder: "Desc", sortType: "Date"})
  }
  const sortByOldest = () => {
    setSort({sortOrder: "Asc", sortType: "Date"})
  }
  const sortByMostLikes = () => {
    setSort({sortOrder: "Desc", sortType: "like_count"})
  }
  const sortByLeastLikes = () => {
    setSort({sortOrder: "Asc", sortType: "like_count"})
  }
  const sortByMostComments = () => {
    setSort({sortOrder: "Desc", sortType: "comment_count"})
  }
  const sortByLeastComments = () => {
    setSort({sortOrder: "Asc", sortType: "comment_count"})
  }

  return (
    <Dropdown>
          
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Sorter:  
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="" onClick={() => sortByNewest()}       >Nyeste til eldste</Dropdown.Item>
        <Dropdown.Item href="" onClick={() => sortByOldest()}       >Eldste til nyeste</Dropdown.Item>
        <Dropdown.Item href="" onClick={() => sortByMostLikes()}    >Flest liker</Dropdown.Item>
        <Dropdown.Item href="" onClick={() => sortByLeastLikes()}   >Færrest liker</Dropdown.Item>
        {isPost && <Dropdown.Item href="" onClick={() => sortByMostComments()} >Flest kommentarer</Dropdown.Item>} 
        {isPost && <Dropdown.Item href="" onClick={() => sortByLeastComments()}>Færrest kommentarer</Dropdown.Item>} 
      </Dropdown.Menu>


    </Dropdown>
  )
}

export default SortItems;