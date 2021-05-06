import React, { Component, useState, useEffect, useContext } from 'react';
import {Link} from 'react-router-dom'

import {Row, Col, Container, Tabs, Tab, Card, Button, Image} from "react-bootstrap";
import InfoTopics from "./InfoTopics.js";
import UploadFile from "./UploadFile.js";
import VideoContent from "./VideoContent.js"
import DocumentContent from "./DocumentContent.js"
import SearchContent from "./SearchContent.js"
import "./Kunnskapsportalen.css";
import { UserContext } from '../../UserContext.js';
import { host } from '../../App.js';
import Pages from '../forumComponents/Pages.js';
 
const Kunnskapsportalen = ({ infoTopics, addPost, deletePost }) => {

  const {user} = useContext(UserContext);

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [searchFilter, setSearchFilter] = useState("")

  const [infoTopic, setInfoTopic] = useState("")
  const [tabKey, setTabKey] = useState('videos')

  // documents stuff
  const [documentContent, setDocumentContent] = useState([])
  const [currentDocumentsPage, setcurrentDocumentsPage] = useState(1);
  const [documentsPerPage, setDocumentsPerPage] = useState(10);
  const [totalDocumentsPages, setTotalDocumentsPages] = useState(0)
  const [documentsSort, setDocumentsSort] = useState({sortOrder: "Asc", sortType: "id"})

  const documentsURL = `GetDocuments?infoTopicId=${infoTopic}&pageNumber=${currentDocumentsPage}&pageSize=${documentsPerPage}&sortOrder=${documentsSort.sortOrder}&sortType=${documentsSort.sortType}`
  
  // Videos stuff
  // `videos?infoTopicId=${}&pageNumber=${}&pageSize=${}&sortOrder=${}&sortType=${}`
  const [videoContent, setVideoContent] = useState([])
  const [currentVideosPage, setCurrentVideosPage] = useState(1);
  const [videosPerPage, setVideosPerPage] = useState(10);
  const [totalVideosPages, setTotalVideosPages] = useState(0)
  const [videoSort, setVideoSort] = useState({sortOrder: "Asc", sortType: "id"})
  
  const videoURL = `videos?infoTopicId=${infoTopic}&pageNumber=${currentVideosPage}&pageSize=${videosPerPage}&sortOrder=${videoSort.sortOrder}&sortType=${videoSort.sortType}`

  useEffect( async () => {
    if(tabKey === 'videos') {
      const res = await fetch(host + videoURL)
      const videosData = await res.json()
      setVideoContent(videosData.data)
      setTotalVideosPages(videosData.totalPages)
    }
  }, [infoTopic, currentVideosPage, videoSort])

    // Documents
    // `GetDocuments?infoTopicId=${}&pageNumber=${}&pageSize=${}&sortOrder=${}&sortType=${}`
  useEffect( async () => {
    if(tabKey === 'documents') {
      const res = await fetch(host + documentsURL)
      const documentsData = await res.json()
      setDocumentContent(documentsData.data)
      setTotalDocumentsPages(documentsData.totalPages)
    }
    
  }, [infoTopic, currentDocumentsPage, documentsSort])

    // const currentVideoContent = videoContent.filter((videoContent) => {
    //   if (searchFilter === "") {
    //     return videoContent;
    //   } else if (
    //     videoContent.title.toLowerCase().includes(searchFilter.toLowerCase())
    //   ) {
    //     return videoContent;
    //   }
    // })
    
    // const currentDocumentContent = documentContent.filter((documentContent) => {
    //   if (searchFilter === "") {
    //     return documentContent;
    //   } else if (
    //     documentContent.fileName.toLowerCase().includes(searchFilter.toLowerCase())
    //   ) {
    //     return documentContent;
    //   }
    // })

  const filterContent = (e) => {
    let value = e.target.value;
    let title = e.target.getAttribute("title")
    let desc = infoTopics.find((infoTopics) => infoTopics.id === Number(value)).description;
    // setVideoContent(videos.filter(videos => videos.infoTopicId === Number(value)))
    // setDocumentContent(documents.filter(documents => documents.infoTopicId === Number(value)))
    setTitle(title)
    setDescription(desc)
    setSearchFilter("")
    setInfoTopic(value)
  }

  const allContent = () => {
    setTitle("Alle kategorier")
    setDescription("")
    setSearchFilter("")
    setInfoTopic("")
  } 


  return (
      <div className="Kunnskapsportalen">
            <Container style={{display: 'flex', flexDirection: 'column'}}>
              
              <h1>Kunnskapsportalen</h1><br/>
            <Row>
              <Col>
                <div className="top">
                  
                  <InfoTopics infoTopics={infoTopics} allContent={allContent} filterContent={filterContent}/>
                  
                </div>
                </Col>
            </Row>
              
            <Row>
              <Col lg={12} className="maincontent">
                
                <Tabs defaultActiveKey="videos" className="tabs" as={Button} variant="pills" activeKey={tabKey} onSelect={k => setTabKey(k)}>
                  {/* 
                <Tab eventKey="1" title="Vis alt" className="tab">
                    <div className="topictitle">{!title ? "Alle kategorier" : title}</div>
                    <div className="desc">{!description ? "" : description} </div>
                {user.admin &&
                  <UploadFile infoTopics={infoTopics} documents={documents} setVideos={setVideoContent} setDocuments={setDocumentContent} addPost={addPost}/>
                }
                    <SearchContent setSearchInput={setSearchFilter}/>
                    <Col xl={6} className="videocol"><VideoContent videos={videoContent} infoTopics={infoTopics} post={post} deletePost={deletePost} setVideoContent={setVideoContent}/></Col>
                    <Col xl={6} className="documentcol"><DocumentContent documents={documentContent} infoTopics={infoTopics} setDocumentContent={setDocumentContent}/></Col>
                    
                  </Tab>*/}
                  <Tab eventKey="videos" title="Videoer" className="tab">
                  <div className="topictitle">{!title ? "Alle kategorier" : title}</div>
                  <div className="desc">{!description ? "" : description} </div>
                  <div className="float-right">
                  {user &&
                  <UploadFile infoTopics={infoTopics} setVideos={setVideoContent} setDocuments={setDocumentContent} addPost={addPost}/>
                  }
                  </div>
                    <SearchContent setSearchInput={setSearchFilter} placeholderText={'Søk i Videoer'}/>
                    <VideoContent videos={videoContent} infoTopics={infoTopics} deletePost={deletePost} setVideoContent={setVideoContent}/>
                    {totalVideosPages > 1 &&
                      <Pages
                        currentPage={currentVideosPage}
                        totalPages={totalVideosPages}
                        setCurrentPage={setCurrentVideosPage}
                      />
                    }
                  </Tab>
                  <Tab eventKey="documents" title="Dokumenter" className="tab">
                  <div className="topictitle">{!title ? "Alle kategorier" : title}</div>
                  <div className="desc">{!description ? "" : description} </div>
                  <div className="float-right">
                  {user &&
                  <UploadFile infoTopics={infoTopics} setVideos={setVideoContent} setDocuments={setDocumentContent} addPost={addPost}/>
                  }
                  </div>
                    <SearchContent setSearchInput={setSearchFilter} placeholderText={'Søk i dokumenter'}/>
                    <DocumentContent infoTopics={infoTopics} documents={documentContent} setDocumentContent={setDocumentContent}/>
                    {totalDocumentsPages > 1 &&
                      <Pages
                        currentPage={currentDocumentsPage}
                        totalPages={totalDocumentsPages}
                        setCurrentPage={setcurrentDocumentsPage}
                      />
                    }
                  </Tab>
                  
                </Tabs>
              </Col>
      
    </Row>
    </Container>
          </div>
  );
}

export default Kunnskapsportalen;