import React,{useState} from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Note from "./components/note";
import notes from "./notes";
import CreateArea from "./components/createArea";

function App(){

    const [noteArray,setNoteArray]=useState(notes);

    function AddNote(NewNote){
        console.log(NewNote);
        setNoteArray([...noteArray,NewNote]);
    }

    function deleteNote(id){
        setNoteArray(noteArray.filter((noteObj,ind)=>{return ind!==id}));
    }

    return <div>
        <Navbar />
        <CreateArea onSubmit={AddNote}/>
        {noteArray.map((ele,index)=>{return <Note key={index} id={index} title={ele.title} contant={ele.content} onClickDelete={deleteNote}/>})}
        <Footer />
    </div>;
}

export default App;