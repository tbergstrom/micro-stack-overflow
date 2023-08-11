import { Link, useNavigate, useParams } from "react-router-dom"
import AuthContext from "../contexts/AuthContext"
import { useContext, useEffect, useState } from "react"
import ReplyForm from "./ReplyForm";
import ReplyList from "./ReplyList";

const PostView = (props) => {

    const [replies, setReplies] = useState([]);
    const [repliesCounter, setRepliesCounter] = useState(0);
    const [post, setPost] = useState(null);
    const auth = useContext(AuthContext);
    const user = auth.user;
    const params = useParams();
    const navigate = useNavigate();

    const posts = props.posts;

    const loadReplies = () => {
        fetch(`http://localhost:8080/api/microstackoverflow/reply/${params.id}`)
        .then(response => response.json())
        .then(payload => setReplies(payload))
    };

    useEffect(()=> {
        const targetPost = props.posts.find(post => post.postId === parseInt(params.id));
        if(targetPost !== undefined || targetPost !== null)  {
            setPost({...targetPost})
        } else {
            navigate("/")
        }
    }, [props.posts, params.id]);

    return (
        <div className="App">

            {/* only logged in */}
            { user && post && (
                <>
                {/* User Name: */}
                    <h3>{ post.postTitle}</h3>
                    <p>posted by {post.appUser && post.appUser.username}</p>
                    <p>{ post.postBody }</p>
                    <br/>
                    <ReplyForm posts={posts} postId={post.postId} loadReplies={loadReplies} setRepliesCounter={setRepliesCounter}/>
                    <br/>
                    <ReplyList posts={posts} repliesCounter={repliesCounter} loadReplies={loadReplies}/>
                </>
            )}

            {/* only logged out */}
            { !user && (
                <>
                    <p>You must be logged in to see this</p>
                    <Link to='/login'>LOGIN</Link>
                    {" "}
                    <Link to='/create_account'>CREATE ACCOUNT</Link>
                </>
            )}
        </div>
    )
}

export default PostView;