import React from 'react';
import {Button} from '../components/Button';

export const CampaignTitle = props => {
  return (
    <div>
      <h4>Campaign Title: </h4>
      {props.campaign.title}
    </div>
  );
};
