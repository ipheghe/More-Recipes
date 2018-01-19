
import prodConfigstore from './configureStore.prod';
import devConfigstore from './configureStore.dev';

export default process.env.NODE_ENV === 'production'
  ? prodConfigstore : devConfigstore;
