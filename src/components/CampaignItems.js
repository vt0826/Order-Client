import React from 'react';
import styled from 'styled-components';

// Assets
import ProductPlaceholder from '../assets/placeholder/pkg-br-04-sq2_2048x.jpg';

// Style
import {DisplayXSmall, TextMedium} from '../components/Typography';

export const CampaignItems = props => {
  //render each item pictures, show default pic if there's no item picutre
  const renderItemPictures = pictures => {
    if (!pictures.length) {
      return (
        <StyledProductImage
          src={ProductPlaceholder}
          alt="default"
        />
      );
    } else {
      return (
        <StyledProductImage
          src={ProductPlaceholder}
          alt="Product"
        />
      );
    }
  };

  return (
    <StyledProduct
      className="col-6 col-md-4"
      onClick={() => props.redirectToItemPage(props.campaignId, props.item.id)}>
      {renderItemPictures(props.item.pictures)}

      <StyledTextMedium>{props.item.name || 'No Name'} </StyledTextMedium>
      <DisplayXSmall>${props.item.price || '0.00'} </DisplayXSmall>
    </StyledProduct>
  );
};

/******************************************************************
** Styled Components
*/

const StyledProduct = styled.div`
  margin: 0 0 20px 0;
`;

const StyledProductImage = styled.img`
  width: 100%;
  margin: 0 0 6px 0;
`;

const StyledTextMedium = styled(TextMedium)`
  margin: 0 0 2px 0;
`;
