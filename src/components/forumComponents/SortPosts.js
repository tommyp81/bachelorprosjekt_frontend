import React from 'react'
import moment from 'moment'

import { Dropdown } from "react-bootstrap";

const SortPosts = ({post}) => {
  
  /*
  function sortByDate (event) {
    event.preventDefault();

    return post.sort((d1, d2) => (moment(d2.date) - (moment(d1.date))));
  }
  */

  /*
  function sortByComments (event) {
    event.preventDefault();
    
    for (i = 0; i > post.comments_Count; i ++ ) {
      return 
    }
  }*/

  return (
    <Dropdown>
          
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Sorter:  
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="" /*onSelect={}*/>Nyeste til eldste</Dropdown.Item>
        <Dropdown.Item href="">Flest kommentarer</Dropdown.Item>
      </Dropdown.Menu>

    </Dropdown>
  )
}

export default SortPosts;