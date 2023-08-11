import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const ReplyForm = (props) => {

    const params = useParams()
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    
    const [errors, setErrors] = useState([])

    const [body, setBody] = useState("");


    const resetState = () => {
      setBody("")
    }

    const handleSubmit = (evt) => {
      evt.preventDefault()
      const newReply = {
        replyBody: body,
        postId: params.id
      }

      let url = null;
      let init = null;

      // TODO can we keep our code dryer?
      // if (params.id !== undefined) {
      //   //editing
      //   newReply.id = params.id
      //   fetch(`http://localhost:8080/api/microstackoverflow/reply/${params.id}`, {
      //     method: "PUT",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Accept: "application/json",
      //       Authorization: "Bearer " + auth.user.token
      //     },
      //     body: JSON.stringify(newReply)
      //   })
      //   .then(response => {
      //     if (response.ok) {
      //       navigate("/replylist")
      //       resetState()
      //     } else {
      //       response.json()
      //       .then(errors => {
      //         setErrors(errors)
      //       })
      //     }
      //   })
      // } 
      
      
      //adding
      fetch("http://localhost:8080/api/microstackoverflow/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + auth.user.token
        },
        body: JSON.stringify(newReply)
      })
      .then(response => {
        if (response.ok) {
          navigate(`/postview/${params.id}`);
          resetState();
          props.loadReplies();
          props.setRepliesCounter(counter => counter+ 1);
        } else {
          response.json()
          .then(errors => {
            setErrors(errors)
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
          <label htmlFor="body-input">REPLY: </label>
          <input id="body-input" value={body} onChange={(evt) => 
            setBody(evt.target.value)}/>
        </fieldset>

        <button type="submit">Save!</button>
        <Link to="/postlist">Cancel</Link>
      </form>
    )
}

export default ReplyForm;