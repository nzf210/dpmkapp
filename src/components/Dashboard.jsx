import { useState } from "react";
import Navbar from "./Navbar";
import Welcome from "./Welcome";
import Header from "./Header";

const Dashboard = () => {
    const [menudash, setMenudash] = useState(Welcome);

    const ubahmenu = (tag) => {
        setMenudash(tag);
    }

    return (
        <>
            <div className="fixed w-full">
                <Navbar ubahmenu={ubahmenu} />
            </div>
            <div>
                {menudash}
            </div>
        </>
    )
}

export default Dashboard