import React from "react";
import { useEffect, useState } from "react";
import { BookCard } from "./BookCard";
import styled, { css } from "styled-components";

export const Grid = styled.div`
  display: grid;
  width: 100%;
  margin: auto;
  grid-template-columns: repeat(3, 1fr);
`;

const Books = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    // make a GET request to http://localhost:8080/books to get all the books data
    const getData = async () => {
      let res = await fetch("http://localhost:8080/books");
      let data = await res.json();

      
      setData(data);
    };
    getData();
  }, []);

  return (
    <>
      <h1>Books</h1>
      <Grid data-testid="books-container">
        {/* {!!data && 
          // map thorugh the data and use <BookCard/> component to display each book
          
          } */}
        {data.map((ele) => {
          return <BookCard key={ele.id} {...ele} />;
        })}
      </Grid>
    </>
  );
};
export default Books;