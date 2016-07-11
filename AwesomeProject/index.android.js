/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';

import {
    AppRegistry, StyleSheet, Text, View, Image, TextInput, Dimensions, ScrollView, DeviceEventEmitter
} from 'react-native';

import {AppEntryPoint} from './src/AppEntryPoint';

AppRegistry.registerComponent('Jarvis', () => AppEntryPoint);