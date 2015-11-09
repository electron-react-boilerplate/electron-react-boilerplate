import { jsdom } from 'jsdom';
import 'css-modules-require-hook';

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;
