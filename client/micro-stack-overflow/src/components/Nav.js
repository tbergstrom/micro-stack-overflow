import { Link } from "react-router-dom"
import AuthContext from "../contexts/AuthContext"
import { useContext } from "react"

const Nav = () => {
    const auth = useContext(AuthContext)
    const user = auth.user

    return (
        <nav>
            {/* always show */}
            <Link to='/'>HOME</Link>
            {" "}
            <Link to='/postlist'>VIEW ALL QUESTIONS</Link>
            {" "}

            {/* only logged in */}
            { user && (
                <>
                    <Link to='/addpost'>ASK A QUESTION</Link>
                    {" "}
                    <button onClick={auth.logout}>LOGOUT</button>
                </>
            )}

            {/* only logged out */}
            { !user && (
                <>
                    <Link to='/login'>LOGIN</Link>
                    {" "}
                    <Link to='/create_account'>CREATE ACCOUNT</Link>
                </>
            )}
        </nav>
    )
}

export default Nav