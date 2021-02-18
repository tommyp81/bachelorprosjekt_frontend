import React from 'react'
import { Dropdown } from "react-bootstrap";

const SortPosts = ({post}) => {
    

return (
    <Dropdown>
        
  <Dropdown.Toggle variant="primary" id="dropdown-basic">
    Sorter:  
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="">Nyeste til eldste</Dropdown.Item>
    <Dropdown.Item href="">Mest populære</Dropdown.Item>
  </Dropdown.Menu>

</Dropdown>
    )
}

export default SortPosts;