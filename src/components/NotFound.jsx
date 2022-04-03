import React from 'react';
import { Link } from "react-router-dom";
const NotFound = () => {
    return (
        <div className="mx-auto w-full min-h-full items-center justify-center my-auto">

            <Link to="/home" className="inline-block p-12 rounded-lg text-yellow-50 bg-blue-600 hover:bg-blue-700 text-center justify-center mx-auto pr-8 mt-8 ml-3 items-center my-auto">Back To Home</Link>

            <div className="mx-auto items-center w-full min-h-full justify-center text-center my-auto text-red-500 font-bold pt-40">
                <h1 className="">Halaman Tidak Di Temukan</h1>
            </div>
        </div>
    )
}

export default NotFound