import React from 'react';

const ReviewBox = ({ username, createdAt, message }) => {
  return (
    <div class="panel panel-white post panel-shadow">
      <div class="post-heading">
        <div class="pull-left image">
          <img src="http://bootdey.com/img/Content/user_1.jpg" class="rounded-circle avatar" alt="user profile image" />
        </div>
        <div class="pull-left meta">
          <div class="title h5">
            <p><b>{username} <small>posted a review</small></b></p>
          </div>
          <h6 class="text-muted time">{ createdAt }</h6>
        </div>
      </div>
      <div class="post-description">
        <p>{ message }</p>
      </div>
    </div>
  );
}
export default ReviewBox;
