import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import $ from 'jquery';

global.$ = $;
$.prototype.modal = () => { };
global.toString = () => { };

global.CLOUDINARY_IMG_URL_STUB = 'cloudinary-stub';

configure({ adapter: new Adapter() });
