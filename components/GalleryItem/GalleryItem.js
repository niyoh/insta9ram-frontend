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
import {Card, CardTitle, CardText, CardActions} from 'react-mdl';
import s from './GalleryItem.css';
import classNames from 'classnames';
import Video from 'react-html5video';
import TimeAgo from 'react-timeago';
import timeagoShortForm from 'react-timeago/lib/language-strings/en-short';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import HashtagText from '../HashtagText';

class GalleryItem extends React.Component {

  static propTypes = {
    caption: PropTypes.string.isRequired,
    thumbnail_src: PropTypes.string.isRequired,
  };

  render() {
    var cardClass = classNames(s.card, 'mdl-card', 'mdl-shadow--2dp');
    var titleClass = classNames('mdl-card__title');
    var supportingTextClass = classNames(s.text, 'mdl-card__supporting-text');
    var timeagoFormatter = buildFormatter(timeagoShortForm);

    var supportingText = (
      <CardText className={supportingTextClass}>
        <div className={s.timeago}>
          <TimeAgo date={this.props.date} formatter={timeagoFormatter} />
        </div>
        <HashtagText text={this.props.caption} />
      </CardText>
    );

    if (this.props.is_video === "True") {

      var titleStyle = {
        background:'#fff',
        height:'200px',
        overflow:'hidden'
      };
      return (
        <Card className={cardClass}>
          <Video controls autoPlay loop muted
            poster={this.props.thumbnail_src}
            className={titleClass} style={titleStyle}>
            <source src={this.props.video_url} type="video/webm" />
          </Video>
          {supportingText}
        </Card>
      )

    } else {

      var titleStyle = {
        background:'#fff',
        height:'200px',
        background:'url(\'' + this.props.thumbnail_src + '\') center / cover'
      };
      return (
        <Card className={cardClass}>
          <CardTitle className={titleClass} style={titleStyle}>
            <h2 className="mdl-card__title-text"></h2>
          </CardTitle>
          {supportingText}
        </Card>
      )
    }
  }

}

export default GalleryItem;
