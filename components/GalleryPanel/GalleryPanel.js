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
import ReactDOM from 'react-dom';
import s from './GalleryPanel.css';
import Measure from 'react-measure';

//import InfiniteGrid from 'react-infinite-grid';
import InfiniteGrid from '../InfiniteGrid/grid'
import GalleryItem from '../GalleryItem';

class GalleryPanel extends React.Component {

  static propTypes = {
  };

  componentWillUpdate() {
    console.log('[willUpdate] grid width:' + document.getElementById('grid').offsetWidth);
  }

  componentDidMount() {
    console.log('GalleryPanel: didMount', document.getElementById('grid'));

    var posts = [
      {
        caption: 'Just one more episode #9gag @9gagmobile',
        thumbnail_src: 'https://scontent-nrt1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/14351007_1939234682970443_1842768309_n.jpg?ig_cache_key=MTMzOTg3Nzg0Mzc5MDA3NjI3Ng%3D%3D.2'
      },
      {
        caption: 'This is me in one day #9gag @9gagmobile',
        thumbnail_src: 'https://scontent-nrt1-1.cdninstagram.com/t51.2885-15/e35/c69.0.463.463/14310651_259273864466599_1743258178_n.jpg?ig_cache_key=MTM0MDQ3MTU4Njc1NDg2NDMzMg%3D%3D.2.c'
      },
      {
        caption: 'Just one more episode #9gag @9gagmobile',
        thumbnail_src: 'https://scontent-nrt1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/14351007_1939234682970443_1842768309_n.jpg?ig_cache_key=MTMzOTg3Nzg0Mzc5MDA3NjI3Ng%3D%3D.2'
      },
      {
        caption: 'This is me in one day #9gag @9gagmobile',
        thumbnail_src: 'https://scontent-nrt1-1.cdninstagram.com/t51.2885-15/e35/c69.0.463.463/14310651_259273864466599_1743258178_n.jpg?ig_cache_key=MTM0MDQ3MTU4Njc1NDg2NDMzMg%3D%3D.2.c'
      },
      {
        caption: 'Just one more episode #9gag @9gagmobile',
        thumbnail_src: 'https://scontent-nrt1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/14351007_1939234682970443_1842768309_n.jpg?ig_cache_key=MTMzOTg3Nzg0Mzc5MDA3NjI3Ng%3D%3D.2'
      },
      {
        caption: 'This is me in one day #9gag @9gagmobile',
        thumbnail_src: 'https://scontent-nrt1-1.cdninstagram.com/t51.2885-15/e35/c69.0.463.463/14310651_259273864466599_1743258178_n.jpg?ig_cache_key=MTM0MDQ3MTU4Njc1NDg2NDMzMg%3D%3D.2.c'
      },
      {
        caption: 'Just one more episode #9gag @9gagmobile',
        thumbnail_src: 'https://scontent-nrt1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/14351007_1939234682970443_1842768309_n.jpg?ig_cache_key=MTMzOTg3Nzg0Mzc5MDA3NjI3Ng%3D%3D.2'
      },
      {
        caption: 'This is me in one day #9gag @9gagmobile',
        thumbnail_src: 'https://scontent-nrt1-1.cdninstagram.com/t51.2885-15/e35/c69.0.463.463/14310651_259273864466599_1743258178_n.jpg?ig_cache_key=MTM0MDQ3MTU4Njc1NDg2NDMzMg%3D%3D.2.c'
      },
      {
        caption: 'Just one more episode #9gag @9gagmobile',
        thumbnail_src: 'https://scontent-nrt1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/14351007_1939234682970443_1842768309_n.jpg?ig_cache_key=MTMzOTg3Nzg0Mzc5MDA3NjI3Ng%3D%3D.2'
      },
      {
        caption: 'This is me in one day #9gag @9gagmobile',
        thumbnail_src: 'https://scontent-nrt1-1.cdninstagram.com/t51.2885-15/e35/c69.0.463.463/14310651_259273864466599_1743258178_n.jpg?ig_cache_key=MTM0MDQ3MTU4Njc1NDg2NDMzMg%3D%3D.2.c'
      },
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
    for (var i = 0; i < posts.length; i ++) {
      var post = posts[i];
      entries.push(<GalleryItem caption={post.caption} thumbnail_src={post.thumbnail_src} key={"gallery-item-" + i} />);
    }

    console.log('[didMount] grid width:' + document.getElementById('grid').offsetWidth);
    ReactDOM.render(<InfiniteGrid wrapperHeight={400} width={250} height={277} entries={entries} />,
      document.getElementById('grid'));
  }

  render() {
    return (
      /*<Measure onMeasure={(dimensions) => {
        console.log("dimensions", dimensions, this);
      }}
      >*/
        <div id="grid">
        </div>
      //</Measure>
    );
  }
}

export default GalleryPanel;
