import * as React from 'react';
import {mount} from 'enzyme';
import IndexPage from '../pages/index';
import AboutPage from '../pages/about';
import CreationPage from '../pages/creation';

//Rewrite router.
jest.mock("next/router");

describe('Pages', () => {
  describe('Index', () => {
    it('should contain commandbar', function () {
      const wrap = mount(<IndexPage/>);

      expect(wrap.find('#commandbar').exists()).toBe(true);
    })
  })
  describe('About', () => {
    it('should contain commandbar', function () {
      const wrap = mount(<AboutPage/>);

      expect(wrap.find('#commandbar').exists()).toBe(true);
    })
  }),
  describe('Creation', () => {
    it('should contain commandbar', function () {
      const wrap = mount(<CreationPage/>);

      expect(wrap.find('#commandbar').exists()).toBe(true);
    })
  })
});
