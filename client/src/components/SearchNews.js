import React, { useState } from 'react';
import axios from 'axios';
import spinner from '../assets/spinner.gif';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

const SearchNews = (props) => {
  const [keyTerm, setKeyTerm] = useState('');
  const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyTerm == '') {
      setError(e);
    } else {
      const search = { msg: keyTerm };
      axios.post(`/api/v1/mashup/news`, search).then((data) => {
        if (data.data.msg.articles.length != null) {
          props.search(data);
        } else {
          setError(e);
          // setLoading(false);
        }
      });
    }
  };

  // when API cannot be fetched
  // if (loading)
  //   return (
  //     <div>
  //       <img
  //         src={spinner}
  //         alt="Loading..."
  //         style={{ width: '200px', margin: '40px auto', display: 'block' }}
  //       />
  //     </div>
  //   );
  if (error) {
    return (
      <div className="px-6 py-4 bg-red-100 min-h-screen text-center">
        <h1 className="text-3xl font-bold mb-4">
          Oops...No related news found. Please try again.
        </h1>
        <a href="/" className="btn btn-primary">
          Try Again
        </a>
      </div>
    );
  }

  return (
    <div>
      {/* <form onSubmit={(e) => handleSubmit(e)}>
        <InputGroup>
          <InputGroup.Prepend
            value={keyTerm}
            onChange={(e) => setKeyTerm(e.target.value)}
          >
            <Button
              as="input"
              type="submit"
              value="Submit"
              variant="outline-secondary"
            ></Button>
          </InputGroup.Prepend>
          <FormControl aria-describedby="basic-addon1" />
        </InputGroup>
      </form> */}

      <form onSubmit={(e) => handleSubmit(e)}>
        <input value={keyTerm} onChange={(e) => setKeyTerm(e.target.value)} />
        <Button as="input" type="submit" value="Submit" />
        {/* <input type="Submit" value="Submit" /> */}
      </form>
    </div>
  );
};

export default SearchNews;
