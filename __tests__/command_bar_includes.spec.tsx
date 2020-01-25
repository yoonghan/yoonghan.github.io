import * as React from 'react';
import { mount} from 'enzyme';
import IndexPage from '../pages/index';
import AboutPage from '../pages/about';
import CreationPage from '../pages/creation';
import TributePage from '../pages/tribute';
import ManipulatorPage from '../pages/manipulator';

//Increase wait time
jest.setTimeout(30000);

//Rewrite router.
jest.mock("next/router");

//Rewrite dynamic.
jest.mock('next/dynamic');

const waitNextTick = async () => {
  return new Promise(resolve => setTimeout(resolve, 2000));
}

const mountInitialComponent = async (component: any) => {
  const wrapper = mount(component);
  await waitNextTick();
  wrapper.update();
  return wrapper;
};

describe('Pages', () => {
  describe('Index', () => {
    it('should contain commandbar', async () => {
      const wrap = await mountInitialComponent(<IndexPage termsRead={"false"}/>);
      expect(wrap.find('#commandbar').exists()).toBe(true);
    })
  }),
  describe('Index', () => {
    it('should contain commandbar', async () => {
      const wrap = await mountInitialComponent(<IndexPage termsRead={"false"}/>);
      expect(wrap.find('#commandbar').exists()).toBe(true);
    })
  }),
  describe('About', () => {
    it('should contain commandbar', async () => {
      const wrap = await mountInitialComponent(<AboutPage/>);
      expect(wrap.find('#commandbar').exists()).toBe(true);
    })
  }),
  describe('Creation', () => {
    it('should contain commandbar', async () => {
      const wrap = await mountInitialComponent(<CreationPage/>);
      expect(wrap.find('#commandbar').exists()).toBe(true);
    })
  }),
  describe('Tribute', () => {
    it('should contain commandbar', async () => {
      const wrap = await mountInitialComponent(<TributePage/>);
      expect(wrap.find('#commandbar').exists()).toBe(true);
    })
  }),
  describe('Manipulator', () => {
    it('should contain commandbar', async () => {
      /** Will throw exception, i.e. wrapped not called. **/
      const wrap = await mountInitialComponent(<ManipulatorPage/>);
      expect(wrap.find('#commandbar').exists()).toBe(true);
    })
  })
});
