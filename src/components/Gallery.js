import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Button } from '@mui/material';
import { Card } from 'react-bootstrap';
import '../styles/Gallery.css';

const items = [
  {
    name: 'Random Name #1',
    description: 'Probably the most random thing you have ever seen!',
  },
  {
    name: 'Random Name #2',
    description: 'Hello World!',
  },
  {
    name: 'Random Name #3',
    description: 'Hello World!',
  },
  {
    name: 'Random Name #4',
    description: 'Hello World!',
  },
  {
    name: 'Random Name #5',
    description: 'Hello World!',
  },
  {
    name: 'Random Name #6',
    description: 'Hello World!',
  },
  {
    name: 'Random Name #7',
    description: 'Hello World!',
  },
];

function Row({ rowItems, rowIndex, rowLength }) {
  return (
    <div className="cards-container">
      {rowItems.map((item, i) => {
        return (
          <Card key={rowIndex * rowLength + i}>
            <Card.Header>{item.name}</Card.Header>
            <Card.Body>
              <p>{item.description}</p>
            </Card.Body>
            <Card.Footer>
              <Button className="CheckButton">Check it out!</Button>
            </Card.Footer>
          </Card>
        );
      })}
    </div>
  );
}

function groupInRows(items, rowLength) {
  const rows = [];
  for (let i = 0; i < items.length; i += rowLength) {
    rows.push(items.slice(i, i + rowLength));
  }
  return rows;
}

function Gallery() {
  const rowLength = 3;
  const rows = groupInRows(items, rowLength);

  return (
    <Carousel
      autoPlay={false}
      navButtonsAlwaysVisible={true}
      className="carousel-element"
    >
      {rows.map((row, r) => {
        return (
          <Row key={r} rowItems={row} rowIndex={r} rowLength={rowLength} />
        );
      })}
    </Carousel>
  );
}

export default Gallery;
