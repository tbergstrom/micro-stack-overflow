import { Link } from "react-router-dom";

const PostTable = (props)=> {

    console.log(props);
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
                    <tr key={post.postId}>
                        <td>{post.postId}</td>
                        <td>{post.postTitle}</td>
                        <td>{post.postBody}</td>
                        <td>Some number</td>
                        <td>
                            <button><Link to={`/postview/${post.postId}`}>View Post</Link></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default PostTable;