import React from 'react';
import styled from 'styled-components';

// Assets
import CampaignPlaceholder from '../assets/placeholder/pkg-cs-01-sq2_2048x.jpg';

// React Components
import {CampaignRemainTime} from './CampaignRemainTime';

// Style
import {DisplayXSmall, TextXLarge, TextMedium} from './Typography';

export const HostCampaignsIndex = props => {
  if (!props.campaign) return null;
  return (
    <StyledCol key={props.campaign.id} className="col-md-6">
      <StyledImage
        src={CampaignPlaceholder}
        onClick={() => props.redirectToCampaignPage(props.campaign.id)}
      />
      <StyledDivRow>
        <StyledTextXLarge>
          {props.campaign.name || 'Campaign Name'}
        </StyledTextXLarge>
        <StyledDisplayXSmall>
          {' '}
          {props.campaign.listItems.length} ITEMS{' '}
        </StyledDisplayXSmall>
      </StyledDivRow>
      <StyledDivRow>
        <StyledTextMediumLeft>
          {CampaignRemainTime(props.campaign.expiration)}
        </StyledTextMediumLeft>

        <StyledTextMediumRight>
          $ {props.campaign.fulfillReq} Min Order
        </StyledTextMediumRight>
      </StyledDivRow>
    </StyledCol>
  );
};

// Styled components
const StyledCol = styled.div`
  margin: 0 0 40px 0;
`;
const StyledDivRow = styled.div`
  display: flex;
  direction: row;
  align-items: center;
`;
const StyledImage = styled.img`
  width: 100%;
  margin-bottom: 16px;
`;

const StyledTextMediumLeft = styled(TextMedium)`
  padding: 0 8px 0 0;
  margin: 0;
  text-align: left;
  flex: 1;
`;
const StyledTextMediumRight = styled(TextMedium)`
  padding: 0 0 0 8px;
  margin: 0;
  text-align: right;
  flex: 1;
`;
const StyledTextXLarge = styled(TextXLarge)`
  margin: 0;
  flex: 3;
`;

const StyledDisplayXSmall = styled(DisplayXSmall)`
  margin: 0;
  text-align: right;
  flex: 1;
`;
