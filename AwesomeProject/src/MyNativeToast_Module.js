'use strict';
/**
 * This exposes the native MyNativeToast module as a JS module. This has a
 * function 'show' which takes the following parameters:
 * 1. String message: A string with the text to toast
 * 2. int duration: The duration of the toast. May be MyNativeToast.SHORT or MyNativeToast.LONG
 *
 * There are 3 variants of this function ... one is simple, one is w/ callbacks, and one is w/ promise!
 */
import {NativeModules} from 'react-native';
module.exports = NativeModules.MyNativeToast;
