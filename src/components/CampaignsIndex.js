import React from 'react';
import styled from 'styled-components';

// Assets
import CampaignPlaceholder from '../assets/placeholder/pkg-cs-01-sq2_2048x.jpg';

// React Components
import {CampaignRemainTime} from './CampaignRemainTime';

// Style
import {DisplayXSmall, TextXLarge} from './Typography';

export const CampaignsIndex = props => {
  if (!props.campaign) return null;
  return (
    <StyledCampaign key={props.campaign.id} className="col-md-6 col-lg-4">
      <StyledCampaignImage
        src={CampaignPlaceholder}
        onClick={() => props.redirectToCampaignPage(props.campaign.id)}
      />
      <StyledCampaignHeader className = "row nested align-items-center">
        <div className = "col-9">
          <TextXLarge>
            {props.campaign.name || 'Campaign Name'}
          </TextXLarge>
        </div>
        <div className = "col-3">
          <StyledDisplayXSmall>
            {' '}
            {props.campaign.listItems.length} ITEMS{' '}
          </StyledDisplayXSmall>
        </div>
      </StyledCampaignHeader>
      <div className = "row nested align-items-center">
        <div className = "col-12">
          {CampaignRemainTime(props.campaign.expiration)}
        </div>

        {/* NOTE: Take out Minimum order with progress bar */}
        {/*
        <div className = "col-6">
          <StyledTextMedium>
            $ {props.campaign.fulfillReq} to Min Order
          </StyledTextMedium>
        </div>
        */}
      </div>
    </StyledCampaign>
  );
};

// Styled components
const StyledCampaign = styled.div`
  margin: 0 0 40px 0;
`;

const StyledCampaignImage = styled.img`
  width: 100%;
  margin-bottom: 16px;
`;

const StyledCampaignHeader = styled.div`
  margin: 0 0 6px 0;
`;

const StyledDisplayXSmall = styled(DisplayXSmall)`
  text-align: right;
`;
