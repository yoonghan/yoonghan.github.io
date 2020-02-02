import * as React from 'react';
import ConstructionSplashScreen from "../ConstructionSplashScreen";
import Footer from "../Footer";
import HeaderOne from "../HeaderOne";
import HorizontalLine from "../HorizontalLine";
import Logo from "../Logo";
import MainLayout from "../MainLayout";
import RainDrop from "../RainDrop";
import ScrollToTop from "../ScrollToTop";

import { shallow } from 'enzyme';

describe('Basic Components', () => {
  describe('Construction Splash Screens', () => {
    it('renders normally', () => {
      const wrapper = shallow(<ConstructionSplashScreen/>);
      expect(wrapper.debug()).toMatchSnapshot();
    })
  }),
  describe('Footer', () => {
    it('renders normally', () => {
      const wrapper = shallow(<Footer/>);
      expect(wrapper.debug()).toMatchSnapshot();
    })
  }),
  describe('Header One', () => {
    it('renders normally', () => {
      const wrapper = shallow(<HeaderOne/>);
      expect(wrapper.debug()).toMatchSnapshot();
    })
  }),
  describe('Horizontal Line', () => {
    it('renders normally', () => {
      const wrapper = shallow(<HorizontalLine/>);
      expect(wrapper.debug()).toMatchSnapshot();
    })
  }),
  describe('Logo', () => {
    it('renders normally', () => {
      const wrapper = shallow(<Logo/>);
      expect(wrapper.debug()).toMatchSnapshot();
    }),
    it('renders with text normally', () => {
      const wrapper = shallow(<Logo withText={true}/>);
      expect(wrapper.debug()).toMatchSnapshot();
    })
  }),
  describe('Main Layout', () => {
    it('renders normally', () => {
      const wrapper = shallow(<MainLayout/>);
      expect(wrapper.debug()).toMatchSnapshot();
    })
  }),
  describe('Rain drop', () => {
    it('renders normally', () => {
      const wrapper = shallow(<RainDrop/>);
      expect(wrapper.debug()).toMatchSnapshot();
    })
  }),
  describe('Scroll To Top', () => {
    it('renders normally', () => {
      const wrapper = shallow(<ScrollToTop/>);
      expect(wrapper.debug()).toMatchSnapshot();
    })
  })
});
