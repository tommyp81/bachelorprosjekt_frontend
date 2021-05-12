import React, { useContext, useEffect, useState } from "react";
import {
  Col,
  Button,
  Container,
  Dropdown,
  Row,
} from "react-bootstrap";
import Topics from "./Topics.js";
import NewPost from "./NewPost.js";
import Pages from "./Pages.js";
import "./Forum.css";
import moment from "moment";
import Feed from "./Feed.js";

import SortItems from "./SortItems";
import { UserContext } from "../../UserContext";
import SpinnerDiv from "./SpinnerDiv.js";
import { host } from "../../App.js";
import Search from "../Search";

const Forum = ({
  addPost,
  topics,
  subtopics,
  users,
  history,
}) => {

  const [filteredPosts, setFilteredPosts] = useState([]);

  const [topicFocus, setTopicFocus] = useState("");
  const [subtopicFocus, setSubTopicFocus] = useState("");

  const [topicTitle, setTopicTitle] = useState("");
  const [subTopicDesc, setSubTopicDesc] = useState("");
  const [subTopicTitle, setSubTopicTitle] = useState("");

  const [searchValue, setSearchValue] = useState("")
  const { user } = useContext(UserContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(null)

  const [sort, setSort] = useState({ sortOrder: "Desc", sortType: "Date" })

  const [loading, setLoading] = useState(false);

  const postsURL = searchValue ?
    `posts/search?query=${searchValue}&subTopicId=${subtopicFocus}&pageNumber=${currentPage}&pageSize=${postsPerPage}&sortOrder=${sort.sortOrder}&sortType=${sort.sortType}` :
    `posts?subTopicId=${subtopicFocus}&pageNumber=${currentPage}&pageSize=${postsPerPage}&sortOrder=${sort.sortOrder}&sortType=${sort.sortType}`

  useEffect(async () => {
    setLoading(true)
    const res = await fetch(host + postsURL)
    const posts = await res.json()
    setFilteredPosts(posts.data)
    setTotalPages(posts.totalPages)
    setLoading(false)
    return (() => {
      setFilteredPosts([])
      setTotalPages(null)
    })
  }, [subtopicFocus, currentPage, postsPerPage, sort, searchValue]);

  const handleScroll = () => {
    window.scroll({ top: 0, behavior: "smooth" })
  }

  const onTopClick = (key) => {
    if (key) {
      setTopicFocus(key);
      setSubTopicFocus("");
      setSubTopicTitle("");
      setSubTopicDesc("");
      if (key === "0") {
        setTopicTitle("Alle kategorier");
        setSubTopicFocus("");
        setSubTopicTitle("");
        setSubTopicDesc("");
      } else {
        let value = topics.find((t) => t.id === Number(key))?.title;
        setTopicTitle(value);
      }
      setCurrentPage(1);
    }
  };

  const onSubClick = (e) => {
    let subTop = e.target.value;
    let title = e.target.getAttribute("title");
    let desc = subtopics.find((s) => s.id === Number(subTop)).description;
    setSubTopicTitle(title);
    setSubTopicFocus(subTop);
    setSubTopicDesc(desc);
    setCurrentPage(1);
  };


  return (
    <div className="Forum mt-5">
      <Container className="body">
        <Row xs={1} sm={1} lg={2}>
          <Col lg={3}>
            <div className="desktopsearch">
              <Search setSearchValue={setSearchValue} searchValue={searchValue} placeholderText={"Søk..."} setCurrentPage={setCurrentPage} />
            </div>
            <Topics
              topics={topics}
              subtopics={subtopics}
              topClick={onTopClick}
              subClick={onSubClick}
              topicFocus={topicFocus}
            />
          </Col>

          <Col lg={9}>
            <Container className="top">
              <div className="topictext">
                <h2>
                  {!topicTitle ? "Alle kategorier" : topicTitle}
                  {!subTopicTitle ? "" : <>&nbsp;-&nbsp;{subTopicTitle}</>}
                </h2>
                <p>{!subTopicDesc ? "" : subTopicDesc}</p>
              </div>

              <div className="newpost">
                <NewPost
                  subtopicTitle={subTopicTitle}
                  subtopic={subtopicFocus}
                  topicFocus={topicFocus}
                  add={addPost}
                  history={history}
                />
              </div>

              <div className="sortposts">
                <SortItems
                  setSort={setSort}
                  isPost={true}
                />
              </div>

              <div className="mobilesearch">
                <Search setSearchValue={setSearchValue} searchValue={searchValue} placeholderText={"Søk..."} setCurrentPage={setCurrentPage} />
              </div>
            </Container>

            <Container className="main">
              {filteredPosts &&
                <Feed
                  topic={topics}
                  subtopic={subtopics}
                  // maxLength={currentPosts.length}
                  posts={filteredPosts}
                  loading={loading}
                />
              }
            </Container>

            <Container className="bot">
              <div className="pages">
                {totalPages > 1 &&
                  <Pages
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                  />
                }
              </div>
              <div className="postsperpage">
                <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    {postsPerPage} per side:
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {[10, 25, 50, 100].map((pageSize, i) => (
                      <Dropdown.Item
                        key={i}
                        value={pageSize}
                        onSelect={() => { setPostsPerPage(pageSize); setCurrentPage(1); handleScroll() }}
                      >
                        Vis {pageSize} poster per side
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Forum;
