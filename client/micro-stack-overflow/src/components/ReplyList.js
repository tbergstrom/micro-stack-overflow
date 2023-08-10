import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"
import AuthContext from "../contexts/AuthContext";

const ReplyList = (props) => {

    const [panels, setPanels] = useState([]);
    const auth = useContext(AuthContext)


    const loadPanels = () => {
      fetch("http://localhost:8080/api/solarpanel")
      .then(response => response.json())
      .then(payload => setPanels(payload))
    }
  
    useEffect(loadPanels, [])

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Section</th>
                    <th>Row</th>
                    <th>Column</th>
                    <th>Material</th>
                    <th>Year Installed</th>
                    <th>Is Tracking?</th>
                    <th>Edit?</th>
                    <th>Delete?</th>
                </tr>
            </thead>

            <tbody>
                {panels.map(panel => <tr key={panel.id}>
                    <td>{panel.id}</td>
                    <td>{panel.section}</td>
                    <td>{panel.row}</td>
                    <td>{panel.column}</td>
                    <td>{panel.material}</td>
                    <td>{panel.yearInstalled}</td>
                    <td>{panel.tracking ? "Yes" : "No"}</td>
                    <td>
                        { auth.user && panel.app_user_id === auth.user.id ?
                            <Link to={`/edit/${panel.id}`}>Edit</Link>
                            : <Link to="/login">Login to edit</Link>
                        }
                    </td>
                    <td>
                        { auth.user && panel.app_user_id === auth.user.id ?
                            <Link to={`/delete/${panel.id}`}>Delete</Link>
                            : <Link to="/login">Login to delete</Link>
                        }
                    </td>
                </tr>)}
            </tbody>
        </table>
    )
}

export default ReplyList