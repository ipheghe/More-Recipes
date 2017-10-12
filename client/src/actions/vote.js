import { getData, postData, putData, deleteData } from './index';
import { UPVOTE_RECIPE, DOWNVOTE_RECIPE, VOTE_ERROR } from './types';
import { actions as toastrActions } from 'react-redux-toastr';
import { bindActionCreators } from 'redux';

//= ===============================
// Vote actions
//= ===============================