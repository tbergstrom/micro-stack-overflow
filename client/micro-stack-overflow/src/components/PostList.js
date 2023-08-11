import { useParams } from 'react-router-dom';
import PostTable from './PostTable.js';
import { useState } from 'react';

const PostList = (props)=> {

    const posts = props.posts;
    const loadPosts = props.loadPosts;
    const params = useParams();

    const [replies, setReplies] = useState([]);

    const loadReplies = () => {
        fetch(`http://localhost:8080/api/microstackoverflow/reply/${params.id}`)
        .then(response => response.json())
        .then(payload => setReplies(payload))
    };

    return (
        <div className="App">

            {posts.length == 0 ? 
                <div className="alert alert-warning py-4"> 
                    No posts found. <br />
                    Do you want to add a post?
                </div>
                : <PostTable posts={posts} loadPosts={loadPosts} />
            }
        </div>
  );
}

export default PostList;