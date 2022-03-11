import Navbar from "./Navbar";
import Welcome from "./Welcome";

const hd = {
    display: "none"
}

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <div className="h-20">
            </div>
            <div>
                <Welcome />
            </div>
        </div>
    )
}

export default Dashboard