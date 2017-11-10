import React from 'react';

const ReviewBox = ({ username, createdAt, message }) => (
  <div className="panel panel-white post panel-shadow">
    <div className="post-heading">
      <div className="pull-left image">
        <img
          src="http://bootdey.com/img/Content/user_1.jpg"
          className="rounded-circle avatar"
          alt="User"
        />
      </div>
      <div className="pull-left meta">
        <div className="title h5">
          <p><b>{username} <small>posted a review</small></b></p>
        </div>
        <h6 className="text-muted time">{createdAt}</h6>
      </div>
    </div>
    <div className="post-description">
      <p>{message}</p>
    </div>
  </div>
);

ReviewBox.propTypes = {
  username: React.PropTypes.string.isRequired,
  createdAt: React.PropTypes.string.isRequired,
  message: React.PropTypes.string.isRequired
};

export default ReviewBox;
