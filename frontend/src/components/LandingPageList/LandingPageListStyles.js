import styled from "styled-components";

export const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: white};
  color: black;

  font-size: 1em;
  font-weight: bold;
  font-family: Helvetica Neue, Helvetica, sans-serif;

  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid  #FFC541;
  border-radius: 28px;
  width: 140px;
  outline: none;
`;

export const ListImg = styled.img`
  width: 350px;
  padding: 5px 5px 5px 5px;
  &:hover
  {
    box-shadow: 12px 12px 0px #118678;
  }
  @media only screen and (max-width: 600px) {
    width: 200px;
  }
`;
