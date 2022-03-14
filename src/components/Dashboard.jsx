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
        <>
            <Navbar ubahMenu={ubahMenu} />
            <div>
                {out}
            </div>
        </>
    )
}

export default Dashboard