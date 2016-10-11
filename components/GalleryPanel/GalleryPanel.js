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
    //this.state = {

    this.gridStorage = {
      firstResult: -10,
      maxResult: 10,
      sort: [{
        'field': 'date',
        'order': 'DESC'
      }],
      entries: []
    };
  }

  infiniteGridLazyCallback() {
    this.postListLoadMore();
  }

  postListReset(params, callback) {
    // (force re-rendering)
    //this.setState({

    this.gridStorage = {
      firstResult: -params.maxResult,
      maxResult: params.maxResult,
      sort: params.sort,
      entries: []
    };
    callback();

    //}, callback);
  }

  postListLoadMore() {
    //var newState = this.state;
    var newState = this.gridStorage;
    var _this = this;

    fetch(`${config.API_ENDPOINT}/posts?` +
      `firstResult=${newState.firstResult + newState.maxResult}&` +
      `maxResult=${newState.maxResult}&` +
      `sort=${encodeURI(JSON.stringify(newState.sort))}`)
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
        newState.entries = newState.entries.concat(newEntries);

        // render InfiniteGrid
        ReactDOM.render(<InfiniteGrid entries={newState.entries} width={330} height={280}
                                      lazyCallback={_this.infiniteGridLazyCallback.bind(_this)} />,
          document.getElementById('grid'));

        // store state
        newState.firstResult = newState.firstResult + newState.maxResult;
        console.log('postListLoadMore:end', newState);

        _this.gridStorage = newState;
        //_this.setState(newState);
      })
  }

  componentDidMount() {
    this.postListLoadMore();
  }

  render() {
    console.log('&&&&&&& render once &&&&&&');
    return (
      <div className={s.parent}>
        <div className={s.grid} id="grid">
        </div>
      </div>
    );
  }
}

export default GalleryPanel;
