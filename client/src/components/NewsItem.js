import React, { useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const NewsItem = (props) => {
  const { title, description, source } = props.data;
  const [score, setScore] = useState('');
  // const [extract, setExtract] = useState([]);

  const handleMonkeyLearn = (e) => {
    e.preventDefault();
    const des = { msg: description };
    axios.post(`/api/v1/mashup/analysis`, des).then((data) => {
      setScore(data.data.dataSentiment[0]);
      props.extrKeyword(data.data.dataExtract);
    });
  };

  // console.log(score);
  // console.log(extract);

  // Handles the filter of industry dropdown function
  const handleExtractKeyChange = (e) => {
    e.preventDefault();
    props.extrKeyword(e.target.value);
  };

  return (
    <div className="m-2">
      <Card>
        <Card.Header as="h5">{title}</Card.Header>
        <Card.Body>
          <Card.Title>Article Content Summary</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Button onClick={(e) => handleMonkeyLearn(e)} variant="primary">
            Show Score
          </Button>
          <hr />
          {/* score.tag_name & score.confidence  */}
          <span>Polarity: {score.tag_name} opinion</span>
          <br />
          <span>Confidence: {score.confidence * 100}% / 100%</span>
        </Card.Body>
      </Card>
      {/* <select onChange={handleExtractKeyChange}>
        <option key="empty">Select industry...</option>
        {extract.map((data) => {
          if (data !== undefined) {
            return (
              <option value={data.label} key={data.id}>
                {data.label}
              </option>
            );
          }
        })}
      </select> */}
    </div>

    // <div className="text-justify">
    //   <span>Title: </span>
    //   {title}
    //   <br />
    //   Description:{description}
    //   <button onClick={(e) => handleMonkeyLearn(e)}>Click me</button>
    //   {/* Score {score[0].tagname} */}
    //   {/* Score {score[0].tagname} */}
    //   <hr />
    // </div>
  );
};

export default NewsItem;
