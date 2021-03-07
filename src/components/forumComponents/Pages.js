import React from "react"
import { Pagination, Dropdown } from "react-bootstrap"
import "./Forum.css"

const Pages = ({postsPerPage, totalPosts, paginate, nextPage, prevPage, currentPage, firstPage, lastPage}) => {

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="Pages" style={{marginTop:"20px"}}>
      <Pagination className="justify-content-center">
        <Pagination.Item
        onClick={() => prevPage()}
        disabled={firstPage}>
          {"<"}
        </Pagination.Item>

        <Dropdown>
          <Dropdown.Toggle className="page">
            Side {currentPage}
          </Dropdown.Toggle>
          
          <Dropdown.Menu>
            {pageNumbers.map(num => (
            <Dropdown.Item onClick={() => paginate(num)} key={num}>
              Side {num}
            </Dropdown.Item> 
            ))}
          </Dropdown.Menu>
         
        </Dropdown>

        <Pagination.Item
        onClick={() => nextPage()}
        disabled={lastPage}>
          {">"}
        </Pagination.Item>
      </Pagination>
      </div>
  )
}
export default Pages
