import React from 'react';

// Style
import styled from 'styled-components';
import {
  DisplayXSmall,
  TextXLarge,
} from '../components/Typography';

export const CampaignForm = props => {
  const expiration = props.campaign.expiration
    ? props.campaign.expiration.toLocaleString().replace('Z', '')
    : '';
  const pickupTime = props.campaign.pickupTime
    ? props.campaign.pickupTime.toLocaleString().replace('Z', '')
    : '';
  return (
    <StyledForm as="form" id={props.page} onSubmit={props.handleFormSubmit}>
      <div className="row">
        <div className="col-md-6">
          <StyledDisplayXSmall className="inputLabel">CAMPAIGN TITLE</StyledDisplayXSmall>
          <StyledInput
            as="input"
            type="text"
            id="name"
            value={props.campaign.name}
            placeholder="Campaign Starter"
            onChange={e => props.handleInput('name', e)}
          />

          <StyledDisplayXSmall className="inputLabel">
            END TIME
          </StyledDisplayXSmall>
          <StyledInput
            as="input"
            id="expiration"
            value={expiration}
            type="datetime-local"
            placeholder="03/28/2019 12PM"
            onChange={e => props.handleInput('expiration', e)}
          />

          <StyledDisplayXSmall className="inputLabel">
            MINIMUM ORDER
          </StyledDisplayXSmall>
          <StyledInput
            as="input"
            id="fulfillReq"
            placeholder="75 (Minimum Order Goal $- for the campaign)"
            value={props.campaign.fulfillReq}
            onChange={e => props.handleInput('fulfillReq', e)}
          />
        </div>
        <div className="col-md-6">
          <StyledDisplayXSmall className="inputLabel">
            PICKUP ADDRESS
          </StyledDisplayXSmall>
          <StyledInput
            as="input"
            id="address"
            value={props.campaign.pickupAddress}
            placeholder="1234 MAIN STREET, NEW YORK"
            onChange={e => props.handleInput('pickupAddress', e)}
          />
          <StyledDisplayXSmall className="inputLabel">
            PICKUP TIME
          </StyledDisplayXSmall>
          <StyledInput
            as="input"
            type="datetime-local"
            id="time"
            value={pickupTime}
            placeholder="03/30/2019 5PM"
            onChange={e => props.handleInput('pickupTime', e)}
          />
        </div>
      </div>
    </StyledForm>
  );
};

/*
** Styled components
*/
const StyledForm = styled.form`
  margin: 40px 0 0 0;
  color: #4e4e4e;
`;

const StyledDisplayXSmall = styled(DisplayXSmall)`
  margin: 0 20px 0 0;
`;

const StyledInput = styled(TextXLarge)`
  display: inline-block;
  width: 100%;
  background: transparent;
  height: 32px;
  color: #000;
  font-size: 13.33px;
  font-weight: 300;
  line-height: 20px;
  letter-spacing: 0.8px;
  padding: 8px 0;
  margin-bottom: 20px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0;
  border: none;
  border-bottom: 1px solid #4e4e4e;
`;
/*
const StyledSubmitButton = styled(DisplayXSmall)`
  padding: 8px 20px;
  background: none;
  color: #4e4e4e;
  border: 1px solid #4e4e4e;
  margin: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;
*/
