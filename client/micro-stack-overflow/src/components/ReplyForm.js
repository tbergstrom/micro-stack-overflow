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

    const [section, setSection] = useState("");
    const [row, setRow] = useState("");
    const [column, setColumn] = useState("");
    const [material, setMaterial] = useState("POLY_SI");
    const [yearInstalled, setYearInstalled] = useState("");
    const [tracking, setTracking] = useState(false);

    const resetState = () => {
      setSection("")
      setRow("")
      setColumn("")
      setYearInstalled("")
      setMaterial("POLY_SI")
      setTracking(false)
    }

    useEffect(() => {
      if (params.id !== undefined) {
        
        fetch(`http://localhost:8080/api/solarpanel/${params.id}`)
        .then(response => {
          if (response.ok) {
            response.json()
            .then(panel => {
              setSection(panel.section)
              setRow(panel.row)
              setColumn(panel.column)
              setYearInstalled(panel.yearInstalled)
              setMaterial(panel.material)
              setTracking(panel.tracking)
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
      const newPanel = {
        section: section,
        row: row,
        column: column,
        material: material,
        yearInstalled: yearInstalled,
        tracking: tracking,
      }

      let url = null;
      let init = null;

      // TODO can we keep our code dryer?
      if (params.id !== undefined) {
        //editing
        newPanel.id = params.id
        fetch(`http://localhost:8080/api/solarpanel/${params.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + auth.user.token
          },
          body: JSON.stringify(newPanel)
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
      } else {
        //adding
        fetch("http://localhost:8080/api/solarpanel", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + auth.user.token
          },
          body: JSON.stringify(newPanel)
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
        <ul>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
        <fieldset>
          <label htmlFor="section-input">Section: </label>
          <input id="section-input" value={section} onChange={(evt) => 
            setSection(evt.target.value)}/>
        </fieldset>

        <fieldset>
          <label htmlFor="row-input">Row: </label>
          <input id="row-input" value={row} onChange={(evt) => 
            setRow(evt.target.value)}/>
        </fieldset>

        <fieldset>
          <label htmlFor="column-input">Column: </label>
          <input id="column-input" value={column} onChange={(evt) => 
            setColumn(evt.target.value)}/>
        </fieldset>

        <fieldset>
          <label htmlFor="material-input">Material: </label>
          <select id="material-input" value={material} onChange={(evt) =>
            setMaterial(evt.target.value)}>
            <option value="POLY_SI">Multicrystalline Silicon</option>
            <option value="CIGS">Cool IndiGo Silicon</option>
          </select>
        </fieldset>

        <fieldset>
          <label htmlFor="yearInstalled-input">Year Installed: </label>
          <input id="yearInstalled-input" value={yearInstalled} onChange={(evt) => 
            setYearInstalled(evt.target.value)}/>
        </fieldset>

        <fieldset>
          <label htmlFor="tracking-input">Is Tracking?: </label>
          <input type="checkbox" id="tracking-input" checked={tracking} onChange={(evt) => 
            setTracking(evt.target.checked)}/>
        </fieldset>

        <button type="submit">Save!</button>
        <Link to="/list">Cancel</Link>
      </form>
    )
}

export default ReplyForm