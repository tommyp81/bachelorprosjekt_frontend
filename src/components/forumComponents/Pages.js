import React from "react"
import { Pagination, Dropdown } from "react-bootstrap"
import "./Pages.css";

const Pages = ({postsPerPage, totalPosts, paginate, nextPage, prevPage, currentPage, firstPage, lastPage, goToFirst, goToLast}) => {

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
      <Pagination>
        <Pagination.Item
        onClick={() => goToFirst()}
        hidden={firstPage}>
          {"<<"}
        </Pagination.Item>
      
        <Pagination.Item
        onClick={() => prevPage()}
        hidden={firstPage}>
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
        hidden={lastPage}>
          {">"}
        </Pagination.Item>

        <Pagination.Item
        onClick={() => goToLast()}
        hidden={lastPage}>
          {">>"}
        </Pagination.Item>
        
      </Pagination>
      </div>
  )
}
export default Pages
