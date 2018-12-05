import axios from 'axios'
import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'
import Comments from '../Comments'
import Links from '../Links'
import './style.scss'

class PostTemplateDetails extends React.Component {
  state = {
    comments: [],
    likesCount: 0,
  }

  componentDidMount() {
    this.fetchPost()
  }

  async fetchPost() {
    const response = await axios.get('https://api.peppysisay.com/blog/posts/3')

    const { data } = response.data

    this.setState({
      comments: data.comments,
      likesCount: data.likes_count
    })
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
            <Comments comments={comments} />
          </div>
        </div>
      </div>
    )
  }
}

export default PostTemplateDetails
