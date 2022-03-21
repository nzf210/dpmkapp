import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";
import Welcome from "./Welcome";


const Dashboard = () => {
    const [out, setOut] = useState(<Welcome />);

    function ubahMenu(e) {
        if (e === 'home') {
            setOut(<Welcome />)
        } else { setOut(<Outlet />) }
    }

    return (
        <div className="w-full h- full">
            <Navbar ubahMenu={ubahMenu} />
            <div className="w-full h- full">
                {out}
            </div>
        </div>
    )
}

export default Dashboard