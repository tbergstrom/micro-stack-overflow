import { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";

const ReplyList = (props)=> {
    
    const [replies, setReplies] = useState([]);
    const auth = useContext(AuthContext);

    const loadReplies = () => {
        fetch("http://localhost:8080/api/replylist")
        .then(response => response.json())
        .then(payload => setReplies(payload))
    };
    
    useEffect(loadReplies, []);

    return (
        <table>
            <tbody>
                {replies.map(reply => <tr key={reply.id}>
                    {/* TODO: Figure out how to get the username into this first spot instead of the reply_id */}
                    <td>{reply.reply_id}</td>
                    <td>{reply.body}</td>
                </tr>)}
            </tbody>
        </table>
  );
}

export default ReplyList;