import { Link } from "react-router-dom"
import AuthContext from "../contexts/AuthContext"
import { useContext } from "react"
import ReplyForm from "./ReplyForm";
import ReplyList from "./ReplyList";

// I think once the "View Post" button is pressed (presumably this happens in PostTable), we need to pass in that singular post as a prop to here

const PostView = (props) => {
    const auth = useContext(AuthContext);
    const user = auth.user;

    return (
        <div className="App">
            {/* only logged in */}
            { user && (
                <>
                {/* User Name: */}
                    <h1>{ props.app_user_id }</h1>
                    <p>{ props.body }</p>
                    <br/>
                    <ReplyForm />
                    <br/>
                    <ReplyList />
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