import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

// Asset
import BannerBg from '../assets/landing/order-banner.png';
import MockImg from '../assets/landing/mock.png';
import FundBg from '../assets/landing/fund-thyhive.png';

// Style
import {
  DisplayXLarge,
  DisplayLarge,
  DisplayXSmall,
  TextXLarge,
  TextLarge,
  TextMedium,
} from '../components/Typography';

export const Landing = props => {
  return (
    <React.Fragment>
      <section className="container-full">
        <div className="row align-items-center">
          <StyledBannerImg className="col-lg-6" />
          <div className="col-lg-4 offset-lg-1">
            <StyledBannerDisplayXLarge>
              Group Ordering Simplified
            </StyledBannerDisplayXLarge>
            <StyledBannerTextXLarge>
              Today the globe is facing climate change, so we at Thyhive wonder
              how we can build a product that can contribute to the environment
              and also improving people’s life. So we come up with Order to
              simplify the buying in group experience while reducing the carbon
              foorprint and building community.
            </StyledBannerTextXLarge>

            <StyledBannerButtonDisplayXSmall>
              <Link to="signup">Get Started</Link>
            </StyledBannerButtonDisplayXSmall>
          </div>
        </div>
      </section>

      <StyledContainer className="container">
        <div className="row align-items-center">
          <div className="col-lg-5 offset-lg-1">
            <StyledDisplayXLarge>
              With order, we can make a positive impact together.
            </StyledDisplayXLarge>
            <StyledTextXLarge>
              Everything starts with a small change, take action today.
            </StyledTextXLarge>
          </div>

          <div className="col-lg-4 offset-lg-1">
            <StyledDisplayXSmall>Reduce Carbon Footprint</StyledDisplayXSmall>
            <StyledTextLarge>
              Everything starts with a small change, take action today.
            </StyledTextLarge>

            <StyledDisplayXSmall>Build Community</StyledDisplayXSmall>
            <StyledTextLarge>
              Everything starts with a small change, take action today.
            </StyledTextLarge>

            <StyledDisplayXSmall>Save Your Wallet</StyledDisplayXSmall>
            <StyledTextLarge>
              Everything starts with a small change, take action today.
            </StyledTextLarge>
          </div>
        </div>
      </StyledContainer>

      <StyledContainer className="container">
        <div className="row align-items-center">
          <div className="col-lg-4 offset-lg-1">
            <StyledImg src={MockImg} alt="Mock" />
          </div>

          <div className="col-lg-5 offset-lg-1">
            <StyledDisplayLarge>
              Share the good stuff. Invite your friends and family to the order
              campaign.
            </StyledDisplayLarge>
            <StyledTextMedium>
              Hosting features allow you to set the minimum order and easy
              management of inventory and orders. Then you can make the order
              with the vendor in bulk. Simply collect the payments either in
              cash or via venmo.
            </StyledTextMedium>
          </div>
        </div>
      </StyledContainer>

      <StyledContainer className="container">
        <div className="row align-items-center">
          <div className="col-lg-5 offset-lg-1">
            <StyledDisplayLarge>
              Buy in bulk. Together is always better.
            </StyledDisplayLarge>
            <StyledTextMedium>
              Pledge your order. Once the campaign minimum order is fulfilled,
              you will be notified with the confirmation. Order features allow
              you to edit your pledge anytime before the campaign ends, track
              your order status and make payment via venmo or in cash during
              pick up.
            </StyledTextMedium>
          </div>

          <div className="col-lg-4 offset-lg-1">
            <StyledImg src={MockImg} alt="Mock" />
          </div>
        </div>
      </StyledContainer>

      <StyledFundThyhiveContainer className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <StyledFundDisplayLarge>Pay as you wish</StyledFundDisplayLarge>
            <StyledFundTextXLarge>
              Your support for Thyhive help us operate the Studio and keep the
              project alive. With the fund we continue to design and develop
              product and service that serves the people’s needs and conserving
              the environment.
            </StyledFundTextXLarge>

            <StyledButtonDisplayXSmall>
              <a href="https://www.thyhive.com/member">Fund Thyhive</a>
            </StyledButtonDisplayXSmall>
          </div>
        </div>
      </StyledFundThyhiveContainer>
    </React.Fragment>
  );
};

// Styled components
const StyledContainer = styled.section`
  margin: 120px 0;

  @media (min-width: 960px) {
    margin: 240px 0;
  }
`;

const StyledBannerImg = styled.div`
  height: 40vh;
  overflow: auto;
  background-image: url(${BannerBg});
  background-repeat: no-repeat;
  background-position: center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  @media (min-width: 960px) {
    height: 100vh;
  }
`;

const StyledBannerDisplayXLarge = styled(DisplayXLarge)`
  margin-right: 16px;
  margin-left: 16px;

  @media (min-width: 600px) {
    margin-right: 24px;
    margin-left: 24px;
  }

  @media (min-width: 960px) {
    margin-right: 0;
    margin-left: 0;
  }
`;

const StyledBannerTextXLarge = styled(TextXLarge)`
  margin-right: 16px;
  margin-left: 16px;

  @media (min-width: 600px) {
    margin-right: 24px;
    margin-left: 24px;
  }

  @media (min-width: 960px) {
    margin-right: 0;
    margin-left: 0;
  }
`;

const StyledBannerButtonDisplayXSmall = styled(DisplayXSmall)`
  display: inline-block;
  padding: 20px 40px;
  margin-right: 16px;
  margin-left: 16px;
  background: #000;

  a {
    text-decoration: none;
    color: #fff;

    &:hover {
      color: #fff;
    }
  }

  @media (min-width: 600px) {
    margin-right: 24px;
    margin-left: 24px;
  }

  @media (min-width: 960px) {
    margin-right: 0;
    margin-left: 0;
  }
`;

const StyledDisplayXLarge = styled(DisplayXLarge)`
  margin: 40px 0;
`;

const StyledTextXLarge = styled(TextXLarge)`
  margin: 40px 0;
`;

const StyledButtonDisplayXSmall = styled(DisplayXSmall)`
  display: inline-block;
  padding: 20px 40px;
  background: #000;

  a {
    text-decoration: none;
    color: #fff;

    &:hover {
      color: #fff;
    }
  }
`;

const StyledDisplayXSmall = styled(DisplayXSmall)`
  margin: 0 0 20px;
`;

const StyledTextLarge = styled(TextLarge)`
  margin: 0 0 40px;
`;

const StyledImg = styled.img`
  width: 100%;
`;

const StyledDisplayLarge = styled(DisplayLarge)`
  margin: 40px 0;
`;

const StyledTextMedium = styled(TextMedium)`
  margin: 40px 0;
`;

const StyledFundThyhiveContainer = styled.section`
  padding-top: 120px;
  padding-bottom: 120px;

  background-image: linear-gradient(
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.3)
    ),
    url(${FundBg});
  background-repeat: no-repeat;
  background-position: center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  text-align: center;
`;

const StyledFundDisplayLarge = styled(DisplayLarge)`
  margin: 0 0 40px;
`;

const StyledFundTextXLarge = styled(TextXLarge)`
  margin: 0;
`;
