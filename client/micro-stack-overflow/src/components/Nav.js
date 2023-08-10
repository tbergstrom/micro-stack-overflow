import { Link } from "react-router-dom"
import AuthContext from "../contexts/AuthContext"
import { useContext } from "react"

const Nav = (props) => {
    const auth = useContext(AuthContext)
    const user = auth.user

    return (
        <nav>
            {/* always show */}
            <Link to='/'>HOME</Link>
            {" "}
            <Link to='/list'>VIEW ALL QUESTIONS</Link>
            {" "}
            {/* only logged in */}
            { user && (
                <>
                    <Link to='/add'>ASK A QUESTION</Link>
                    {" "}
                    <button onClick={auth.logout}>LOGOUT</button>
                </>
            )}

            {/* only logged out */}
            { !user && (
                <Link to='/login'>LOGIN</Link>
            )}
        </nav>
    )
}

export default Nav