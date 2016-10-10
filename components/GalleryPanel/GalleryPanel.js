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

    var posts = [
      {
        caption: 'Just one more episode #9gag @9gagmobile',
        thumbnail_src: 'https://scontent-nrt1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/14351007_1939234682970443_1842768309_n.jpg?ig_cache_key=MTMzOTg3Nzg0Mzc5MDA3NjI3Ng%3D%3D.2'
      },
      {
        caption: 'This is me in one day #9gag @9gagmobile',
        thumbnail_src: 'https://scontent-nrt1-1.cdninstagram.com/t51.2885-15/e35/c69.0.463.463/14310651_259273864466599_1743258178_n.jpg?ig_cache_key=MTM0MDQ3MTU4Njc1NDg2NDMzMg%3D%3D.2.c'
      }
    ];

    var entries = [];
    var counter = 0;
    for (var z = 0; z < 27; z ++) {
      for (var i = 0; i < posts.length; i++) {
        var post = posts[i];
        post.caption = "doraemon";
        entries.push(<GalleryItem caption={post.caption} thumbnail_src={post.thumbnail_src}
                                  key={"gallery-item-" + counter}/>);
      }
      counter ++;
    }

    ReactDOM.render(<InfiniteGrid entries={entries} width={250} height={250}
                                  lazyCallback={this.infiniteGridLazyCallback.bind(this)} />,
      document.getElementById('grid'));
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
        ReactDOM.render(<InfiniteGrid entries={params.entries} width={250} height={250}
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
