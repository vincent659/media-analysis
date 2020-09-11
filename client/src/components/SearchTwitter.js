import React, { useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

const SearchTwitter = (props) => {
  const [tweets, setTweets] = useState([]);
  //   const [extract, setExtract] = useState([]);

  let temp = props.search;
  //   console.log(temp);

  const handleTwitter = (e) => {
    // console.log(e.target.value);
    e.preventDefault();
    const search = { msg: e.target.value };
    // console.log(search);

    axios.post(`/api/v1/mashup/tweets`, search).then((data) => {
      //   console.log(data);
      //   console.log(data.data.statuses.map((d) => d.text));
      setTweets(data.data.statuses);
    });
  };
  console.log(tweets);

  //   const search = { msg: props.search };
  //   if (props.search != null) {
  //     axios.post(`/api/v1/mashup/tweets`, search).then((data) => {
  //       console.log(data);
  //     });
  //   }

  return (
    <div>
      <h6 className="mb-4 text-left">
        Step 2: Select one key relevant phrase extracted to search for public
        opnions on twitter
      </h6>
      <select onChange={handleTwitter} className="mb-4">
        <option key="empty">Select key term...</option>
        {temp.map((data) => {
          if (data !== undefined) {
            return (
              <option value={data.label} key={data.id}>
                {data.label}
              </option>
            );
          }
        })}
      </select>

      {tweets.map((i, index) => (
        <Card className="m-2" key={index}>
          <Card.Header as="h5">Tweet {index + 1} </Card.Header>
          <Card.Body>
            {/* <Card.Title>{index} Tweets</Card.Title> */}
            <Card.Text>{i.text}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default SearchTwitter;
