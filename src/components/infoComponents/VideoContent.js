import React, { useContext, useEffect, useState } from 'react';
import { Button, Row, Col, Card, Image, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { host } from '../../App';
import { UserContext } from '../../UserContext';
import moment from 'moment'
import "./Kunnskapsportalen.css";
import InfoTopics from './InfoTopics';
import Pages from '../forumComponents/Pages';
import SearchContent from './SearchContent';
import AddVideo from './AddVideo';

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

  const videoURL = `videos?infoTopicId=${infoTopic}&pageNumber=${currentVideosPage}&pageSize=${videosPerPage}&sortOrder=${videoSort.sortOrder}&sortType=${videoSort.sortType}`

  useEffect(async () => {
    const res = await fetch(host + videoURL)
    const videosData = await res.json()
    setVideoContent(videosData.data)
    setTotalVideosPages(videosData.totalPages)
  }, [infoTopic, currentVideosPage, videoSort])

  const handleShow = (index) => setShow(index);
  const handleClose = () => setShow(null);
  const deleteVideo = async (videoId, postId) => {
    const res = await fetch(host + `videos/${videoId}`, {
      method: 'DELETE'
    })
    if (res.ok) {
      setVideoContent(videoContent.filter(v => v.id != videoId))
      deletePost(postId)
    } else {
      alert("Feil ved sletting av Video")
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
        {user &&
          <AddVideo infoTopics={infoTopics} setVideos={setVideoContent} addPost={addPost} />
        }
      </div>
      <SearchContent setSearchInput={setSearchFilter} placeholderText={'Søk i Videoer'} />
      {videoContent.map((filteredVideos, i) => (
        <>
          <Card key={i}
            onClick={() => handleShow(i)}
            style={{ cursor: "pointer" }}>
            <Card.Body>
              <Row>
                <Col md={5}>
                  <div className="content">
                    {infoTopics.filter(infoTopics => (infoTopics.id === filteredVideos.infoTopicId)).map((filteredTopics, i) => (
                      <p className="toptext" style={{ color: "gray" }}>Delt {moment(filteredVideos.uploaded).calendar()} i {filteredTopics.title} </p>))}
                    <div className="title">{filteredVideos.title}</div><br />
                    <p>Klikk for å se video</p>
                    <div hidden={!user.admin}>
                      <Button variant="danger" size="sm" value={filteredVideos.id} onClick={() => deleteVideo(filteredVideos.id, filteredVideos.postId)}>Slett</Button>
                    </div>
                  </div>
                </Col>
                <Col md={7}>
                  <div className="contentimg">
                    <Image src={`https://img.youtube.com/vi/${filteredVideos.youTubeId}/0.jpg`} />

                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </>
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
              allowfullscreen="allowfullscreen"
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
