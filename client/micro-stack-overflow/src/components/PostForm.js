import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const PostForm = (props)=> {
    const params = useParams();
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const [errors, setErrors] = useState([]);

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const resetState = ()=> {
        setTitle("");
        setBody("");
    }

    useEffect(()=> {
        if(params.id !== undefined) {
            const targetPost = props.posts.find(post => post.post_id === parseInt(params.id))
            if(targetPost !== undefined) {
                setTitle(targetPost.title)
                setBody(targetPost.body)
            }
        } else {
            resetState();
        }
    }, [props.posts, params.id])

    const handleSubmit = (evt)=> {
        evt.preventDefault();

        const newPost = {
            postTitle: title,
            postBody: body
        }

        let url = null;
        let method = null;

        if(params.id !== undefined) {
            newPost.post_id = params.id; // try camelCase
            url = `http://localhost:8080/api/microstackoverflow/post/${params.id}`;
            method = "PUT"
        } else {
            url = "http://localhost:8080/api/microstackoverflow/post"
            method = "POST";
        }

        fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + auth.user.token
            },
            body: JSON.stringify(newPost)
        })
        .then(response => {
            if (response.ok) {
                navigate("/postlist") // need route for "list"
                resetState();
                props.loadPosts(); // need fetchPosts passed from props OR context
            } else {
                response.json()
                .then(errors => {
                    if(Array.isArray(errors)) {
                        setErrors(errors);
                    } else {
                        setErrors([errors])
                    }
                })
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
            </ul>

            <fieldset>
                <label htmlFor="title-input">Title: </label>
                <input id="title-input" value={title} onChange={(evt) => setTitle(evt.target.value)}></input>
            </fieldset>

            <fieldset>
                <label htmlFor="body-input">Body: </label>
                <input id="body-input" value={body} onChange={(evt) => setBody(evt.target.value)}></input>
            </fieldset>

            <button type="submit">Save!</button>
            <Link to="/list">Cancel</Link>

        </form>
    )
}

export default PostForm;