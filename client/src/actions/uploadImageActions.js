import sha1 from 'sha1';
import superagent from 'superagent';
import {
  IMAGE_FILE_FAILURE,
  IMAGE_FILE_REQUEST,
  IMAGE_FILE_SUCCESSFUL
} from './types';

/**
 * @description upload image request action
 *
 * @type {function} uploadImageRequest
 *
 * @export uploadImageRequest
 *
 * @param {object} imageData
 *
 * @returns {action} dispatch
 */
export const uploadImageRequest = imageData => ({
  type: IMAGE_FILE_REQUEST,
  imageData
});

/**
 * @description upload image response action
 *
 * @type {function} uploadImageResponse
 *
 * @export uploadImageResponse
 *
 * @param {object} response
 *
 * @returns {action} dispatch
 */
export const uploadImageResponse = response => ({
  type: IMAGE_FILE_SUCCESSFUL,
  response
});

/**
 * @description upload image failed action
 *
 * @type {function} uploadImageFailed
 *
 * @export uploadImageFailed
 *
 * @param {object} error
 *
 * @returns {action} dispatch
 */
export const uploadImageFailed = error => ({
  type: IMAGE_FILE_FAILURE,
  error

});

/**
 * @description uploadImage action
 *
 * @type {function} uploadImage
 *
 * @export uploadImage
 *
 * @param {object} imageFile
 *
 * @returns {action} dispatch
 */
export const uploadImage = imageFile =>
  (dispatch) => {
    dispatch(uploadImageRequest(imageFile));
    const url = 'https://api.cloudinary.com/v1_1/dd3lv0o93/image/upload';
    const timestamp = Date.now() / 1000;
    const uploadPreset = 'tsoddiyz';
    const paramsStr = `timestamp=${timestamp}&upload_preset=` +
    `${uploadPreset}EEHPrMjK3zGh6V34E2zeDl_IXVk`;
    const signature = sha1(paramsStr);
    const params = {
      api_key: '866441834971784',
      timestamp,
      upload_preset: uploadPreset,
      signature
    };
    const uploadRequest = superagent.post(url);
    uploadRequest.attach('file', imageFile);
    Object.keys(params).forEach((key) => {
      uploadRequest.field(key, params[key]);
    });
    return uploadRequest.end((error, response) => {
      if (error) {
        return dispatch(uploadImageFailed(error));
      }
      return dispatch(uploadImageResponse(response.body.url));
    });
  };
