import React, { Component } from 'react';
import Header from '../components/header';
import Head from 'next/head'

import App from 'grommet/components/App';
import Button from 'grommet/components/Button';

class About extends Component {
  static getInitialProps ({query}) {
    console.log(query, '<<<<');
    return {name: query.name};
  }
  constructor () {
    super();

    this.onBtnClick = this.onBtnClick.bind(this);
  }

  onBtnClick (e) {
    e.preventDefault();

    console.log('Button clicked!!!');
  }

  render () {
    return (
      <App centered={true}>
        <Head>
          <link href="//cdnjs.cloudflare.com/ajax/libs/grommet/1.0.1/grommet.min.css" rel="stylesheet" type="text/css" />
        </Head>
        <Header />
        <Button primary={true} label={`Hello ${this.props.name || 'Guest'}!`} onClick={this.onBtnClick}/>
        About us page!!
      </App>
    );
  }
}

export default About;
