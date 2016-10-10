/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import * as config from '../../core/config';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import fetch from 'isomorphic-fetch';
import s from './GalleryPanel.css';

//import InfiniteGrid from 'react-infinite-grid';
import InfiniteGrid from '../InfiniteGrid/grid'
import GalleryItem from '../GalleryItem';

class GalleryPanel extends React.Component {

  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.state = {
      firstResult: -10,
      maxResult: 10,
      sort: [{
        'field': 'date',
        'order': 'DESC'
      }],
      entries: []
    }
  }

  infiniteGridLazyCallback() {
    console.log('lazy');
    this._loadMorePosts();
  }

  _loadMorePosts() {
    var params = this.state;
    var _this = this;
    fetch(`${config.API_ENDPOINT}/posts?` +
      `firstResult=${params.firstResult + params.maxResult}&` +
      `maxResult=${params.maxResult}&` +
      `sort=${encodeURI(JSON.stringify(params.sort))}`)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(posts) {
        var newEntries = [];
        for (var i = 0; i < posts.length; i ++) {
          var post = posts[i];
          newEntries.push(<GalleryItem caption={post.caption} thumbnail_src={post.thumbnail_src}
                                    key={"gallery-item-" + i}/>);
        }

        // add to entries
        params.entries = params.entries.concat(newEntries);

        // render InfiniteGrid
        ReactDOM.render(<InfiniteGrid entries={params.entries} width={330} height={270}
                                      lazyCallback={_this.infiniteGridLazyCallback.bind(_this)} />,
          document.getElementById('grid'));

        // store state
        params.firstResult = params.firstResult + params.maxResult;
        _this.setState(params);
      })
  }

  componentWillUpdate() {
    console.log('[willUpdate] grid width:' + document.getElementById('grid').offsetWidth);
  }

  componentDidMount() {
    console.log('GalleryPanel: didMount', document.getElementById('grid'));
    this._loadMorePosts();
  }

  render() {
    return (
      <div className={s.parent}>
        <div className={s.grid} id="grid">
        </div>
      </div>
    );
  }
}

export default GalleryPanel;
