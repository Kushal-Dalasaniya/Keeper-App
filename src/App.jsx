import Navbr from "./components/navbar";
import Footer from "./components/footer";
import Login from "./components/logIn";
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import UserArea from "./components/userArea";
import Register from "./components/register";


function App(){
    return <div>
        <Navbr/>
        <Router>
            <Routes>
                <Route exact path='/login' element={<Login/>}></Route>
                <Route exact path='/' element={<UserArea/>}></Route>
                <Route exact path='/register' element={<Register/>}></Route>
            </Routes>
        </Router>
        <Footer />
    </div>;
}

export default App;