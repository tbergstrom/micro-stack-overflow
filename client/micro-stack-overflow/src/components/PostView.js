import { Link, useNavigate, useParams } from "react-router-dom"
import AuthContext from "../contexts/AuthContext"
import { useContext, useEffect, useState } from "react"
import ReplyForm from "./ReplyForm";
import ReplyList from "./ReplyList";

// I think once the "View Post" button is pressed (presumably this happens in PostTable), we need to pass in that singular post as a prop to here

const PostView = (props) => {

    const [post, setPost] = useState(null);
    const auth = useContext(AuthContext);
    const user = auth.user;
    const params = useParams();
    const navigate = useNavigate();

    const posts = props.posts;

    // const loadPost = () => {
    //     fetch(`http://localhost:8080/api/microstackoverflow/post/${params.id}`) // placeholder URL
    //     .then(response => response.json())
    //     .then(payload => setPost(payload))
    // };

    // useEffect(loadPosts, []);


    useEffect(()=> {
        const targetPost = props.posts.find(post => post.postId === parseInt(params.id));
        if(targetPost !== undefined || targetPost !== null)  {
            setPost({...targetPost})
        } else {
            navigate("/")
        }
    }, []);

    return (
        <div className="App">

            {/* only logged in */}
            { user && (
                <>
                {/* User Name: */}
                    <h1>{ post.postId }</h1>
                    <p>{ post.postBody }</p>
                    <br/>
                    <p>Here</p>
                    <ReplyForm posts={posts}/>
                    <br/>
                    <ReplyList posts={posts}/>
                </>
            )}

            {/* only logged out */}
            { !user && (
                <>
                    <p>You must be logged in to see this</p>
                    <Link to='/login'>LOGIN</Link>
                    {" "}
                    <Link to='/login'>CREATE ACCOUNT</Link>
                </>
            )}
        </div>
    )
}

export default PostView;