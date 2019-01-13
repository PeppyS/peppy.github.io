import axios from 'axios'
import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'
import Comments from '../Comments'
import Links from '../Links'
import './style.scss'
import { getSessionId } from '../../utils';

class PostTemplateDetails extends React.Component {
  state = {
    comments: [],
    likesCount: 0,
  }

  componentDidMount() {
    this.fetchPost()
  }

  async fetchPost() {
    const post = this.props.data.markdownRemark

    const response = await axios.get(`${process.env.GATSBY_API_BASE_URL}/blog/posts/${post.frontmatter.id}`)

    const { data } = response.data

    this.setState({
      comments: data.comments,
      likesCount: data.likes_count
    })
  }

  async postComment(text, name) {
    const post = this.props.data.markdownRemark

    const response = await axios.post(`${process.env.GATSBY_API_BASE_URL}/blog/posts/${post.frontmatter.id}/comments`, {
      text,
      name,
    }, {
      headers: {
        'X-Session-ID': getSessionId(),
      },
    })

    this.fetchPost()
  }

  async deleteComment(id) {
    const post = this.props.data.markdownRemark

    await axios.delete(`${process.env.GATSBY_API_BASE_URL}/blog/posts/${post.frontmatter.id}/comments/${id}`, {
      headers: {
        'X-Session-ID': getSessionId(),
      },
    })

    this.fetchPost()
  }

  render() {
    const { comments } = this.state
    const { subtitle, author } = this.props.data.site.siteMetadata
    const post = this.props.data.markdownRemark
    const tags = post.fields.tagSlugs

    const homeBlock = (
      <div>
        <Link className="post-single__home-button" to="/">
          Back
        </Link>
      </div>
    )

    const tagsBlock = (
      <div className="post-single__tags">
        <ul className="post-single__tags-list">
          {tags &&
            tags.map((tag, i) => (
              <li className="post-single__tags-list-item" key={tag}>
                <Link to={tag} className="post-single__tags-list-item-link">
                  {post.frontmatter.tags[i]}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    )

    return (
      <div>
        {homeBlock}
        <div className="post-single">
          <div className="post-single__inner">
            <h1 className="post-single__title">{post.frontmatter.title}</h1>
            <div
              className="post-single__body"
              /* eslint-disable-next-line react/no-danger */
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
            <div className="post-single__date">
              <em>
                Published {moment(post.frontmatter.date).format('D MMM YYYY')}
              </em>
            </div>
          </div>
          <div className="post-single__footer">
            {tagsBlock}
            <hr />
            <div className="post-single__footer-text">
              <span dangerouslySetInnerHTML={{ __html: subtitle }}></span>
              <Links data={author} />
            </div>
            <Comments comments={comments} postComment={this.postComment.bind(this)} handleDelete={this.deleteComment.bind(this)} />
          </div>
        </div>
      </div>
    )
  }
}

export default PostTemplateDetails
