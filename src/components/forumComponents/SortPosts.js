import React from 'react'
import moment from 'moment'

import { Dropdown } from "react-bootstrap";

const SortPosts = ({post}) => {
  
   /*
  const sortByDate = () => {
      post.sort((d1, d2) => (moment(d2.date) - (moment(d1.date))));
  }

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
        <Dropdown.Item href="">Nyeste til eldste</Dropdown.Item>
        <Dropdown.Item href="">Eldste til nyeste</Dropdown.Item>
        <Dropdown.Item href="">Flest kommentarer</Dropdown.Item> {/*Her skal den først sortere nyest til eldst, deretter etter antall kommentarer, altså ned til 0 */}
        <Dropdown.Item href="">Ingen kommentarer</Dropdown.Item> {/*Her skal den først sortere nyest til eldst, deretter etter antall kommentarer, altså 0 og opp */}
      </Dropdown.Menu>

    </Dropdown>
  )
}

export default SortPosts;