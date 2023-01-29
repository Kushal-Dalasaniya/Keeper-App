import Note from "./note";
import notes from "../notes";
import CreateArea from "./createArea";
import React,{useState,useEffect} from "react";
import queryString from 'query-string';
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

function UserArea(){
    const [noteArray,setNoteArray] = useState(notes);
    const [userId,setUserId]=useState(Cookies.get('userId'));
    const [istitle,setIsTitle]=useState(true);

    useEffect(()=>{
        console.log("inside UserArea " + Cookies.get('userId'));
        if(userId)
            getDetails();
    },[]);

    const getDetails=()=>{
        fetch(process.env.REACT_APP_BACKEND_URL+'?id='+userId)
        .then((response) => response.json())
        .then((obj) => {
            setNoteArray(obj.data);
        })
        .catch((err) => {
            console.log(err);
        });
        setIsTitle(true);
    }

    const AddNote = async (NewNote)=>{
        console.log(NewNote);
        
        if(NewNote.title.length===0){
            setIsTitle(false);
            return
        }
        
        await fetch(process.env.REACT_APP_BACKEND_URL+'?id='+userId, {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: queryString.stringify(NewNote)
            })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
            })
            .catch((err) => {
                console.log(err);
        });
        getDetails();
    }

    const deleteNote = async (postid) =>{
        await fetch(process.env.REACT_APP_BACKEND_URL+'?userid='+userId+'&postid='+postid, {method: 'DELETE'})
        .then((response) => response.json())
            .then((data) => {
            // console.log(data);
            })
            .catch((err) => {
            console.log(err);
        });
        getDetails();
    }

    return ( userId ? 
        <div>
            {istitle ? null : 
            <Alert style={{'textAlign':'center',
                            'margin':'10px auto auto auto',
                            'width':'17rem'}} key={'danger'} variant={'danger'}>
                A title should be required.
            </Alert>}
            <CreateArea onSubmit={AddNote}/>
            {noteArray.map((ele,index)=>{return <Note key={index} id={ele._id} title={ele.title} contant={ele.content} onClickDelete={deleteNote}/>})}
        </div> :
        <Navigate to="/login" />
    );
}

export default UserArea;




