import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Welcome from "./Welcome";

import { useDispatch } from "react-redux";
import { getKamdis } from '../features/FilterSlice';


const Dashboard = () => {
    const [out, setOut] = useState(<Welcome />);
    const dispatch = useDispatch();


    function ubahMenu(e) {
        if (e === 'home') {
            setOut(<Welcome />)
        } else { setOut(<Outlet />) }
    }

    useEffect(() => {
        dispatch(getKamdis());
        //console.log('dashboard')
    }, []);

    return (
        <>
            <div className="fixed w-full z-0">
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