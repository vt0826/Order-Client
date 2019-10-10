import React from 'react';
import styled from 'styled-components';

// Style
import {TextLarge} from '../components/Typography';


export const CartCampaignList = props => {
  return (
    <StyledCartCampaignItem
      onClick={() => props._listItems(props.campaign)}>
      <div className="row">
        <div className="col-10">
          <TextLarge>{props.cart[props.campaign].campaignName}</TextLarge>
        </div>
        <div className="col-2">{' > '}</div>
      </div>
    </StyledCartCampaignItem>
  );
};

/*
** Styled Components
*/

const StyledCartCampaignItem = styled.div`

  border-bottom:1px solid #D8D8D8;
`;
