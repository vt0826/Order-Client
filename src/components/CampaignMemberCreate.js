import React from 'react';

export const CampaignMemberCreate = props => {
  return (
    <div>
      <button id="Popover1" type="button" data-placement="bottom">
        invite user
      </button>
      <div
        placement="bottom"
        isOpen={props.popoverOpen}
        target="Popover1"
        toggle={props.toggle}>
        <h1>Add New User</h1>

        <form onSubmit={props.updateCampaignMembers}>
          <div>
            <input type="text" placeholder="@username" />
          </div>
          <button
            color="secondary"
            className="btn btn-secondary float-right"
            size="sm">
            add
          </button>
        </form>
      </div>
    </div>
  );
};
