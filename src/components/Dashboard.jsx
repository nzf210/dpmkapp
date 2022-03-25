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
            <div className="fixed w-full">
                <div className="w-full">
                    <Navbar ubahMenu={ubahMenu} />
                </div>
            </div>
            <div className="w-full h- full">
                {out}
            </div>
        </>
    )
}

export default Dashboard