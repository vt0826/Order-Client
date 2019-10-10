import React from 'react';
import {connect} from 'react-redux';
import {navigate} from '@reach/router';
import styled from 'styled-components';

// Redux
import {setCampaign} from '../actionCreaters/campaignAction';
import setPrivilege from '../actionCreaters/privilegeAction';
// Components
import {CampaignInfo} from '../components/CampaignInfo';
import {CampaignItems} from '../components/CampaignItems';

// Style
import {
  DisplayXSmall,
  TextLarge,
} from '../components/Typography';



/****************************************************************/
class CampaignDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      campaignId: this.props.campaignId,
      loading: true,
      showModal: false,
      popoverOpen: false,
      copySuccess: '',
    };
  }

  componentDidMount() {
    this.handlePrivilage();
    if (this.props.privilage !== 'member') {
      this.props.addMember();
    }
  }

  //set the status of user in the campaign
  handlePrivilage() {
    const campaignId = this.props.campaignId;
    const members = this.props.campaign.members;
    const email = this.props.account.email;
    if (!this.props.account) {
      navigate('/signup/' + campaignId);
    } else {
      this.props.checkPrivilage(members, email);
    }
  }

  // change modal state from perivous one, open/close.
  toggleModal = () => this.setState({showModal: !this.state.showModal});
  // change popoverOpen state from perivous state, open/clase.
  toggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    });
  };

  // redirect to Item page from given campaign id and item id
  redirectToItemPage(campaignId, itemId) {
    navigate('/campaign/' + campaignId + '/' + itemId);
  }

  // render each items in the campaign
  renderItems(items) {
    if (!items) return null;
    return items.map(item => (
      <CampaignItems
        redirectToItemPage={this.redirectToItemPage}
        campaignId={this.props.campaignId}
        item={item}
      />
    ));
  }

  render() {
    //const isPrivilage = this.props.privilage;
    if (!this.props.campaign) return null;
    return (
      <StyledMainContainer className="container">
        <div className="row">
          <StyledInfoContainer className="col-lg-4">
            <CampaignInfo campaign={this.props.campaign} />
          </StyledInfoContainer>

          <div className="col-lg-8">
            <StyledProductsListHeader className="row">
              <div className="col-6">
                <TextLarge>List</TextLarge>
              </div>
              <div className="col-6">
                <StyledDisplayXSmall>
                  {' '}
                  {this.props.campaign.listItems.length} Items
                </StyledDisplayXSmall>
              </div>
            </StyledProductsListHeader>

            <div className="row">
              {this.renderItems(this.props.campaign.listItems)}
            </div>
          </div>
        </div>
      </StyledMainContainer>
    );
  }
}

const mapStateToProps = ({
  sessionToken,
  account,
  privilage,
  campaign,
  item,
}) => {
  return {
    sessionToken,
    account,
    campaign,
    item,
    privilage,
  };
};
const mapDispatchToProps = dispatch => ({
  //disapch setPrivilage action to show account's status in current campaign
  checkPrivilage(memberList, email) {
    dispatch(setPrivilege(memberList, email));
  },

  //dispatch setCampaign action to set campaign reducer
  setCampaign(campaign) {
    dispatch(setCampaign(campaign));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CampaignDetail);

/******************************************************************
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

const StyledDisplayXSmall = styled(DisplayXSmall)`
  text-align: right;
`;

const StyledInfoContainer = styled.div`
  margin-bottom: 32px;

  @media (min-width: 600px) {
    margin-bottom: 0;
  }
`;

const StyledProductsListHeader = styled.div`
  margin-bottom: 20px;
`;
