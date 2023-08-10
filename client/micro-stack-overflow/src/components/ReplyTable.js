import { Link } from "react-router-dom";

const ReplyTable = (props)=> {
    return (
        <table>
            <thead>
                <tr>
                {/* we could pull the name of the user here */}
                    <th>Author(id)</th>
                    <th>Body</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {props.replies.map(reply => (
                    <tr key={reply.reply_id}>
                        {/* user name would be cooler than user id */}
                        <td>{reply.reply_id}</td>
                        <td>{reply.body}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ReplyTable;