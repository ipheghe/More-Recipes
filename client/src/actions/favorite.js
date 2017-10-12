import { getData, postData, putData, deleteData } from './index';
import { FAVORITE_RECIPE, RETRIEVE_USER_FAVORITE_RECIPES, FAVORITE_ERROR } from './types';
import { actions as toastrActions } from 'react-redux-toastr';
import { bindActionCreators } from 'redux';

//= ===============================
// Favorite actions
//= ===============================