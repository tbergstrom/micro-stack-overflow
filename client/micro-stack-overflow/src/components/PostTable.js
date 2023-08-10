import { Link } from "react-router-dom";

const PostTable = (props)=> {
    return (
        <table>
            <thead>
                <tr>
                    <th>Author</th>
                    <th>Title</th>
                    <th>Body</th>
                    <th>Number of Replies?</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {props.posts.map(post => (
                    <tr key={post.post_id}>
                        <td>{post.post_id}</td>
                        <td>{post.title}</td>
                        <td>{post.body}</td>
                        <td>
                            <button><Link to={`/post-view/${post.post_id}`}>View Post</Link></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default PostTable;