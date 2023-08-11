import { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
import ReplyTable from "./ReplyTable";

const ReplyList = (props)=> {
    
    const [replies, setReplies] = useState([]);
    const auth = useContext(AuthContext);
    const params = useParams();

    const loadReplies = () => {
        fetch(`http://localhost:8080/api/microstackoverflow/reply/${params.id}`)
        .then(response => response.json())
        .then(payload => setReplies(payload))
    };
    
    useEffect(loadReplies, [params.id, props.repliesCounter]);

    return (
        <>
            <div className="App">

            {replies.length == 0 ? 
                <div className="alert alert-warning py-4"> 
                    No replies found. <br />
                    Do you want to add a reply?
                </div>
                : <ReplyTable replies={replies} loadReplies={loadReplies} />
            }
            </div>
        </>

        
  );
}

export default ReplyList;