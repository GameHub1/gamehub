import React from 'react';
import {mount, shallow} from 'enzyme';
import expect from 'expect'
import store from '../client/src/reducers/index';
import TestUtils from 'react-addons-test-utils'
import {Logout} from '../client/src/components/logout';
import {RootComponent} from '../client/src/components/root_component';

function setup() {
  let props = {
    addTodo: expect.createSpy(),
    store: store
  };

  let renderer = TestUtils.createRenderer();
  renderer.render(<Logout {...props} />);
  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

describe('Root Component', () => {
  describe('RootComponent', () => {
    it ('should render Auth0 Login if no session available', () => {
      const {output} = setup();
      console.log('hiiii', output);
    });
  });
});

describe('Logout Component', () => {
  describe('Logout', () => {
    it('should render correctly', () => {
      const {output} = setup();
      expect(output.type).toBe('button');
      expect(output.props.className).toBe('btn btn-secondary');
    });
  });
});

