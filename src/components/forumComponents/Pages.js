import React from "react"
import { Pagination } from "react-bootstrap"
import "./Pages.css";

const Pages = ({totalPages, currentPage, setCurrentPage}) => {

  const pageNumbers = []
  for (let i = 1; i <= currentPage + 2; i++) {
    pageNumbers.push(i);
  }

  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  const lastPage = currentPage === totalPages
  const firstPage = currentPage === 1;

  const goToLast = () => setCurrentPage(totalPages);
  const goToFirst = () => setCurrentPage(1);


  const handleScroll = () => {
    window.scroll({top:0,behavior:'smooth'})
  }

  return (
    <div className="Pages" style={{marginTop:"20px"}}>
      <Pagination>
        <Pagination.Item
        onClick={() => {goToFirst(); handleScroll()}}
        hidden={firstPage}>
          {"<<"}
        </Pagination.Item>
      
        <Pagination.Item
        onClick={() => {prevPage(); handleScroll()}}
        hidden={firstPage}>
          {"<"}
        </Pagination.Item>

        <Pagination.Item
        onClick={() => {prevPage(); handleScroll()}}
        hidden={firstPage}>
          {currentPage - 1}
        </Pagination.Item>

          <Pagination.Item>
            Side {currentPage}
          </Pagination.Item>

          <Pagination.Item
        onClick={() => {nextPage(); handleScroll()}}
        hidden={lastPage}>
          {currentPage + 1}
        </Pagination.Item>


        <Pagination.Item
        onClick={() => {nextPage(); handleScroll()}}
        hidden={lastPage}>
          {">"}
        </Pagination.Item>

        <Pagination.Item
        onClick={() => {goToLast(); handleScroll()}}
        hidden={lastPage}>
          {">>"}
        </Pagination.Item>
        
      </Pagination>
      </div>
  )
}
export default Pages
