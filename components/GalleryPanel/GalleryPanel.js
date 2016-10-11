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
    };
  }

  infiniteGridLazyCallback() {
    this.postListLoadMore();
  }

  postListReset(params, callback) {
    // (force re-rendering)
    this.setState({
      firstResult: -params.maxResult,
      maxResult: params.maxResult,
      sort: params.sort,
      entries: []
    }, callback);
  }

  postListLoadMore() {
    console.log('postListLoadMore', this.state);

    var params = this.state;
    var _this = this;

    console.log('state', params);

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

        // // render InfiniteGrid
        // ReactDOM.render(<InfiniteGrid entries={params.entries} width={330} height={280}
        //                               lazyCallback={_this.infiniteGridLazyCallback.bind(_this)} />,
        //   document.getElementById('grid'));

        // store state
        params.firstResult = params.firstResult + params.maxResult;
        _this.setState(params);
      })
  }

  componentWillUpdate() {
  }

  componentDidMount() {
    this.postListLoadMore();
  }

  render() {
    console.log('render');

    var entries = [];
    entries.push(<GalleryItem caption="helloworld" thumbnail_src={'https://scontent-nrt1-1.cdninstagram.com/t51.2885-15/e35/c0.17.600.600/14334627_656802444495727_72246080_n.jpg?ig_cache_key=MTM0MDQxMTU0OTI0NDA2OTI3MQ%3D%3D.2.c'}
                              key={"gallery-item-0"}/>);
    entries.push(<GalleryItem caption="helloworld" thumbnail_src={'https://scontent-nrt1-1.cdninstagram.com/t51.2885-15/e35/c0.17.600.600/14334627_656802444495727_72246080_n.jpg?ig_cache_key=MTM0MDQxMTU0OTI0NDA2OTI3MQ%3D%3D.2.c'}
                              key={"gallery-item-1"}/>);
    entries.push(<GalleryItem caption="helloworld" thumbnail_src={'https://scontent-nrt1-1.cdninstagram.com/t51.2885-15/e35/c0.17.600.600/14334627_656802444495727_72246080_n.jpg?ig_cache_key=MTM0MDQxMTU0OTI0NDA2OTI3MQ%3D%3D.2.c'}
                              key={"gallery-item-2"}/>);
    entries.push(<GalleryItem caption="helloworld" thumbnail_src={'https://scontent-nrt1-1.cdninstagram.com/t51.2885-15/e35/c0.17.600.600/14334627_656802444495727_72246080_n.jpg?ig_cache_key=MTM0MDQxMTU0OTI0NDA2OTI3MQ%3D%3D.2.c'}
                              key={"gallery-item-3"}/>);
    entries.push(<GalleryItem caption="helloworld" thumbnail_src={'https://scontent-nrt1-1.cdninstagram.com/t51.2885-15/e35/c0.17.600.600/14334627_656802444495727_72246080_n.jpg?ig_cache_key=MTM0MDQxMTU0OTI0NDA2OTI3MQ%3D%3D.2.c'}
                              key={"gallery-item-4"}/>);
    entries.push(<GalleryItem caption="helloworld" thumbnail_src={'https://scontent-nrt1-1.cdninstagram.com/t51.2885-15/e35/c0.17.600.600/14334627_656802444495727_72246080_n.jpg?ig_cache_key=MTM0MDQxMTU0OTI0NDA2OTI3MQ%3D%3D.2.c'}
                              key={"gallery-item-5"}/>);
    entries.push(<GalleryItem caption="helloworld" thumbnail_src={'https://scontent-nrt1-1.cdninstagram.com/t51.2885-15/e35/c0.17.600.600/14334627_656802444495727_72246080_n.jpg?ig_cache_key=MTM0MDQxMTU0OTI0NDA2OTI3MQ%3D%3D.2.c'}
                              key={"gallery-item-6"}/>);
    entries.push(<GalleryItem caption="helloworld" thumbnail_src={'https://scontent-nrt1-1.cdninstagram.com/t51.2885-15/e35/c0.17.600.600/14334627_656802444495727_72246080_n.jpg?ig_cache_key=MTM0MDQxMTU0OTI0NDA2OTI3MQ%3D%3D.2.c'}
                              key={"gallery-item-7"}/>);
    entries.push(<GalleryItem caption="helloworld" thumbnail_src={'https://scontent-nrt1-1.cdninstagram.com/t51.2885-15/e35/c0.17.600.600/14334627_656802444495727_72246080_n.jpg?ig_cache_key=MTM0MDQxMTU0OTI0NDA2OTI3MQ%3D%3D.2.c'}
                              key={"gallery-item-8"}/>);
    entries.push(<GalleryItem caption="helloworld" thumbnail_src={'https://scontent-nrt1-1.cdninstagram.com/t51.2885-15/e35/c0.17.600.600/14334627_656802444495727_72246080_n.jpg?ig_cache_key=MTM0MDQxMTU0OTI0NDA2OTI3MQ%3D%3D.2.c'}
                              key={"gallery-item-9"}/>);

    return (
      <div className={s.parent}>
        <div className={s.grid} id="grid">
          <InfiniteGrid entries={entries} width={330} height={280} />
        </div>
      </div>
    );
  }
}

export default GalleryPanel;
