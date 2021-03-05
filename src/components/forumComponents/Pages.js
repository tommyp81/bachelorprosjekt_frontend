import React from "react"
import { Pagination } from "react-bootstrap"
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
        href="#" 
        onClick={() => prevPage()}>
          Forrige
        </Pagination.Item>
        
        <Pagination.Item className="page">
          Side {currentPage}
        </Pagination.Item>
        

        <Pagination.Item
        href="#" 
        onClick={() => nextPage()}>
          Neste
        </Pagination.Item>
      </Pagination>
      </div>
  )
}
export default Pages
