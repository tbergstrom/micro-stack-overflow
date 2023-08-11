import { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { useParams } from "react-router-dom";

const ReplyList = (props)=> {
    
    const [replies, setReplies] = useState([]);
    const auth = useContext(AuthContext);
    const params = useParams();

    const postId = props.postId;


    // for post in posts
    // if post.postId === params.id
    // then let targetPost = post

    // for reply in replies
    // if reply.postId === targetPost.postId
    // display reply

    const loadReplies = () => {
        fetch(`http://localhost:8080/api/microstackoverflow/reply/${params.id}`) // placeholder URL
        .then(response => response.json())
        .then(payload => setReplies(payload))
    };

    console.log(replies);
    
    useEffect(loadReplies, []);

    return (
        // <p>Replies</p>
        <table>
            <tbody>
                {replies.map(reply => <tr key={reply.id}>
                    {/* TODO: Figure out how to get the username into this first spot instead of the reply_id */}
                    <td>{reply.replyId}</td>
                    <td>{reply.replyBody}</td>
                </tr>)}
            </tbody>
        </table>
  );
}

export default ReplyList;