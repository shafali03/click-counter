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

// Increment
describe('Increment the click', () => {
  
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
})

// decrement
describe('decrement button', () => {
  test('render decrement button', () => {
    const wrapper = setup()
    const button = findByTestAttr(wrapper, 'decrement-button');
    expect(button.length).toBe(1)
  })

  test('click decrement button the counter display when the state is greater than  0', () => {

  const wrapper = setup()
  const incrementButton = findByTestAttr(wrapper, 'increment-button')
  incrementButton.simulate('click')

  const decrementButton = findByTestAttr(wrapper, 'decrement-button')
  decrementButton.simulate('click')

  const count = findByTestAttr(wrapper, 'count').text()
  expect(count).toBe("0")
  }) 
}) 


describe('Display error when counter goes below 0', () => {
  test('error does not show when not needed', () => {
    const wrapper = setup()
    const errorDiv = findByTestAttr(wrapper, 'error-message');

    const errorHasHiddenClass = errorDiv.hasClass('hidden');
    expect(errorHasHiddenClass).toBe(true)
  })

  describe('counter is 0 when decrement is clicked', () => {

    let wrapper;
    beforeEach(() => {
      wrapper =setup()


      const button = findByTestAttr(wrapper, 'decrement-button');
      button.simulate('click');
      })
      test('error displays', () => {
        // check the class for the error message
        const errorDiv = findByTestAttr(wrapper, 'error-message');
        const errorHasHiddenClass = errorDiv.hasClass('hidden')
        expect(errorHasHiddenClass).toBe(false)
      });

      test('counter still displays 0', () => {
        const count = findByTestAttr(wrapper, 'count').text()
        expect(count).toBe("0");
      });

      test('clicking increment clears the error', () => {
        const incrementButton = findByTestAttr(wrapper, 'increment-button');
        incrementButton.simulate('click')
        
        const errorDiv = findByTestAttr(wrapper, 'error-message')
        const errorHasHiddenClass = errorDiv.hasClass('hidden')
        expect(errorHasHiddenClass).toBe(true)
      })
    })
})