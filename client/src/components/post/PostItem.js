import React from 'react'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'
import {connect} from 'react-redux'

import {addLikes, removeLikes, deletePost} from '../../actions/post'

const PostItem = ({auth, post: {_id,  text, name, avatar, user, likes, comments, date}, addLikes, removeLikes, deletePost}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <a href="profile.html">
          <img
            className="round-img"
            src={avatar}
            alt=""
          />
          <h4>{name}</h4>
        </a>
      </div>
      <div>
        <p className="my-1">
          {text}
        </p>
          <p className="post-date">
            <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        <button onClick={e => addLikes(_id)} type="button" className="btn btn-light">
          <i className="fas fa-thumbs-up"></i>
          {likes && likes.length > 0 && <span> {likes.length} </span>}
        </button>
        <button onClick={e => removeLikes(_id)} type="button" className="btn btn-light">
          <i className="fas fa-thumbs-down"></i>
        </button>
        <Link to={`post/${_id}`} className="btn btn-primary">
          Discussion {comments && comments.length > 0 && <span className='comment-count'> {comments.length}</span>}
        </Link>
        {!auth.loading && user === auth.user._id && 
          <button
            onClick={e => deletePost(_id)}
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times"></i>
          </button>
        }
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps, {addLikes, removeLikes, deletePost})(PostItem)
