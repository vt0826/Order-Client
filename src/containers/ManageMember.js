import React from 'react';
import {Query, Mutation} from 'react-apollo';
import {connect} from 'react-redux';
import gql from 'graphql-tag';
import styled from 'styled-components';

// Redux
import {
  setCampaign,
  campaignsRefetchRequire,
  campaignsRefetchFinished,
} from '../actionCreaters/campaignAction';

// Style
import {
  DisplayXSmall,
  DisplaySmall,
  TextXSmall,
} from '../components/Typography';

// Assets
import LinkIcon from '../assets/manage-campaign-member/link@2x.png';
import AddMemeberIcon from '../assets/manage-campaign-member/add@2x.png';

// GraphQL
const CAMPAIGN = gql`
  query campaign($campaignId: ID!) {
    campaign(campaignId: $campaignId) {
      id
      name
      fulfillReq
      detail
      expiration
      pickupTime
      pickupAddress
      members {
        email
        displayName
      }
      host {
        email
      }
      listItems {
        id
        name
        price
        pictures {
          url
        }
        variants {
          option
        }
      }
    }
  }
`;

const ADD_MEMBER = gql`
  mutation addMember($campaignId: ID!, $email: String!) {
    addMember(campaignId: $campaignId, input: {members: {email: $email}}) {
      status
      message
      id
    }
  }
`;
const REMOVE_MEMBER = gql`
  mutation removeMember($campaignId: ID!, $email: String!) {
    removeMember(campaignId: $campaignId, input: {members: {email: $email}}) {
      status
      message
    }
  }
`;

class ManageMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copySuccess: '',
      username: '',
    };
  }

  copyToClipboard = e => {
    this.campaignLink.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    e.target.focus();
    this.setState({copySuccess: 'Copied!'});
  };

  handleInput = e => {
    this.setState({username: e.target.value});
  };

  renderInviteMember() {
    const campaignId = this.props.campaignId;
    const email = this.state.username;
    return (
      <div className="col-md-6">
        <StyledTitleDisplayXSmall> Invite New Member</StyledTitleDisplayXSmall>
        <div className="row nested">
          <StyledLinkTextXSmall className="col-10">
            <StyledLinkInput
              as="input"
              id="linkInput"
              ref={campaignLink => (this.campaignLink = campaignLink)}
              value={
                this.props.location.origin +
                '/campaign/' +
                this.props.campaignId
              }
            />
          </StyledLinkTextXSmall>
          <StyledLinkDisplaySmall className="col-2">
            <div>
              <StyledLinkIcon src={LinkIcon} onClick={this.copyToClipboard}/>
              {/*
              <StyledDisplayXSmallTextButton onClick={this.copyToClipboard}>Copy</StyledDisplayXSmallTextButton>
              {this.state.copySuccess}
              */}
            </div>
          </StyledLinkDisplaySmall>
        </div>
        <div className="row nested">
          <StyledLinkTextXSmall className="col-10">
            <StyledLinkInput
              as="input"
              id="username"
              value={this.state.username}
              placeholder="Email"
              onChange={e => this.handleInput(e)}
            />
          </StyledLinkTextXSmall>
          <StyledLinkDisplaySmall className="col-2">
            <div>
              <Mutation
                mutation={ADD_MEMBER}
                variables={{
                  campaignId,
                  email,
                }}
                refetchQueries={() => [
                  {
                    query: CAMPAIGN,
                    variables: {campaignId: this.props.campaignId},
                  },
                ]}
                onCompleted={data => {
                  if (data) {
                    this.props.updateCampaign();
                  }
                }}>
                {(addMember, {data, loading, error}) => (
                  <StyledAddMemberIcon src={AddMemeberIcon} onClick={addMember}/>
                )}
              </Mutation>
            </div>
          </StyledLinkDisplaySmall>
        </div>
      </div>
    );
  }

  renderExistMember() {
    if (!this.props.campaign) return null;
    return (
      <div className="col-md-6">
        <StyledTitleDisplayXSmall> Existing Members</StyledTitleDisplayXSmall>
        {this.props.campaign.members.map(member => (
          <div className="row">
            <StyledLinkTextXSmall className="col-3">
              {member.displayName || 'Username'}
            </StyledLinkTextXSmall>
            <StyledLinkDisplaySmall className="col-1">
              <div>
                <Mutation
                  mutation={REMOVE_MEMBER}
                  variables={{
                    campaignId: this.props.campaignId,
                    email: member.email,
                  }}
                  refetchQueries={() => [
                    {
                      query: CAMPAIGN,
                      variables: {campaignId: this.props.campaignId},
                    },
                  ]}
                  onCompleted={data => {
                    if (data) {
                      this.props.updateCampaign();
                    }
                  }}>
                  {(removeMember, {data, loading, error}) => (
                    <StyledButton onClick={removeMember}>
                      {'-'}
                    </StyledButton>
                  )}
                </Mutation>
              </div>
            </StyledLinkDisplaySmall>
          </div>
        ))}
      </div>
    );
  }
  render() {
    const campaignId = this.props.campaignId;
    return (
      <div className="row">
        <Query
          query={CAMPAIGN}
          variables={{campaignId}}
          fetchPolicy="cache-and-network"
          onCompleted={data => this.props.setCampaign(data.campaign)}>
          {({loading, error, data}) => {
            if (loading) return <div>loading</div>;
            if (error) return <div>error</div>;
            return (
              <React.Fragment>
                <div className="col-12">
                  <a
                    href={
                      this.props.location.origin +
                      '/campaign/' +
                      this.props.campaignId
                    }
                    target="_newtab">
                    <StyledButton>View Campaign</StyledButton>
                  </a>
                </div>
                {this.renderInviteMember()}
                {this.renderExistMember()}
              </React.Fragment>
            );
          }}
        </Query>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = ({
  sessionToken,
  account,
  campaign,
  campaignsRefetchRequire,
}) => {
  return {
    sessionToken,
    account,
    campaign,
    campaignsRefetchRequire,
  };
};
const mapDispatchToProps = dispatch => ({
  updateCampaign() {
    dispatch(campaignsRefetchRequire());
  },
  setCampaign(campaign) {
    dispatch(setCampaign(campaign));
    dispatch(campaignsRefetchFinished());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageMember);

/*
** Styled Components
*/
const StyledTitleDisplayXSmall = styled(DisplayXSmall)`
  margin: 40px 0 20px 0;
  text-transform: uppercase;
`;
const StyledLinkTextXSmall = styled(TextXSmall)`
  text-transform: lowercase;
  text-align: center;
`;

const StyledLinkDisplaySmall = styled(DisplaySmall)`
  text-transform: uppercase;
  text-align: center;
`;

const StyledLinkInput = styled(TextXSmall)`
  outline: none;
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
`;

// Styled Components
const StyledDisplayXSmallTextButton = styled(DisplayXSmall)`
  width: 100%;
  text-align: right;
`;

const StyledButton = styled(DisplayXSmall)`
  width: 100%;
  background: #000;
  color: #fff;
  padding: 8px 20px;
  text-align: center;
`;

const StyledAddMemberIcon = styled.img`
  width: 100%;
`;

const StyledLinkIcon = styled.img`
  width: 100%;
`;
