import React, { useState } from 'react'
import "./Forum.css"
import { Form } from "react-bootstrap"

const SearchPosts = ({posts}) => {
    
    const [input, setInput] = useState("")

    return (
        <div className="SearchPosts">
            <Form>
                <Form.Group>
                    <Form.Control type="input" placeholder="Søk i poster..."/>
                </Form.Group>
            </Form>
        </div>
    )

}

export default SearchPosts