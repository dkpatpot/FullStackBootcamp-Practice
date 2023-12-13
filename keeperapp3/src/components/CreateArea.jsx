import React,{useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
function CreateArea(props) {
  const [isExpanded,setExpanded] = useState(false);
  const [note,setNote] = useState({title:"",content:""});
  function handleChange(event) {
    const { name, value } = event.target;
    console.log(value)
    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }
  function expand(){
    setExpanded(true)
  }
  function submitButton(event){
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }
  return (
    <div>
      <form className="create-note">
        {isExpanded ? <input onChange={handleChange} name="title" placeholder="Title" value={note.title}/>:null}
        <textarea onClick={expand} onChange={handleChange} name="content" value={note.content} placeholder="Take a note..." rows={isExpanded ? 3:1} />
        
        <Fab onClick={submitButton}><AddIcon /></Fab>
      </form>
    </div>
  );
}

export default CreateArea;
