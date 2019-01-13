import React from 'react'

import { getSessionId } from '../../utils'

import './styles.scss'

export default class CommentSection extends React.Component {
    state = {
        newComment: {
            text: '',
            name: '',
        }
    }

    handleNewCommentInputChange(e) {
        this.setState({
            newComment: {
                ...this.state.newComment,
                [e.target.name]: e.target.value,
            }
        })
    }

    async handleNewCommentSubmission(e) {
        e.preventDefault()

        const { postComment } = this.props
        const { text, name } = this.state.newComment

        try {
            await postComment(text, name)
            this.setState({
                newComment: {
                    text: '',
                    name: '',
                }
            })
        } catch (err) {
            console.log('SHOW MESSAGE', err.message)
        }
    }

    render() {
        const { comments, handleDelete } = this.props
        const { newComment } = this.state

        return (
            <div className="comments">
                {comments
                    .sort((a, b) => b.created_at < a.created_at ? 1 : -1)
                    .map((comment, i) => (
                        <Comment
                            key={i}
                            id={comment.id}
                            avatarImageURL="https://s3.amazonaws.com/uifaces/faces/twitter/dancounsell/128.jpg"
                            text={comment.text}
                            createdAt={comment.created_at}
                            name={comment.name}
                            isOwner={true || comment.is_owner}
                            handleDelete={handleDelete}
                        />
                    ))}

                <AddComment
                    avatarImageURL="https://s3.amazonaws.com/uifaces/faces/twitter/dancounsell/128.jpg"
                    text={newComment.text}
                    name={newComment.name}
                    handleInputChange={this.handleNewCommentInputChange.bind(this)}
                    handleSubmit={this.handleNewCommentSubmission.bind(this)}
                />
            </div>
        )
    }
}

const Comment = ({ avatarImageURL, id, text, createdAt, name, isOwner, handleDelete }) => (
    <div className="comment-wrap">
        <div className="photo">
            <div className="avatar" style={{ backgroundImage: `url('${avatarImageURL}')` }}></div>
        </div>
        <div className="comment-block">
            <p className="comment-text">{text}</p>
            <div className="bottom-comment">
                <div className="comment-date">{createdAt}</div>
                <br />
                <div className="comment-date">{name}</div>
                <ul className="comment-actions">
                    <li className="complain">Like</li>

                    {isOwner && <li className="reply" onClick={() => handleDelete(id)}>Delete</li>}
                    {!isOwner && <li className="reply">Reply</li>}
                </ul>
            </div>
        </div>
    </div>
)

const AddComment = ({ avatarImageURL, text, name, handleInputChange, handleSubmit }) => {
    return (
        <div className="comment-wrap">
            <div className="photo">
                <div className="avatar" style={{ backgroundImage: `url('${avatarImageURL}')` }}></div>
            </div>
            <div className="comment-block">
                <form onSubmit={handleSubmit}>
                    <textarea name="text" value={text} id="" cols="30" rows="3" placeholder="Add comment..." onChange={handleInputChange}>
                    </textarea>
                    <div className="bottom-comment">
                        Display Name: <input type="text" name="name" value={name} placeholder="Enter here..." onChange={handleInputChange} />
                    </div>
                </form>
            </div>
        </div>
    )
}
