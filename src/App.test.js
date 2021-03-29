import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter()})

/**
 * @function setup
 * @returns {ShallowWrapper}
 * 
 */

const setup = () => shallow(<App />)

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);


test('render without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
})

test('render button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'increment-button');
  expect(button.length).toBe(1);
})

test('renders counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper,'counter-display')
  expect(counterDisplay.length).toBe(1)
})

test('counter starts at 0', () => {
  const wrapper = setup()
  const count = findByTestAttr(wrapper, 'count').text()
  expect(count).toBe("0");
})

test('clicking on button increments counter display', () => {
  const wrapper = setup()
  // find the button
  const button = findByTestAttr(wrapper, 'increment-button')
  // click  the button
  button.simulate('click')

  // find the displays, and test that number has been incremented
  const count = findByTestAttr(wrapper, 'count').text();
  expect(count).toBe("1")
})

test('render decrement button', () => {
  const wrapper = setup()
  const button = findByTestAttr(wrapper, 'decrement-button');
  expect(button.length).toBe(1)
})