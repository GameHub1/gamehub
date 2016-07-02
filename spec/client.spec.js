import React from 'react';
import {mount, shallow} from 'enzyme';
import expect from 'expect'
import store from '../client/src/reducers/index';
import TestUtils from 'react-addons-test-utils'
import {Logout} from '../client/src/components/logout';

describe('Logout Component', () => {
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

  describe('Logout', () => {
    it('should render correctly', () => {
      const {output} = setup();
      expect(output.type).toBe('button');
      expect(output.props.className).toBe('btn btn-secondary');
    });
  });
});

