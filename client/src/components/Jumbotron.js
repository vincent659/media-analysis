import React from 'react';
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
import styled from 'styled-components';
import equal from '../assets/equal.jpg';

const Styles = styled.div`
  .jumbo {
    background: url(${equal}) no-repeat fixed bottom;
    background-size: cover;
    color: #cccccc;
    height: 300px;
    position: relative;
    z-index: -2;
  }

  .overlay {
    background-color: #000;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
`;

/* Jumbotron for calling extra attention on the header */
export const Jumbotron = () => {
  return (
    <Styles>
      <Jumbo fluid className="jumbo">
        <div className="overlay"></div>
        <Container>
          <h1 className="text-left">Media Analysis</h1>
          <p className="text-justify">
            In media studies, mass communication, media psychology,
            communication theory, and sociology, media influence and media
            effects are topics relating to mass media and media culture's
            effects on individual or an audience's thoughts, attitudes, and
            behavior.
          </p>
          <p className="text-justify">
            Whether it is written, televised, or spoken, mass media reaches a
            large audience. Mass media's role and effect in shaping modern
            culture are central issues for study of culture.
          </p>
        </Container>
      </Jumbo>
    </Styles>
  );
};
