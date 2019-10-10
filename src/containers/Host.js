import React from 'react';
import {connect} from 'react-redux';
import {
  setHostCampaignsIndex,
  campaignsRefetchFinished,
} from '../actionCreaters/campaignAction';
import {
  setAccountItems,
  itemRefetchRequire,
  itemRefetchFinished,
} from '../actionCreaters/itemAction';
import HostCampaign from './HostCampaign';
import HostProduct from './HostProduct';

import {Router, Link} from '@reach/router';
import {DisplaySmall, TextMedium} from '../components/Typography';
import styled from 'styled-components';
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

class Host extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <StyledMainContainer className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <StyledDisplaySmall>Host</StyledDisplaySmall>
            <StyledNav>
              <div className="row no-gutters">
                <div className="col-6">
                  <StyledTextMedium>
                    <StyledLink to="./">Campaigns</StyledLink>
                  </StyledTextMedium>
                </div>
                <div className="col-6">
                  <StyledTextMedium>
                    <StyledLink to="product">Products</StyledLink>
                  </StyledTextMedium>
                </div>
              </div>
            </StyledNav>

            <Router>
              <HostCampaign path="/" />
              <HostProduct path="/product" />
              <HostProduct path="/product/:campaignId" />
            </Router>
          </div>
        </div>
      </StyledMainContainer>
    );
  }
}

const mapStateToProps = ({
  sessionToken,
  account,
  accountItems,
  itemRefetchRequire,
  campaignsIndex,
  hostCampaigns,
  campaignsRefetchRequire,
  joinedCampaigns,
}) => {
  return {
    sessionToken,
    account,
    accountItems,
    itemRefetchRequire,
    campaignsIndex,
    hostCampaigns,
    campaignsRefetchRequire,
    joinedCampaigns,
  };
};
const mapDispatchToProps = dispatch => ({
  //dispatch setHostCampaignsIndex to set host campaigns and dispatch hostCampaignsRefetchFinished
  setHostCampaignsIndex(campaigns) {
    dispatch(setHostCampaignsIndex(campaigns));
    dispatch(campaignsRefetchFinished());
  },

  //dispatch setAccountItems action to update accountItems reducer
  setAccountItems(items) {
    dispatch(setAccountItems(items));
    dispatch(itemRefetchFinished());
  },

  setItemfetchRequire() {
    dispatch(itemRefetchRequire());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Host, HostCampaign);

/*
**  Styled components
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
