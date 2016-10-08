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
import s from './GalleryItem.css';

class GalleryItem extends React.Component {

  static propTypes = {
    caption: PropTypes.string.isRequired,
    thumbnail_src: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div style={{
        width: '250px',
        height: '250px',
        overflow: 'hidden'
      }} className={s.root}>
        <p>{this.props.caption}</p>
        <img src={this.props.thumbnail_src} />
      </div>
    );
  }

}

export default GalleryItem;
