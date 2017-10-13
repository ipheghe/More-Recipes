import { IMAGE_FILE_FAILURE, IMAGE_FILE_REQUEST, IMAGE_FILE_SUCCESSFUL } from './types';
import sha1 from 'sha1';
import superagent from 'superagent';



export function uploadImageRequest(imageData) {

  return {
    type: IMAGE_FILE_REQUEST,
    imageData,
  }
}

export function uploadImageResponse(response) {

  return {
    type: IMAGE_FILE_SUCCESSFUL,
    response,
  }
}

export function uploadImageFailed(error) {

  return {
    type: IMAGE_FILE_FAILURE,
    error,
  }
}


export function uploadImage(imageFile) {

  console.log(imageFile);
  console.log('+++++++++++++++++++');
  return (dispatch) => {
    dispatch(uploadImageRequest(imageFile));
    const cloudName = 'dd3lv0o93';
    const url = 'https://api.cloudinary.com/v1_1/' + cloudName + '/image/upload';
    const timestamp = Date.now() / 1000;
    const uploadPreset = 'tsoddiyz';
    const paramsStr = 'timestamp=' + timestamp + '&upload_preset=' + uploadPreset + 'EEHPrMjK3zGh6V34E2zeDl_IXVk';
    const signature = sha1(paramsStr);
    const params = {
      'api_key': '866441834971784',
      'timestamp': timestamp,
      'upload_preset': uploadPreset,
      'signature': signature
    };
    let uploadRequest = superagent.post(url);
    uploadRequest.attach('file', imageFile);
    Object.keys(params).forEach((key) => {
      uploadRequest.field(key, params[key])
    })
    uploadRequest.end((error, response) => {
      if (error) {
        return dispatch(uploadImageFailed(error));
      }
      return dispatch(uploadImageResponse(response.body.url));
    })

  }

}