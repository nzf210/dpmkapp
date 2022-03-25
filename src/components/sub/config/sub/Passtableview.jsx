import { useState, useEffect } from "react";

import React from "react";
import axios from "axios";
import Viewuser from "./Viewuser";
import Ubahpass from "./Ubahpass";
import { useNavigate, useParams } from "react-router-dom";


const ConfigUbahPassword = () => {
    const [user, setUser] = useState([]);
    const [modaledit, setModalEdit] = useState(false);
    const [modalhapus, setModalHapus] = useState(false);
    const [modalstatus, setModalStatus] = useState(false);

    const getUser = async () => {
        const userdata = await axios.get('/user');
        setUser(userdata.data);
    }

    useEffect(() => {
        let e = true;
        if (e) {
            getUser();
            e = false;
        }
        return () => { e = true }
    }, []
    );

    const navLink = useNavigate();


    return (

        <div className="mx-auto">
            <div>
                <div>
                    <Viewuser getUser={getUser}></Viewuser>
                </div>
                <div className="mx-auto">
                    {modalhapus ? <Hapuspass setModalStatus={setModalStatus} setModalHapus={setModalHapus} modalhapus={modalhapus}></Hapuspass> : null}
                    {modalstatus ? <ModalStatus></ModalStatus> : null}

                </div>
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
                                <td>{usrdt.m_kam_di.distrik}</td>
                                <td>{usrdt.m_kam_di.kampung}</td>
                                <td className="space-x-2">
                                    <button className="bg-blue-700 hover:bg-blue-800 rounded-sm shadow-xl p-1 hover:text-yellow-50"
                                        onClick={() => {
                                            setModalEdit(true);
                                            navLink(`/home/config/ubahpassword/${usrdt.id}`)
                                        }}
                                    >ubah</button>
                                    <button className="bg-red-400 hover:bg-red-500 rounded-sm shadow-xl p-1 hover:text-yellow-50"
                                        onClick={() => { setModalHapus(true); navLink(`/home/config/ubahpassword/${usrdt.id}`) }}
                                    >hapus</button>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
            {modaledit ? <Ubahpass setModalEdit={setModalEdit} modaledit={modaledit}></Ubahpass> : null}
        </div>
    )
}

export default ConfigUbahPassword;



function Hapuspass({ setModalHapus, setModalStatus }) {
    const navLink = useNavigate();
    const { id } = useParams();

    const hapusUser = async (id_) => {

        try {
            await axios.delete(`/user/${id_}`).then(res => {
                console.log(res);
            });

            setModalHapus(false);
            setModalStatus(true);
            let timeout;
            function myFunction() {
                timeout = setTimeout(alertFunc, 1000);
            }
            function alertFunc() {
                setModalStatus(false);
            }
            myFunction();
            navLink('/home/config/ubahpassword');
        } catch (error) {
            ModalStatus(error.message)
        }
    }

    return (
        <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center top-0 right-0 bottom-0 left-0 fixed">
            <div className="bg-white px-16 py-14 rounded-md text-center">
                <h1 className="text-xl mb-4 font-bold text-slate-500">Yakin Menghapus User Ini</h1>
                <button className="bg-red-500 px-4 py-2 rounded-md text-md text-white hover:bg-red-600 active:bg-red-500" onClick={() => { setModalHapus(false); navLink('/home/config/ubahpassword'); }}>Batal</button>
                <button className="bg-blue-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold hover:bg-blue-600 active:bg-blue-500"
                    onClick={() => { hapusUser(id) }}
                >Hapus</button>
            </div>
        </div>
    )
}


function ModalStatus() {
    return (
        <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center top-0 right-0 bottom-0 left-0 fixed">
            <div className="bg-white px-16 py-14 rounded-md text-center">
                <h1 className="text-xl mb-4 font-bold text-slate-900">Berhasil Dihapus</h1>
            </div>
        </div>
    )
}