import styled from "styled-components";

export const Container = styled.div`
  width: ${({ width }) => (!!width ? width : "1600px")};
  max-width: 100%;
  padding: ${({ padding }) => (padding ? padding : "0 10px")};
  margin: 0 auto; 
  box-sizing: border-box; 
`;

export const ContainerBody = styled.div` 
  padding: ${({ padding }) => (padding ? padding : "10px")};
`;
