import PostTable from './PostTable.js';

const PostList = (props)=> {

    const posts = props.posts;
    const loadPosts = props.loadPosts;

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