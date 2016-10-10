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
import classNames from 'classnames';

class GalleryItem extends React.Component {

  static propTypes = {
    caption: PropTypes.string.isRequired,
    thumbnail_src: PropTypes.string.isRequired,
  };

  render() {
    var cardClass = classNames(s.card, 'mdl-card', 'mdl-shadow--2dp');
    var titleClass = classNames('mdl-card__title');
    var titleStyle = {
      background:'#fff',
      height:'200px',
      background:'url(\'' + this.props.thumbnail_src + '\') center / cover'
    };
    return (
      <div className={cardClass}>
        <div className={titleClass} style={titleStyle}>
          <h2 className="mdl-card__title-text"></h2>
        </div>
        <div className="mdl-card__supporting-text">
          {this.props.caption}
        </div>
      </div>
    );
  }

}

export default GalleryItem;
