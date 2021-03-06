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
import {IconButton, Menu, MenuItem} from 'react-mdl';
import s from './styles.css';
import Layout from '../../components/Layout';

import GalleryPanel from '../../components/GalleryPanel';

class GalleryPage extends React.Component {

  static propTypes = {
  };

  handleClick(target) {
    switch (target) {
      case 'sort_by_likes':
        this.refs.galleryPanel.postListReset({
          sort: [{
            'field': 'likes',
            'order': 'DESC'
          }],
          maxResult: 10
        });
        break;

      case 'sort_by_comments':
        this.refs.galleryPanel.postListReset({
          sort: [{
            'field': 'comments',
            'order': 'DESC'
          }],
          maxResult: 10
        });
        break;

      case 'sort_by_date':
        this.refs.galleryPanel.postListReset({
          sort: [{
            'field': 'date',
            'order': 'DESC'
          }],
          maxResult: 10
        });
        break;

      case 'all_videos':
        this.refs.galleryPanel.postListReset({
          sort: [{
            'field': 'videos',
            'order': 'DESC'
          }],
          maxResult: 10
        });
        break;

      case 'all_favorites':
        this.refs.galleryPanel.postListReset({
          sort: [{
            'field': 'favorites',
            'order': 'DESC'
          }],
          maxResult: 10
        });
        break;
    }
    this.refs.galleryPanel.postListLoadMore();
  }

  render() {
    return (
      <Layout className={s.content}>
        <div className={s.menu}>
          <IconButton name="more_vert" id="menu-lower-right" />
          <Menu target="menu-lower-right" valign="bottom" align="right">
            <MenuItem onClick={this.handleClick.bind(this, 'sort_by_likes')}>Sort by likes</MenuItem>
            <MenuItem onClick={this.handleClick.bind(this, 'sort_by_comments')}>Sort by comments</MenuItem>
            <MenuItem onClick={this.handleClick.bind(this, 'sort_by_date')}>Sort by date</MenuItem>
            <MenuItem onClick={this.handleClick.bind(this, 'all_favorites')}>All favorites</MenuItem>
            <MenuItem onClick={this.handleClick.bind(this, 'all_videos')}>All videos</MenuItem>
          </Menu>
        </div>

        <h4>Photos & Videos</h4>

        <GalleryPanel ref="galleryPanel" />
      </Layout>
    );
  }

}

export default GalleryPage;
