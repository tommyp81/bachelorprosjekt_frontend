import React, { useEffect, useState } from 'react';
import {Button, Tabs, Tab, Accordion, Form} from "react-bootstrap";
import "./Kunnskapsportalen.css";


const InfoTopics = ({ infoTopics, setInfoTopic}) => { 

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  // useEffect(() => {
  //   return(() => allContent())
  // })
    
  const filterContent = (e) => {
    let value = e.target.value;
    let title = e.target.getAttribute("title")
    let desc = infoTopics.find((infoTopics) => infoTopics.id === Number(value)).description;

    setTitle(title)
    setDescription(desc)
    setInfoTopic(value)
  }

  const allContent = () => {
    setTitle("Alle kategorier")
    setDescription("")
    setInfoTopic("")
  }

	return (
    <div className="InfoTopics"> 
        <Button onClick={allContent}>Alle kategorier</Button>
    {infoTopics.map((mappedInfoTopics, i) => ( 
        <Button key={i} onClick={filterContent} value={mappedInfoTopics.id} title={mappedInfoTopics.title}>
            {mappedInfoTopics.title}
        </Button> ))}
        <div className="topictitle">{!title ? "Alle kategorier" : title}</div>
        <div className="desc">{!description ? "" : description} </div>
    </div>
  )
}

export default InfoTopics;