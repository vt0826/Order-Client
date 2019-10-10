import React from 'react';
import {Link} from '@reach/router';
import {connect} from 'react-redux';
import styled from 'styled-components';

// Redux
import {getAccount} from '../actionCreaters/accountAction';
import {toggleMenu} from '../actionCreaters/headerAction';

// Component
import NavigationBar from './NavigationBar';
import NavigationMenu from './NavigationMenu';
import Cart from './Cart';
import Modal from '../Modal';

// Asset
import CartInactiveIcon from '../assets/header/cart/inactive@2x.png';
import CartActiveIcon from '../assets/header/cart/active@2x.png';

// Style
import {TextMedium} from '../components/Typography';


class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };
  }

  componentDidMount() {
    //if campaign Id exist in redux store then set campaign state to that campaign else trigger campaign action to get campaign Id
    if (this.props.account === '') {
      this.props.handleAccount();
    }
  }

  toggleModal = () => this.setState({showModal: !this.state.showModal});

  render() {
    return (
      <StyledHeaderContainer className={this.props.headerMenuDisplay ? 'active' : ''}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-6 col-lg-3">
              <StyledMenuToggle onClick={this.props.handleMenu}>
                <StyledMenuIconTop
                  className={this.props.headerMenuDisplay ? 'active' : ''}>
                  <StyledMenuIconTopLine
                    className={this.props.headerMenuDisplay ? 'active' : ''}
                  />
                </StyledMenuIconTop>
                <StyledMenuIconBottom
                  className={this.props.headerMenuDisplay ? 'active' : ''}>
                  <StyledMenuIconBottomLine
                    className={this.props.headerMenuDisplay ? 'active' : ''}
                  />
                </StyledMenuIconBottom>
              </StyledMenuToggle>
              <StyledCartIconContainer>
                {Object.keys(this.props.cart).length ? (
                  <StyledCartActiveIcon src={CartActiveIcon} onClick={this.toggleModal} alt="CartActiveIcon" />
                ) : (
                  <StyledCartInactiveIcon src={CartInactiveIcon} onClick={this.toggleModal} alt="CartInactiveIcon" />
                )}
              </StyledCartIconContainer>
            </div>
            <StyledNavBarContainer className="col-md-6 self">
              {/* Tablet & Desktop: show navigation bar */}
              <NavigationBar />
            </StyledNavBarContainer>
            <div className="col-6 col-lg-3">
              <StyledLogoTextMedium>
                <Link to="/">Order by Thyhive</Link>
              </StyledLogoTextMedium>
            </div>
          </div>
        </div>
        <NavigationMenu className={this.props.headerMenuDisplay ? 'active' : ''} />

        {this.state.showModal ? (
          <Modal isActive={this.state.showModal}>
            <Cart
              toggleModal={this.toggleModal}
              isActive={this.state.showModal}
              cartItems={this.props.cartItems}
              removeFromCart={this.props.removeFromCart}
            />
          </Modal>
        ) : null}
      </StyledHeaderContainer>
    );
  }
}

const mapStateToProps = ({
  cart,
  account,
  headerMenuDisplay
}) => {
  return {
    cart,
    account,
    headerMenuDisplay
  };
};

const mapDispatchToProps = dispatch => ({
  handleAccount() {
    dispatch(getAccount());
  },
  handleMenu(){
    dispatch(toggleMenu());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);

// Styled Components
const StyledHeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
  height: 48px;
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  -webkit-transition: height 0.3s cubic-bezier(0.52, 0.16, 0.24, 1);
  transition: height 0.3s cubic-bezier(0.52, 0.16, 0.24, 1);

  &.active {
    height: 100vh;
  }
`;

const StyledNavBarContainer = styled.div`
  display: none;

  @media (min-width: 960px) {
    display: block;
  }
`;
const StyledMenuToggle = styled.div`
  display: block;
  width: 18px;
  height: 18px;
  -webkit-transition: opacity 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: opacity 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

  @media (min-width: 960px) {
    display: none;
  }
`;

const StyledCartIconContainer = styled.div`
  margin-left: 40px;
`;

const StyledMenuIconTop = styled.span`
  position: absolute;
  top: 9px;
  left: 9px;
  width: 30px;
  height: 30px;
  transition: transform 0.1806s cubic-bezier(0.04, 0.04, 0.12, 0.96),
    -webkit-transform 0.1806s cubic-bezier(0.04, 0.04, 0.12, 0.96);
  transform: rotate(0deg);

  &.active {
    transform: rotate(45deg);
  }
`;

const StyledMenuIconTopLine = styled.span`
  display: block;
  width: 17px;
  height: 1px;
  position: absolute;
  top: 14px;
  left: 7px;
  background: #000;
  transform: translateY(-3px);

  &.active {
    transform: none;
  }
`;

const StyledMenuIconBottom = styled.span`
  position: absolute;
  top: 9px;
  left: 9px;
  width: 30px;
  height: 30px;
  transition: transform 0.1806s cubic-bezier(0.04, 0.04, 0.12, 0.96),
    -webkit-transform 0.1806s cubic-bezier(0.04, 0.04, 0.12, 0.96);
  transform: rotate(0deg);

  &.active {
    transform: rotate(-45deg);
  }
`;

const StyledMenuIconBottomLine = styled.span`
  display: block;
  width: 17px;
  height: 1px;
  position: absolute;
  left: 7px;
  bottom: 14px;
  background: #000;
  transform: translateY(3px);

  &.active {
    transform: none;
  }
`;
const StyledCartActiveIcon = styled.img`
  width:18px;
  height:18px;
`;

const StyledCartInactiveIcon = styled.img`
  width:18px;
  height:18px;
`;


const StyledLogoTextMedium = styled(TextMedium)`
  text-align: right;
  margin: 13px 0;

  a {
    color: #000;
    text-decoration: none;
  }
`;
