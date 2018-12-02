import React from 'react'
import './styles.scss'

export default class Comments extends React.Component {
    render() {
        return (
            <div className="comments">
                <div className="comment-wrap">
                    <div className="photo">
                        <div className="avatar" style={{ backgroundImage: "url('https://s3.amazonaws.com/uifaces/faces/twitter/dancounsell/128.jpg')" }}></div>
                    </div>
                    <div className="comment-block">
                        <p className="comment-text">Great write-up! Keep up the good work.</p>
                        <div className="bottom-comment">
                            <div className="comment-date">Aug 23, 2014 @ 10:32 AM</div>
                            <ul className="comment-actions">
                                <li className="complain">Like</li>
                                <li className="reply">Reply</li>
                            </ul>
                        </div>
                    </div>
                </div>
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
