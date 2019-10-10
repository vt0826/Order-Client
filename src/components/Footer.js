import React from 'react';
import {Link} from '@reach/router';

// Style
import styled from 'styled-components';
import {DisplayXSmall, TextMedium, TextXSmall} from '../components/Typography';

export const Footer = () => {
  return (
    <StyledFooterContainer className="container-fluid">
      <div className="row align-items-end">
        <div className="col-md-6">
          <StyledDisplayXSmall>Order by Thyhive</StyledDisplayXSmall>
          <StyledFooterList>
            <StyledListItemTextMedium as="li">
              <Link to="/">Terms and Conditions</Link>
            </StyledListItemTextMedium>
            <StyledListItemTextMedium as="li">
              <Link to="/">Contact Us</Link>
            </StyledListItemTextMedium>
            <StyledListItemTextMedium as="li">
              <Link to="https://www.thyhive.com">About Thyhive</Link>
            </StyledListItemTextMedium>
          </StyledFooterList>
        </div>
        <div className="col-md-6">
          <StyledTextXSmall>
            Designed by Thyhive. © All rights reserved.
          </StyledTextXSmall>
        </div>
      </div>
    </StyledFooterContainer>
  );
};

// Styled Components
const StyledFooterContainer = styled.footer`
  background: #263645;
  color: #fff;
  padding-top: 60px;
  padding-bottom: 60px;
  margin-top: auto;

  @media (min-width: 600px) {
    padding-top: 80px;
    padding-bottom: 80px;
  }
`;

const StyledDisplayXSmall = styled(DisplayXSmall)`
  margin: 0 0 20px 0;
`;

const StyledFooterList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-bottom: 0;
`;

const StyledListItemTextMedium = styled(TextMedium)`
  margin: 0 10px;
  display: inline-block;

  :first-child {
    margin: 0 10px 0 0;
  }

  a {
    color: #fff;
    text-decoration: none;
  }
`;

const StyledTextXSmall = styled(TextXSmall)`
  margin-top: 40px;

  @media (min-width: 600px) {
    margin-top: 0;
    text-align: right;
  }
`;
