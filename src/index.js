import App from './App';
import 'file-loader?name=[name].[ext]!./index.html';
import 'file-loader?name=[name].[ext]!./favicon.ico';
import 'normalize.css';
import './stylesheets/style.scss';

new App();
