import React from 'react';
import styled from 'styled-components';

// Style
import {
  DisplaySmall,
  DisplayXSmall,
  TextXLarge,
  TextLarge,
  TextMedium,
} from '../components/Typography';

export const CampaignInfo = props => {
  /* NOTE: Render Member taken out for now because there is no profile image */
  // const renderMember = () => {
  //   if (props.campaign.members.length > 0) {
  //     return props.campaign.members.map(member => (
  //       <div key={member}>
  //         <img src={user} height="42" width="42" alt="user" /> &nbsp;
  //         <p>{member.email}</p>
  //       </div>
  //     ));
  //   } else {
  //     return 'No Member Yet';
  //   }
  // };

  return (
    <React.Fragment>
      <DisplaySmall> {props.campaign.name || 'Sample Campaign'} </DisplaySmall>

      {/* Add end in time here */}

      <StyledHostInfo className="row nested align-items-center">
        {/* No user profile image upload for now. This have to go to Thyhive Firebase account*/}
        {/*
        <div className="col-2">
          <StyledHostImage src={user} alt="user"/>
        </div>
        */}
        <div className="col-12">
          <TextLarge> By {props.campaign.host.displayName} </TextLarge>
        </div>
      </StyledHostInfo>

      {/* NOTE: Invitation for member to invite other members to the campaign */}
      <StyledDisplayXSmall>Copy Invitation Link</StyledDisplayXSmall>

      <StyledTextXLarge>expiration time </StyledTextXLarge>

      <StyledTextXLarge>Pickup Address</StyledTextXLarge>
      <StyledTextMedium>{props.campaign.pickupAddress}</StyledTextMedium>

      <StyledTextXLarge>Pickup Time</StyledTextXLarge>
      <StyledTextMedium>{props.campaign.pickupTime}</StyledTextMedium>
    </React.Fragment>
  );
};

/******************************************************************
 ** Styled Components
 */
const StyledHostInfo = styled.div`
  width: 100%;
  margin: 20px 0;
`;

const StyledDisplayXSmall = styled(DisplayXSmall)`
  padding: 8px 20px;
  background: #000;
  color: #fff;
  text-align: center;
  margin: 0 0 20px 0;
`;

const StyledTextXLarge = styled(TextXLarge)`
  margin: 0 0 8px 0;
`;

const StyledTextMedium = styled(TextMedium)`
  margin: 0 0 20px 0;
`;
