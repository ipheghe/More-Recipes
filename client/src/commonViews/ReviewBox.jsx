import React from 'react';

const ReviewBox = ({ fullName, createdAt, message }) => (
  <div className="panel panel-white post panel-shadow">
    <div className="post-heading">
      <div className="pull-left meta">
        <div className="title h5">
          <p><b>{fullName} <small>posted a review</small></b></p>
        </div>
        <h6 className="text-muted date">{createdAt}</h6>
      </div>
    </div>
    <div className="post-description">
      <p>{message}</p>
    </div>
  </div>
);

ReviewBox.propTypes = {
  fullName: React.PropTypes.string.isRequired,
  createdAt: React.PropTypes.string.isRequired,
  message: React.PropTypes.string.isRequired
};

export default ReviewBox;
