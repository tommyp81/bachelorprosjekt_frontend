import React from "react"
import { Pagination } from "react-bootstrap"

const Pages = ({postsPerPage, totalPosts, paginate, nextPage, prevPage}) => {

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="Page" style={{marginTop:"20px"}}>
      <Pagination className="justify-content-center">
        <Pagination.Prev 
        href="#" 
        onClick={() => prevPage()}
        />

        {pageNumbers.map(num => (
          <Pagination.Item
          key={num}
          onClick={() => paginate(num)} 
          href="#">
          {num}    
          </Pagination.Item>
        ))}

        <Pagination.Next 
        href="#" 
        onClick={() => nextPage()}
        />
      </Pagination>
      </div>
  )
}
export default Pages
