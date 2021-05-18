import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./Kunnskapsportalen.css";

const InfoTopics = ({ infoTopics, setInfoTopic }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const filterContent = (e) => {
    let value = e.target.value;
    let title = e.target.getAttribute("title");
    let desc = infoTopics.find(
      (infoTopics) => infoTopics.id === Number(value)
    ).description;

    setTitle(title);
    setDescription(desc);
    setInfoTopic(value);
  };

  const allContent = () => {
    setTitle("Alle kategorier");
    setDescription("");
    setInfoTopic("");
  };

  return (
    <div className="InfoTopics">
      <Button onClick={allContent} role="allcategories">
        Alle kategorier
      </Button>
      {infoTopics.map((mappedInfoTopics, i) => (
        <Button
          key={i}
          onClick={filterContent}
          value={mappedInfoTopics.id}
          title={mappedInfoTopics.title}
          role={mappedInfoTopics.title + " topic"}
        >
          {mappedInfoTopics.title}
        </Button>
      ))}
      <div className="topictitle">{!title ? "Alle kategorier" : title}</div>
      <div className="desc">{!description ? "" : description} </div>
    </div>
  );
};

export default InfoTopics;
