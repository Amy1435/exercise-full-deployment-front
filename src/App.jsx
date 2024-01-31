import Albums from "./components/Albums";
import Musicians from "./components/Musicians";
import HomePage from "./components/HomePage";
import NotFound from "./components/NotFound";
import SingleAlbum from "./components/SingleAlbum";
import SingleMusician from "./components/SingleMusician";
import "./App.scss";
import { Routes, Route, NavLink } from "react-router-dom";
import LogIn from "./components/LogIn";

function App() {
    return (
        <>
            <div className="navbar">
                <figure>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/3501/3501776.png"
                        alt="logo"
                    />
                </figure>
                <menu>
                    <nav>
                        <li>
                            <NavLink className="menu-li" to="/">
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="menu-li" to="/albums">
                                Albums
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="menu-li" to="/musicians">
                                Musicians
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="menu-li" to="/log-in">
                                Log In
                            </NavLink>
                        </li>
                    </nav>
                </menu>
            </div>

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/albums">
                    <Route index element={<Albums />} />
                    <Route path=":slug" element={<SingleAlbum />} />
                </Route>
                <Route path="/musicians">
                    <Route index element={<Musicians />} />

                    <Route path=":slug" element={<SingleMusician />} />
                </Route>
                <Route path="*" element={<NotFound />} />
                <Route path="/log-in" element={<LogIn />} />
            </Routes>
        </>
    );
}

export default App;
