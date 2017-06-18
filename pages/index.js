import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';

import Header from '../components/header';

import { initStore } from '../store.js';

import * as TEST_ACTIONS from '../ducks/test.js';

class Index extends Component {
  static getInitialProps = async ({store, isServer}) => {
    const res = await store.dispatch(TEST_ACTIONS.doTest({data: null}));
    return { isServer };
  }

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <Header />
        Model is: {this.props.test.get('time')}
      </div>
    );
  }
}

const stateToProps = (state) => {
  return {
    test: state.test
  }
};

export default withRedux(initStore, stateToProps)(Index);
