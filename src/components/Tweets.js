import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatTweet, formatDate } from '../utils/helpers';
import { TiArrowBackOutline } from 'react-icons/ti/index'
import { TiHeartOutline } from 'react-icons/ti/index'
import { TiHeartFullOutline } from 'react-icons/ti/index'

class Tweets extends Component {
  toParent = (e, id) => {
    e.parentDefault()
  }
  handleLike = (e) => {
    e.parentDefault();
  }

  render() {
    const { tweet, authedUser } = this.props;

    if (!tweet) {
      return <p> This tweet dosen't exist </p>
    }

    const {
      name, avatar, timestamp, text, hasLiked, likes, replies, parent
    } = tweet;

    return (
      <div className='tweet'>
        <img
          src={avatar}
          alt={`Avatar of ${name}`}
          className='avatar'
        />
        <div className='tweet-info'>
          <div>
            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
            {parent && (
              <button className='replying-to' onClick={(e) => this.toParent(e, parent.id)}>
                Replying to @{parent.author}
              </button>
            )}
            <p>{text}</p>
          </div>
          <div className='tweet-icons'>
            <TiArrowBackOutline className='tweet-icon' />
            <span>{replies !== 0 && replies}</span>
            <button className='heart-button' onClick={this.handleLike}>
              {hasLiked
                ? <TiHeartFullOutline color='#e0245e' className='tweet-icon' />
                : <TiHeartFullOutline className='tweet-icon' />
              }
            </button>
            <span>{likes !== 0 && likes}</span>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ users, tweets, authedUser }, {id}) => {
  const tweet = tweets[id];
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null;
  return {
    authedUser,
    tweet: tweet
      ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
      : null
  }
}

export default connect(mapStateToProps)(Tweets)