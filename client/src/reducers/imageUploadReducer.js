import { IMAGE_FILE_FAILURE, IMAGE_FILE_REQUEST, IMAGE_FILE_SUCCESSFUL } from '../actions/types';


const initialState=[{
  imageData: {},
  response: '',
  error: '',
  isloaded: false,
}]

export default function (state = initialState, action) {
  switch (action.type) {
    case IMAGE_FILE_REQUEST:
      return [{ 
        imageData: action.imageData,
        response: '',
        error: '',
        isloaded: false,
      }, ...state]

      case IMAGE_FILE_SUCCESSFUL:
      return [{ 
        imageData: {},
        response: action.response,
        error: '',
        isloaded: true,
      }, ...state];

      case IMAGE_FILE_REQUEST:
      return [{ 
        imageData: {},
        response: '',
        error: action.error,
        isloaded: false,
      }, ...state];
      
      default:
      return state;
    }

  
  }
