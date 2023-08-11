
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";


const PostTable = (props)=> {
    // const [author, setAuthor] = useState([]);
    // const params = useParams();

    // const loadAuthor = () => {
    //     fetch(`http://localhost:8080/api/microstackoverflow/post/${params.id}`) // placeholder URL
    //     .then(response => response.json())
    //     .then(payload => setAuthor(payload))
    // };

    // useEffect(loadAuthor, []);

    // console.log(author);

    return (
        <table>
            <thead>
                <tr>
                    <th>Author</th>
                    <th>Title</th>
                    <th>Number of Replies?</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {props.posts.map(post => (
                    <tr key={post.postId}>
                        <td>{post.appUser.username}</td>
                        <td>{post.postTitle}</td>
                        <td>{post.replies.length}</td>
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