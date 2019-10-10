import React from 'react';
import styled from 'styled-components';

// Assets
import ProductPlaceholder from '../assets/placeholder/pkg-br-04-sq2_2048x.jpg';

// Style
import {TextMedium} from '../components/Typography';

export const ListItemInfo = props => {
  return (
    <React.Fragment>
      <div
        className="col-3"
        onClick={() =>
          props.redirectToItemPage(props.campaignId, props.item.id)
        }>
        <StyledImage src={ProductPlaceholder} alt="item" />
      </div>
      <div
        className="col-7"
        onClick={() =>
          props.redirectToItemPage(props.campaignId, props.item.id)
        }>
        <StyledTextMedium>{props.item.name || 'No Name'}</StyledTextMedium>
        <StyledTextMedium>$ {props.item.price}</StyledTextMedium>
      </div>
    </React.Fragment>
  );
};

/*
** Styled Components
*/
const StyledImage = styled.img`
  width: 100%;
`;

const StyledTextMedium = styled(TextMedium)`
  margin: 0 0 4px 0;
`;
