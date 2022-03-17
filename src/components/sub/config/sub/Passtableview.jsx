import { useState, useEffect } from "react";

import React from "react";
import axios from "axios";
import Viewuser from "./Viewuser";


const ConfigUbahPassword = () => {
    const [user, setUser] = useState([]);

    const getUser = async () => {
        const userdata = await axios.get('http://localhost:3002/user');
        setUser(userdata.data);
    }

    useEffect(
        () => {
            getUser();
        }, []
    );

    return (

        <div className="mx-auto">
            <div>
                <Viewuser getUser={getUser}></Viewuser>
            </div>
            <table className="mx-auto">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Username</th>
                        <th className="hidden md:block mt-0.5">Password</th>
                        <th>No HP</th>
                        <th>Email</th>
                        <th>Kampung</th>
                        <th>Distrik</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {user.map(
                        (usrdt, i) => (
                            <tr key={usrdt.id}>
                                <td>{i + 1}</td>
                                <td>{usrdt.nama}</td>
                                <td>{usrdt.username}</td>
                                <td className="hidden md:block mt-0.5">{usrdt.password}</td>
                                <td>{usrdt.nohp}</td>
                                <td>{usrdt.email}</td>
                                <td>{usrdt.kd_kampung}</td>
                                <td>{usrdt.kd_distrik}</td>
                                <td className="space-x-2">
                                    <button className="bg-blue-700 hover:bg-blue-800 rounded-sm shadow-xl p-1 hover:text-yellow-50"
                                        onClick={() => { }}
                                    >ubah</button>
                                    <button className="bg-red-400 hover:bg-red-500 rounded-sm shadow-xl p-1 hover:text-yellow-50">hapus</button>
                                </td>
                            </tr>
                        )
                    )}

                </tbody>
            </table>
        </div>
    )
}

export default ConfigUbahPassword;

