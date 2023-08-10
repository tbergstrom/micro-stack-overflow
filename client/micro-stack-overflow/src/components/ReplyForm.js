import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const ReplyForm = () => {
    // const sectionInputState = useState("")
    // const sectionInputGetter = sectionInputState[0]
    // const sectionInputSetter = sectionInputState[1]

    const params = useParams()
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    
    const [errors, setErrors] = useState([])

    const [body, setBody] = useState("");


    const resetState = () => {
      setBody("")
    }

    useEffect(() => {
      if (params.id !== undefined) {
        
        fetch(`http://localhost:8080/api/reply/${params.id}`)
        .then(response => {
          if (response.ok) {
            response.json()
            .then(reply => {
              setBody(reply.body)
            })
          } else {
            console.log(`Unexpected response status code: ${response.status}`);
          }
        })
      } else {
        resetState();
      }
    }, [params.id])

    const handleSubmit = (evt) => {
      evt.preventDefault()
      const newReply = {
        body: body
      }

      let url = null;
      let init = null;

      // TODO can we keep our code dryer?
      if (params.id !== undefined) {
        //editing
        newReply.id = params.id
        fetch(`http://localhost:8080/api/reply/${params.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + auth.user.token
          },
          body: JSON.stringify(newReply)
        })
        .then(response => {
          if (response.ok) {
            navigate("/replylist")
            resetState()
          } else {
            response.json()
            .then(errors => {
              setErrors(errors)
            })
          }
        })
      } else {
        //adding
        fetch("http://localhost:8080/api/reply", {
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
            navigate("/list")
            resetState()
          } else {
            response.json()
            .then(errors => {
              setErrors(errors)
            })
          }
        })
      }
    }
    
    return (
      <form onSubmit={handleSubmit}>
        <p>Form</p>
        <ul>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
        <fieldset>
          <label htmlFor="body-input">REPLY: </label>
          <input id="body-input" value={body} onChange={(evt) => 
            setBody(evt.target.value)}/>
        </fieldset>

        <button type="submit">Save!</button>
        <Link to="/list">Cancel</Link>
      </form>
    )
}

export default ReplyForm;