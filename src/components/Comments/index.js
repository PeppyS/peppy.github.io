import React from 'react'
import './styles.scss'

export default class Comments extends React.Component {
    render() {
        const { comments } = this.props

        return (
            <div className="comments">
                {comments.map(comment => (
                    <div className="comment-wrap">
                        <div className="photo">
                            <div className="avatar" style={{ backgroundImage: "url('https://s3.amazonaws.com/uifaces/faces/twitter/dancounsell/128.jpg')" }}></div>
                        </div>
                        <div className="comment-block">
                            <p className="comment-text">{comment.text}</p>
                            <div className="bottom-comment">
                                <div className="comment-date">{comment.created_at}</div>
                                <br/>
                                <div className="comment-date">{comment.first_name} {comment.last_name}</div>
                                <ul className="comment-actions">
                                    <li className="complain">Like</li>
                                    <li className="reply">Reply</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="comment-wrap">
                    <div className="photo">
                        <div className="avatar" style={{ backgroundImage: "url('https://s3.amazonaws.com/uifaces/faces/twitter/dancounsell/128.jpg')" }}></div>
                    </div>
                    <div className="comment-block">
                        <form action="">
                            <textarea name="" id="" cols="30" rows="3" placeholder="Add comment..."></textarea>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
