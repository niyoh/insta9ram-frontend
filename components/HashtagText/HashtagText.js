/**
 * Created by Martin on 10/12/16.
 */

import React, { PropTypes } from 'react';
import replaceString from 'react-string-replace';

class HashtagText extends React.Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
  };

  replaceTagsWithLinks(stringParts, matchReplaceSets) {
    if (matchReplaceSets.length == 0) {
      return stringParts;
    }

    var replacedStringParts = [];
    var matchReplaceSet = matchReplaceSets.pop();
    for (var i = 0; i < stringParts.length; i ++) {
      if (typeof stringParts[i] === 'string') {
        var textWithLinks = replaceString(stringParts[i],
          matchReplaceSet.match, matchReplaceSet.replaceFunc);
        replacedStringParts = replacedStringParts.concat(textWithLinks);
      } else {
        replacedStringParts.push(stringParts[i]);
      }
    }

    return this.replaceTagsWithLinks(replacedStringParts, matchReplaceSets);
  }

  render() {
    var textWithLinks = this.replaceTagsWithLinks([this.props.text], [
      {
        match: /@(\w+)/g,
        replaceFunc: (match) => (
          <a href={`https://www.instagram.com/${match}`}>@{match}</a>
        )
      },
      {
        match: /#(\w+)/g,
        replaceFunc: (match) => (
          <a href={`https://www.instagram.com/explore/tags/${match}`}>#{match}</a>
        )
      }
    ]);

    return (
      <span>{textWithLinks}</span>
    );
  }
}

export default HashtagText;
