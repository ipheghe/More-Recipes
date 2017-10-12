import { getData, postData, putData, deleteData } from './index';
import { ADD_CATEGORY, FETCH_USER_CATEGORIES, CATEGORY_ERROR } from './types';
import { actions as toastrActions } from 'react-redux-toastr';
import { bindActionCreators } from 'redux';

//= ===============================
// Category actions
//= ===============================
