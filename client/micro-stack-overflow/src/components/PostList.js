// import logo from '../overflow.svg';
import PostTable from './PostTable.js';

const PostList = (props)=> {

    // no props have been passed from App.js yet. 
    // we will likely want posts and fetchPosts passed, which will go to PostTable
    // may want to consider useContext since there are layers below the PostTable
    
    const posts = props.posts;
    const fetchPosts = props.fetchPosts;

    return (
        <div className="App">
            {/* <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                Micro Stack Overflow
                </p>
                {/* <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
                >
                Ask a Question
                </a> */}
            {/* </header> */} *
            {/* display "no posts found" OR PostTable here */}
            {posts.length == 0 ? 
                <div className="alert alert-warning py-4"> 
                    No posts found. <br />
                    Do you want to add a post?
                </div>
                : <PostTable posts={posts} fetchPosts={props.fetchPosts} />
            }

            {/* The table below can be cut/ pasted into PostTable */}
            {/* <table>
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>Title</th>
                        <th>Body</th>
                        <th>Do we want a link to a full page view? Or maybe an "expand" button?</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table> */}
        </div>
  );
}

export default PostList;