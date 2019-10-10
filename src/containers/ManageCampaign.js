import React from 'react';
import {Router, Link} from '@reach/router';
import {connect} from 'react-redux';
import styled from 'styled-components';

// Components
import CampaignEdit from './CampaignEdit';
import ManageMember from './ManageMember';
import ManageCampaignOrders from './ManageCampaignOrders';
import ManageOrderSummary from './ManageOrderSummary';
import ManageCampaignOrder from './ManageCampaignOrder';
import CampaignItems from './CampaignItems';

import {
  DisplaySmall,
  TextMedium,
} from '../components/Typography';


const NavLink = props => (
  <Link
    {...props}
    getProps={({isCurrent}) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        style: {
          borderBottomStyle: isCurrent ? 'solid' : 'none',
        },
      };
    }}
  />
);

class ManageCampaign extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
    };
  }

  render() {
    return (
      <StyledMainContainer className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <StyledDisplaySmall> Manage Campaign</StyledDisplaySmall>
            <StyledNav>
              <div className="row no-gutters">
                <div className="col-3" >
                  <StyledTextMedium>
                    <StyledLink to="./">Basic</StyledLink>
                  </StyledTextMedium>
                </div>
                <div className="col-3">
                  <StyledTextMedium>
                    <StyledLink to="product">Products</StyledLink>
                  </StyledTextMedium>
                </div>
                <div className="col-3">
                  <StyledTextMedium>
                    <StyledLink to="members">Members</StyledLink>
                  </StyledTextMedium>
                </div>

                <div className="col-3">
                  <StyledTextMedium>
                    <StyledLink to="orders">Orders</StyledLink>
                  </StyledTextMedium>
                </div>
              </div>
            </StyledNav>

            <Router>
              <CampaignEdit path="/" />
              <CampaignItems path="/product" />
              <ManageMember path="/members" />

              <ManageCampaignOrders path="/orders" />
              <ManageOrderSummary path="/ordersummary" />
              <ManageCampaignOrder path="/:orderId" />
            </Router>
          </div>
        </div>
      </StyledMainContainer>
    );
  }
}
const mapStateToProps = ({
  account,
  campaignOrders,
  campaignsRefetchRequire,
  session,
}) => {
  return {
    account,
    campaignOrders,
    session,
    campaignsRefetchRequire,
  };
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageCampaign);

/*
** Styled Components
*/
const StyledMainContainer = styled.div`
  margin-top: 68px;
  margin-bottom: 68px;

  @media (min-width: 600px) {
    margin-top: 130px;
    margin-bottom: 130px;
  }
`;

const StyledDisplaySmall = styled(DisplaySmall)`
  text-transform: capitalize;
  margin: 0 0 20px 0;
`;

const StyledNav = styled.nav`
  border-bottom:1px solid #000;
  margin-bottom:32px;
`;

const StyledTextMedium = styled(TextMedium)`
  text-transform: capitalize;
  text-align: center;
`;

const StyledLink = styled(NavLink)`
  display:block;
  padding: 6px 0;
`;
