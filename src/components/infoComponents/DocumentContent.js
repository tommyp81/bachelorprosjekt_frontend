import React, { useContext, useEffect, useState } from 'react';
import { Button, Row, Col, Card } from "react-bootstrap";
import { host } from '../../App';
import { UserContext } from '../../UserContext';
import FileLink from '../FileLink';
import moment from 'moment'
import "./Kunnskapsportalen.css";
import InfoTopics from './InfoTopics';
import Pages from '../forumComponents/Pages';
import AddDocument from './AddDocument';
import Search from '../Search';
import SortContent from './SortContent';
import { BsFileEarmarkText } from 'react-icons/bs';

const DocumentContent = ({ infoTopics }) => {

  const { user } = useContext(UserContext)

  const [infoTopic, setInfoTopic] = useState("")

  const [searchFilter, setSearchFilter] = useState("")

  const [documentContent, setDocumentContent] = useState([])
  const [currentDocumentsPage, setcurrentDocumentsPage] = useState(1);
  const [documentsPerPage, setDocumentsPerPage] = useState(10);
  const [totalDocumentsPages, setTotalDocumentsPages] = useState(0)
  const [documentsSort, setDocumentsSort] = useState({ sortOrder: "Asc", sortType: "id" })

  const documentsURL = searchFilter ?
    `SearchDocuments?query=${searchFilter}&?infoTopicId=${infoTopic}
    &pageNumber=${currentDocumentsPage}&pageSize=${documentsPerPage}
    &sortOrder=${documentsSort.sortOrder}&sortType=${documentsSort.sortType}`
    :
    `GetDocuments?infoTopicId=${infoTopic}&pageNumber=${currentDocumentsPage}
    &pageSize=${documentsPerPage}&sortOrder=${documentsSort.sortOrder}
    &sortType=${documentsSort.sortType}`



  useEffect(async () => {
    const res = await fetch(host + documentsURL, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
    const documentsData = await res.json()
    setDocumentContent(documentsData.data)
    setTotalDocumentsPages(documentsData.totalPages)
  }, [infoTopic, currentDocumentsPage, documentsSort, searchFilter])

  const deleteDocument = async (id) => {
    const res = await fetch(host + `DeleteDocument/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
    if (res.ok)
      setDocumentContent(documentContent.filter(d => d.id != id))
    else
      alert("Feil ved sletting av dokument")
  }

  return (
    <div className="DocumentContent">
      <Row>
        <Col>
          <div className="top">

            <InfoTopics setInfoTopic={setInfoTopic} infoTopics={infoTopics} />

          </div>
        </Col>
      </Row>
      <div className="float-right">
        {user.admin &&
          <AddDocument infoTopics={infoTopics} setDocuments={setDocumentContent} />
        }
      </div>
      <div className="w-50 d-flex justify-content-start">
        <Search setSearchValue={setSearchFilter} searchValue={searchFilter} placeholderText={"Søk..."} setCurrentPage={setcurrentDocumentsPage} />
        <SortContent isDocument={true} setSort={setDocumentsSort} />
      </div>
      {documentContent.map((mappedDocuments) => (
        <Card key={mappedDocuments.id}>
          <Card.Body>
            <Row>
              <Col>
                <div className="content">
                  {infoTopics.filter(infoTopics => (infoTopics.id === mappedDocuments.infoTopicId)).map((filteredTopics) => (
                    <p key={filteredTopics.id} className="toptext" style={{ color: "grey" }}>
                      Delt {moment(mappedDocuments.uploaded).calendar()} i {filteredTopics.title}
                    </p>
                  ))}
                  <div className="title">
                    <BsFileEarmarkText className="iconmobile" />{" "}
                    <FileLink fileId={mappedDocuments.id} />
                  </div><br />
                  <p>Klikk for å laste ned</p>
                  <div hidden={!user.admin}>
                    <Button variant="danger" size="sm" onClick={() => deleteDocument(mappedDocuments.id)}>Slett</Button>
                  </div>
                </div>
              </Col>
              <Col className="desktop"><BsFileEarmarkText style={{ height: "150px", width: "150px" }} className="icon" />

              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
      {totalDocumentsPages > 1 &&
        <Pages
          currentPage={currentDocumentsPage}
          totalPages={totalDocumentsPages}
          setCurrentPage={setcurrentDocumentsPage}
        />
      }
    </div>
  )
}

export default DocumentContent
