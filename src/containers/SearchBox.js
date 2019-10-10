import React from 'react';
import styled from 'styled-components';

// Asset
import SearchIcon from '../assets/product-list/search@2x.png';

// Style
import {
  TextMedium,
} from '../components/Typography';

class Search extends React.Component {
  handleFormSubmit = event => {
    event.preventDefault();
  };
  render() {
    return (
      <StyledForm onSubmit={this.handleFormSubmit}>
        <div className="row nested align-items-center">
          <div className="col-2 col-md-1">
            <StyledSearchIcon src={SearchIcon}/>
          </div>
          <div className="col-10 col-md-11">
            <TextMedium>
              <StyledInput placeholder="Search By tag or product title" />
            </TextMedium>
          </div>
        </div>
      </StyledForm>
    );
  }
}

export default Search;

/***********************************************************
** Styled components
*/
const StyledForm = styled.form`
  padding: 0 0 20px 0;
  margin: 0 0 40px 0;
  border-bottom: 1px solid #000;
`;

const StyledSearchIcon = styled.img`
  width: 100%;
`;

const StyledInput = styled.input`
  outline: none;
  display: inline-block;
  width: 100%;
  background: transparent;
  height: 32px;
  font-size: 13.33px;
  font-weight: 300;
  line-height: 20px;
  letter-spacing: 0.8px;
  padding: 8px 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0;
  border: none;
`;
