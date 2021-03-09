import React from "react"
import { Pagination, Dropdown } from "react-bootstrap"
import "./Forum.css"

const Pages = ({postsPerPage, totalPosts, paginate, nextPage, prevPage, currentPage, firstPage, lastPage}) => {

  const pageNumbers = []
  for (let i = 1; i <= currentPage + 2; i++) {
    pageNumbers.push(i);
  }

  /*
  const prevPgn = []
    for (let i = currentPage; i <= currentPage + 1; i ++) {
      prevPgn.push(i)
  }*/

  return (
    <div className="Pages" style={{marginTop:"20px"}}>
      <Pagination className="justify-content-center">
        <Pagination.Item
        onClick={() => prevPage()}
        disabled={firstPage}>
          {"<"}
        </Pagination.Item>

        <Pagination.Item
        onClick={() => prevPage()}
        hidden={firstPage}>
          {currentPage - 1}
        </Pagination.Item>

          <Pagination.Item>
            Side {currentPage}
          </Pagination.Item>

          <Pagination.Item
        onClick={() => nextPage()}
        hidden={lastPage}>
          {currentPage + 1}
        </Pagination.Item>


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
