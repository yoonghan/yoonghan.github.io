import * as React from 'react';
import {mount} from 'enzyme';
import IndexPage from '../pages/index';
import AboutPage from '../pages/about';
import CreationPage from '../pages/creation';
import TributePage from '../pages/tribute';
import ManipulatorPage from '../pages/manipulator';

//Rewrite router.
jest.mock("next/router");

describe('Pages', () => {
  describe('Index', () => {
    it('should contain commandbar', function () {
      const wrap = mount(<IndexPage termsRead={"false"}/>);
      expect(wrap.find('#commandbar').exists()).toBe(true);
    })
  }),
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
  }),
  describe('Tribute', () => {
    it('should contain commandbar', function () {
      const wrap = mount(<TributePage/>);
      expect(wrap.find('#commandbar').exists()).toBe(true);
    })
  }),
  describe('Manipulator', () => {
    it('should contain commandbar', function () {
      /** Will throw exception, i.e. wrapped not called. **/
      const wrap = mount(<ManipulatorPage/>);
      expect(wrap.find('#commandbar').exists()).toBe(true);
    })
  })
});
