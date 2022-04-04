import MyModalHapus from './ubahpassword/MyModalHapus'
import Filterkampung from "../filter/Filterkampung";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import MyModalEdit from './ubahpassword/MyModalEdit'
import MyModal from './ubahpassword/ModalTambahUser';
import { useSelector } from 'react-redux';


const ConfigUbahPassword = () => {

    const { nama, kd_kampung, kd_distrik, kd_lvl1, kd_lvl2, userId } = useSelector(state => state.userLogin);
    const [user, setUser] = useState([]);
    const [getUserInfo, setgetUserInfo] = useState(null);
    const [getInfoEdit_, setgetInfoEdit_] = useState(null);
    const [infoHasil, setInfoHasil] = useState(false);

    const getUser = async () => {
        const usrdata = await axios.get('/user');
        if (kd_lvl1 === 2) {
            if (kd_lvl2 === 2) {
                const da = usrdata.data.filter((e) => e.id === userId)
                setUser(da);
            } else {
                const da = usrdata.data.filter((e) => e.kd_kampung === kd_kampung)
                setUser(da);
            }
        } else {
            setUser(usrdata.data);
        }
    }

    const setgetInfoEdit = (e) => { setgetInfoEdit_(e); console.log('induk', e) };

    useEffect(() => {
        getUser();
    }, [getUserInfo, getInfoEdit_, infoHasil]);


    return (
        <div className="w-full">
            <div className="h-20"></div>
            {/* <Filterkampung></Filterkampung> */}
            <div>
                <div className="w-full mx-auto overflow-x-auto" >
                    <div className="mx-auto w-full xl:w-[70%] lg:w-[80%] md:w-[90%] overflow-x-auto bg-red-200">
                        <div className="mx-auto">
                            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                                <div className="p-4 flex flex-row justify-between">
                                    <label htmlFor="table-search" className="sr-only"></label>
                                    <div className=" mt-1">
                                        {/* <div className="left-0 flex items-center pl-3 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                            </svg>
                                        </div> */}
                                        <input type="text" id="table-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cari pengguna ... " />
                                    </div>
                                    <div>
                                        <MyModal setgetUserInfo={setgetUserInfo} setInfoHasil={setInfoHasil}></MyModal>
                                    </div>
                                </div>
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="p-4">NO</th>
                                            <th scope="col" className="px-2 py-1">Nama</th>
                                            <th scope="col" className="px-2 py-1">Username</th>
                                            <th scope="col" className="px-2 py-1">Password</th>
                                            <th scope="col" className="px-2 py-1">Level</th>
                                            <th scope="col" className="px-2 py-1">Level User</th>
                                            <th scope="col" className="px-2 py-1">No Hp</th>
                                            <th scope="col" className="px-2 py-1">Email</th>
                                            <th scope="col" className="px-2 py-1">Distrik</th>
                                            <th scope="col" className="px-2 py-1">Kampung</th>
                                            <th scope="col" className=""><span className="sr-only">Edit</span></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {<DataTable user={user} setgetInfoEdit={(e) => setgetInfoEdit(e)} setInfoHasil={setInfoHasil} setgetUserInfo={setgetUserInfo} kd_lvl2={kd_lvl2} />}
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-5">
                            </p>
                        </div>
                    </div>
                </div>
                {infoHasil ?
                    <div className={` bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 ${infoHasil ? 'z-50' : null} `} >
                        <div className="bg-white px-16 py-14 rounded-md text-center">
                            <h1 className="text-xl mb-4 font-bold text-slate-500">{getUserInfo}</h1>
                            <button onClick={() => setInfoHasil(false)} className="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold">Ok</button>
                        </div>
                    </div>
                    : null}
            </div>
        </div>
    )
}

export default ConfigUbahPassword;



function DataTable({ user, setgetInfoEdit, setInfoHasil, setgetUserInfo, kd_lvl2 }) {
    const navLink = useNavigate();
    const [idEdit, setIdEdit] = useState('');
    //const [idhapus, setIdhapus] = useState('');

    const editData = (e) => {
        navLink(`/home/config/ubahpassword/${e}`);
        setIdEdit(e);
    }
    const infoUpdate = ((e) => { })
    const setIdEdit_ = (e) => setgetInfoEdit(e);

    const trigerHapusUser = async (ee) => {
        navLink(`/home/config/ubahpassword/${ee}`);

    }


    const hpsUser = async (e) => {
        try {
            const res = await axios.delete(`/user/${e}`);
            console.log('hps', res.data.info);
            if (res.status === 200) {
                setgetUserInfo(res.data.info);
                setInfoHasil(true);
                function name() {
                    setInfoHasil(false);
                }
                setTimeout(() => name(), 2000);

            }
        } catch (error) {
            if (error.response) {
                setgetUserInfo(error.response.data.info);
            }
        }
    }

    return (
        <>
            {user.map((e, i) => (
                <tr key={e.id.toString()} pass={e.password} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-4 p-4">{i + 1}</td>
                    <th scope="row" className="px-2 py-1 font-medium text-gray-900 dark:text-white whitespace-nowrap w-28">{e.nama}</th>
                    <td className="px-2 py-1">{e.username} </td>
                    <td className="px-2 py-1">***********</td>
                    <td className="px-2 py-1">{e.lvl_instansi}</td>
                    <td className="px-2 py-1">{e.lvl_user}</td>
                    <td className="px-2 py-1">{e.nohp}</td>
                    <td className="px-2 py-1">{e.email}</td>
                    <td className="px-2 py-1">{e.distrik}</td>
                    <td className="px-2 py-1">{e.kampung}</td>
                    <td className="text-center mr-3">
                        <div className="space-x-1 bg-red-100 mr-4 flex flex-row justify-center">
                            <MyModalEdit infoUpdate={(e) => infoUpdate(e)} idEdit={idEdit} editData={() => editData(e.id)} setIdEdit_={(e) => setIdEdit_(e)} />
                            {kd_lvl2 === 2 ? null : <MyModalHapus setgetInfoEdit={(e) => setgetInfoEdit(e)} trigerHapusUser={() => trigerHapusUser(e.id)} hpsUser={() => hpsUser(e.id)} />}
                        </div>
                    </td>
                </tr>
            ))}
        </>
    )
}

