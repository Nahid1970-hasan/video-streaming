// Rating.js
import React from 'react';
import styled from 'styled-components';

const StarContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Star = styled.span`
  cursor: pointer;
  font-size: 24px; // Adjust the size of the stars
  color: ${(props) => (props.active ? '#340101' : '#fdfdfd')}; // Gold for active, grey for inactive
`;

const Rating = ({ rating }) => {
  return (
    <StarContainer>
      {[...Array(5)].map((_, index) => (
        <Star key={index} active={index < rating}>
          ★
        </Star>
      ))}
    </StarContainer>
  );
};

export default Rating;
