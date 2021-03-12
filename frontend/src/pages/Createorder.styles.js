import styled from "styled-components";

export const Field = styled.div`
  padding-bottom: 25px;
  label {
    float: left;
    top: -12px;
    position: absolute;
    margin-left: 11px;
    background-color: #f0eeed;
    font-size: 12px;
    text-indent: 1px;
    font-weight: 700;
    color:#4A4746;
  }
  span{font-size: 12px;
    text-indent: 1px;
    font-weight: 700;
    color:#4A4746;}
`;

export const FieldInput = styled.input`
  background-color: #f0eeed;
  border: 3px solid #ffc541;
  &::placeholder {
    font-size: 12px;
  }
`;

export const FieldTextArea = styled.textarea`
  background-color: #f0eeed;
  border: 3px solid #ffc541;
  &::placeholder {
    font-size: 12px;
  }
`;

export const FieldSelect = styled.select`
  background-color: #f0eeed;
  border: 1px solid #ffc541 !important;
  font-size: 12px;
  &::placeholder {
    font-size: 12px;
  }
  option {
    font-size: 12px;
  }
`;
