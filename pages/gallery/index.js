/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import s from './styles.css';
import Layout from '../../components/Layout';

import GalleryPanel from '../../components/GalleryPanel';

class GalleryPage extends React.Component {

  static propTypes = {
  };

  componentDidMount() {
    console.log('didMount');
  }

  render() {
    return (
      <Layout className={s.content}>
        <h4>Photos & Videos</h4>
        <GalleryPanel />
      </Layout>
    );
  }

}

export default GalleryPage;
