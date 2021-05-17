import React from "react";
import "./Kunnskapsportalen.css";
import { Dropdown } from "react-bootstrap";

const SortContent = ({ setSort, isDocument }) => {
  // video and document
  const sortByTopic = () => {
    setSort({ sortOrder: "Asc", sortType: "infoTopicId" });
  };

  const sortByIdAsc = () => {
    setSort({ sortOrder: "Asc", sortType: "id" });
  };

  const sortByIdDesc = () => {
    setSort({ sortOrder: "Desc", sortType: "id" });
  };

  // document
  const sortByNewest = () => {
    setSort({ sortOrder: "Desc", sortType: "uploaded" });
  };
  const sortByOldest = () => {
    setSort({ sortOrder: "Asc", sortType: "uploaded" });
  };
  const sortByFileSizeDesc = () => {
    setSort({ sortOrder: "Desc", sortType: "filesize" });
  };
  const sortByFileSizeAsc = () => {
    setSort({ sortOrder: "Asc", sortType: "filesize" });
  };

  const sortByFileType = () => {
    setSort({ sortOrder: "Asc", sortType: "fileType" });
  };

  const sortByFileName = () => {
    setSort({ sortOrder: "Asc", sortType: "filename" });
  };

  // video
  const sortByTitle = () => {
    setSort({ sortOrder: "Asc", sortType: "title" });
  };

  return (
    <div className="SortContent">
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic" role="sortcontent">
          Sorter:
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="" onClick={() => sortByIdAsc()}>
            Id Stigende
          </Dropdown.Item>
          <Dropdown.Item href="" onClick={() => sortByIdDesc()}>
            Id Synkende
          </Dropdown.Item>
          <Dropdown.Item href="" onClick={() => sortByTopic()}>
            Kategori
          </Dropdown.Item>
          {!isDocument && (
            <Dropdown.Item href="" onClick={() => sortByTitle()}>
              Tittel
            </Dropdown.Item>
          )}
          {isDocument && (
            <Dropdown.Item href="" onClick={() => sortByNewest()}>
              Nyeste til eldste
            </Dropdown.Item>
          )}
          {isDocument && (
            <Dropdown.Item href="" onClick={() => sortByOldest()}>
              Eldste til nyeste
            </Dropdown.Item>
          )}
          {isDocument && (
            <Dropdown.Item href="" onClick={() => sortByFileSizeDesc()}>
              Filstørrelse synkende
            </Dropdown.Item>
          )}
          {isDocument && (
            <Dropdown.Item href="" onClick={() => sortByFileSizeAsc()}>
              Filstørrelse stigende
            </Dropdown.Item>
          )}
          {isDocument && (
            <Dropdown.Item href="" onClick={() => sortByFileType()}>
              Filtype
            </Dropdown.Item>
          )}
          {isDocument && (
            <Dropdown.Item href="" onClick={() => sortByFileName()}>
              Filnavn
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default SortContent;
