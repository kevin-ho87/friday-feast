import React from 'react'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import Home from '../pages/Home'

jest.mock('../fire', () => {

  const firebasemock = require('firebase-mock');

  const mockdatabase = new firebasemock.MockFirebase();
  const mockauth = new firebasemock.MockFirebase();
  const mocksdk = new firebasemock.MockFirebaseSdk(path => {
    return path ? mockdatabase.child(path) : mockdatabase;
  }, () => {
    return mockauth;
  });

  const firebase = mocksdk.initializeApp(); // can take a path arg to database url
  // optional - expose the mock
  global.firebase = firebase;

  // return the mock to match your export api
  return firebase;
});

describe('Should render Home page/component', () => {

  it('snapshot should work', () => {
    const wrapper = mount(<Home />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })


})
