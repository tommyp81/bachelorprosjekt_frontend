import React from 'react'
import moment from 'moment'

import { Dropdown } from "react-bootstrap";

const SortPosts = ({post, setFilteredPosts}) => {
  
   
  const sortByNewest = () => {
      setFilteredPosts(post.slice(0).sort((d1, d2) => (moment(d2.date) - (moment(d1.date)))));
  }
  const sortByOldest = () => {
      setFilteredPosts(post.slice(0).sort((d1, d2) => (moment(d1.date) - (moment(d2.date)))));
  }
  const sortByMostLikes = () => {
    setFilteredPosts(post.slice(0).sort((d1, d2) => ((d2.like_Count) - ((d1.like_Count)))));
  }
  const sortByLeastLikes = () => {
    setFilteredPosts(post.slice(0).sort((d1, d2) => ((d1.like_Count) - ((d2.like_Count)))));
  }
  const sortByMostComments = () => {
      setFilteredPosts(post.slice(0).sort((d1, d2) => ((d2.comment_Count) - ((d1.comment_Count)))));
  }
  const sortByLeastComments = () => {
    setFilteredPosts(post.slice(0).sort((d1, d2) => ((d1.comment_Count) - ((d2.comment_Count)))));
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
        <Dropdown.Item href="" onClick={() => sortByMostComments()} >Flest kommentarer</Dropdown.Item> {/*Her skal den først sortere nyest til eldst, deretter etter antall kommentarer, altså ned til 0 */}
        <Dropdown.Item href="" onClick={() => sortByLeastComments()}>Færrest kommentarer</Dropdown.Item> {/*Her skal den først sortere nyest til eldst, deretter etter antall kommentarer, altså 0 og opp */}
      </Dropdown.Menu>


    </Dropdown>
  )
}

export default SortPosts;