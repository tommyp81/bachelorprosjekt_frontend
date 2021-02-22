import React, { Component } from "react";
import { Pagination } from "react-bootstrap";

class Pages extends Component {
   
    render() {
        const { postsPerPage, totalPosts, paginate, nextPage, prevPage } = this.props;
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
            <div className="Page">
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
}

export default Pages;