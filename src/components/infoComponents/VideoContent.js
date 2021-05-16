import React, { useContext, useEffect, useState } from 'react';
import { Button, Row, Col, Card, Image, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { host } from '../../App';
import { UserContext } from '../../App';
import moment from 'moment'
import "./Kunnskapsportalen.css";
import InfoTopics from './InfoTopics';
import Pages from '../forumComponents/Pages';
import AddVideo from './AddVideo';
import Search from '../Search';
import SortContent from './SortContent';

const VideoContent = ({ infoTopics, deletePost, addPost }) => {

  const { user } = useContext(UserContext)

  const [show, setShow] = useState(null);

  const [infoTopic, setInfoTopic] = useState("")
  const [searchFilter, setSearchFilter] = useState("")

  const [videoContent, setVideoContent] = useState([])
  const [currentVideosPage, setCurrentVideosPage] = useState(1);
  const [videosPerPage, setVideosPerPage] = useState(10);
  const [totalVideosPages, setTotalVideosPages] = useState(0)
  const [videoSort, setVideoSort] = useState({ sortOrder: "Asc", sortType: "id" })

  const videoURL = searchFilter ?
    `videos/search?query=${searchFilter}&?infoTopicId=${infoTopic}
    &pageNumber=${currentVideosPage}&pageSize=${videosPerPage}
    &sortOrder=${videoSort.sortOrder}&sortType=${videoSort.sortType}`
      :
    `videos?infoTopicId=${infoTopic}&pageNumber=${currentVideosPage}
    &pageSize=${videosPerPage}&sortOrder=${videoSort.sortOrder}&sortType=${videoSort.sortType}`

  useEffect(async () => {
    const res = await fetch(host + videoURL, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
    const videosData = await res.json()
    setVideoContent(videosData.data)
    setTotalVideosPages(videosData.totalPages)
  }, [infoTopic, currentVideosPage, videoSort, searchFilter])

  const handleShow = (index) => setShow(index);
  const handleClose = () => setShow(null);
  const deleteVideo = async (videoId, postId) => {
    const res = await fetch(host + `videos/${videoId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
    if (res.ok) {
      setVideoContent(videoContent.filter(v => v.id != videoId))
      deletePost(postId)
    } else {
      alert("Feil ved sletting av video")
    }

  }

  return (
    <div className="VideoContent">
      <Row>
        <Col>
          <div className="top">

            <InfoTopics setInfoTopic={setInfoTopic} infoTopics={infoTopics} />

          </div>
        </Col>
      </Row>
      <div className="float-right">
        {user.admin &&
          <AddVideo infoTopics={infoTopics} setVideos={setVideoContent} addPost={addPost} />
        }
      </div>
      <div className="w-50 d-flex justify-content-start">
        <div className="searchcontent">
        <Search setSearchValue={setSearchFilter} searchValue={searchFilter} placeholderText={"Søk..."} setCurrentPage={setCurrentVideosPage}/>
        </div>
        <SortContent isDocument={false} setSort={setVideoSort} />
      </div>
      <div className="searchmobile">
        <Search setSearchValue={setSearchFilter} searchValue={searchFilter} placeholderText={"Søk..."} setCurrentPage={setCurrentVideosPage}/>
      </div>
      {videoContent.map((filteredVideos, i) => (
          <Card key={i}>
            <Card.Body>
              <Row>
                <Col md={5}>
                  
                  <div className="content">
                    {infoTopics.filter(infoTopics => (infoTopics.id === filteredVideos.infoTopicId)).map((filteredTopics) => (
                      <p key={filteredTopics.id} className="toptext" style={{ color: "rgb(75, 75, 75)" }}>Delt {moment(filteredVideos.uploaded).calendar()} i {filteredTopics.title} </p>))}
                    <div className="title"><Link onClick={() => handleShow(i)} style={{textDecoration: "none", color: "black"}}>{filteredVideos.title}</Link></div><br />
                    <p>Klikk for å se video</p>
                    <div hidden={!user.admin}>
                      <Button variant="danger" size="sm" value={filteredVideos.id} onClick={() => deleteVideo(filteredVideos.id, filteredVideos.postId)}>Slett</Button>
                    </div>
                  </div>
                </Col>
                <Col md={7}>
                  <div className="contentimg" onClick={() => handleShow(i)} style={{cursor: "pointer"}}>
                    <Image src={`https://img.youtube.com/vi/${filteredVideos.youTubeId}/0.jpg`} alt={filteredVideos.title + " thumbnail"}/>

                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
      ))}
      {totalVideosPages > 1 &&
        <Pages
          currentPage={currentVideosPage}
          totalPages={totalVideosPages}
          setCurrentPage={setCurrentVideosPage}
        />
      }
      {videoContent.map((filteredVideos, i) => (
        <Modal key={i} show={show === i} onHide={handleClose} centered >
          <Modal.Header closeButton>
            <Modal.Title>{filteredVideos.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <iframe
              allowFullScreen="allowFullScreen"
              mozallowfullscreen="mozallowfullscreen"
              msallowfullscreen="msallowfullscreen"
              oallowfullscreen="oallowfullscreen"
              webkitallowfullscreen="webkitallowfullscreen"
              frameBorder="0"
              src={`https://www.youtube.com/embed/${filteredVideos.youTubeId}`} width="100%" height="300px" />
            <p>{filteredVideos.description}</p>
            <Link to={`/Forum/${filteredVideos.postId}`}>Diskuter i forumet</Link>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Lukk
            </Button>
          </Modal.Footer>
        </Modal>
      ))}

    </div>
  )
}

export default VideoContent
