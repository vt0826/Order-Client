import React from 'react';

// Take campaign expiration and compare to current time
// Return remaining time in hours format
export const CampaignRemainTime = function(time) {
  const countDown = Math.floor(
    ((Date.parse(time) - Date.now()) / (1000 * 60 * 60)) % 24,
  );
  if (countDown <= 0) {
    return <React.Fragment>Ended</React.Fragment>;
  } else {
    return <React.Fragment>Ending in {countDown} Hrs</React.Fragment>;
  }
};
