import React from "react";
import HighlightIcon from '@mui/icons-material/Highlight';
import { Button } from "react-bootstrap";
import Cookies from "js-cookie";


function Navbr(){
        const  LogOut = () => {
                Cookies.remove('userId')
                Cookies.remove('userName')
                window.location.reload();
        }
        
        const userName= Cookies.get('userName');

        return <header className="header">
                <h1><HighlightIcon fontSize="large"/> Keeper  {userName ? 'For '+ userName : null} </h1>
                <Button style={{'float': 'right',
                                'position': 'relative',
                                }} variant="light" onClick={LogOut}> 
                                LogOut
                </Button>
        </header>
}

export default Navbr;