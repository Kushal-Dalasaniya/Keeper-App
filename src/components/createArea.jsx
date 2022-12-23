import React , {useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';

function CreateArea(props) {

    const [newObj,setObj]=useState({
        title:"",
        content:""
    });

    const [isClicked,setIsClicked]=useState(false);

    function OnChangeHandler(event){
        const {name,value}=event.target;

        setObj((preObj)=>{
            // if(nm==="title"){
            //     return {title : val,
            //             content:preObj.content}
            // }
            // else if(nm==="content"){
            //     return {title : preObj.title,
            //             content:val}
            // }
            return{ ...preObj,
                    [name]:value}
        })
    }

    function OnClickHendler(){
        setIsClicked(!isClicked);
    }

    function OnSubmitHendler(event){
        // console.log(newObj);
        event.preventDefault();
        props.onSubmit(newObj);
        setObj({title:"",content:""});
    }

    return (
        <div>
        <form onSubmit={OnSubmitHendler}>
            {isClicked ?  <input name="title" placeholder="Title" value={newObj.title} onChange={OnChangeHandler}/> : null }
            <textarea name="content" placeholder="Take a note..." rows={isClicked ?"3":"1"} value={newObj.content} onChange={OnChangeHandler} onClick={OnClickHendler} />
            {isClicked ? <Fab type="submit" size="small" style={{position: 'absolute',
                                                    right: '18px',
                                                    bottom: '-18px',
                                                    background: "#f5ba13",
                                                    color: '#fff'}}>
                                                        <AddIcon/>    
            </Fab>: null}
        </form>
        </div>
    );
}

export default CreateArea;