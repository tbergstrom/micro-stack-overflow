import { Link } from "react-router-dom";

const ReplyTable = (props)=> {

    const replies = props.replies;
    const loadReplies = props.loadReplies;

    return (
        <>
            <>{replies.length} {replies.length !== 1 ? <>replies</> : <>reply</>}</>
            <table>
                <tbody>
                    {replies.map(reply => <tr key={reply.replyId}>
                        {/* TODO: Figure out how to get the username into this first spot instead of the reply_id */}
                        <td>{reply.appUser.username}: </td>
                        <td>{reply.replyBody}</td>
                    </tr>)}
                </tbody>
            </table>
        </>
    )
}

export default ReplyTable;