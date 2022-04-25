import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Input } from "./Login";

// add style for form
export const Form = styled.form``;
// add style for text area
export const Textarea = styled.textarea`
  background: #9bbabd;
  width: 80%;
  padding: 10px 4px;
  font-size: 20px;
  border: none;
  margin: 10px;
  cursor: pointer;
`;

export const EditBookData = () => {
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  const handleUpdate = async (e) => {
    e.preventDefault();
    // make a PATCH request to http://localhost:8080/books/${id} and update thubnail and long description fields
    // on successfull request navigate to previous page
    try {
      let res = await fetch(`http://localhost:8080/books/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          thumbnailUrl,
          longDescription,
        }),
      });
      navigate("/books");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form onSubmit={handleUpdate}>
        <Input
          data-testid="update-form-thumbnail"
          placeholder="Enter updated thumbnail url"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
        />
        <Textarea
          data-testid="update-form-description"
          placeholder="Update long Description"
          value={longDescription}
          onChange={(e) => setLongDescription(e.target.value)}
        />
        <Input dat-testid="update-form-submit" type="submit" value="Update" />
      </Form>
    </>
  );
};