import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { red } from '@mui/material/colors';


import iLogin from '../public/icons/login.png'
import iUser from '../public/icons/user.png'
import iCalender from '../public/icons/calendar.png'
import iIcon from '../public/image.ico'

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [tahun, setTahun] = useState('Pilih Tahun');
    const [info, setInfo] = useState('');
    const navLink = useNavigate();


    const Auth = async () => {

        if (!username && !password) { openModal(); setInfo('Username dan Password Kosong'); return }
        if (!username) { openModal(); setInfo('Username Kosong'); return }
        if (!password) { openModal(); setInfo('Password Kosong'); return }
        if (tahun === 'Pilih Tahun') { openModal(); setInfo('Pilih Tahun'); return }

        try {
            await axios.post('/user/login', {
                username: username,
                password: password
            });
            navLink('/home')
        } catch (e) {
            openModal();
            if (e) { setInfo(e.response.data.info) };
        }
    }

    // =========== Modal Part =============
    const [isOpen, setIsOpen] = useState(false)
    function closeModal() { setIsOpen(false) }
    function openModal() { setIsOpen(true) }
    // =========== Modal Part =============

    return (
        <div>
            <div className="fixed w-full"><Header /></div>
            <div className="w-full h-screen">
                <div className="min-h-screen">
                    {/* <div className="container max-w-full h-[100px] sm:h-36">
                    </div> */}
                    <div className="min-h-screen">
                        <div className="container min-h-screen mx-auto">
                            <div className="min-h-screen flex">
                                <div className="my-auto mx-auto">
                                    <div className="container w-[90%] rounded-lg sm:w-[750px] md:w-[882px] lg:w-[950px] sm:h-90 shadow-2xl">
                                        <h2 className="text-black text-center font-bold sm:text-left sm:ml-8 pt-2">Login DPMK</h2>
                                        <hr className="border-2 border-slate-600 w-[95%] mx-auto mt-1" />
                                        <div className="sm:grid sm:grid-cols-2">
                                            <div className="container flex flex-col sm:my-10">
                                                <div className="sm:items-start">
                                                    <img src={iIcon} alt="yahukimo.kab" className="w-32 mt-1 mx-auto" />
                                                    <p className="justify-center text-center mx-auto w-[80%] sm:w-72">Sistem Informasi Keuangan
                                                        Kampung
                                                        Pemerintah
                                                        Kabupaten
                                                        Yahukimo Provinsi
                                                        Papua</p>
                                                </div>
                                            </div>
                                            <div className="pb-3 sm:border-l-2 sm:border-slate-900 sm:my-10">
                                                <h3 className="text-center sm:text-left sm:pl-8 font-semibold mt-1">Silahkan Masuk</h3>
                                                <form onSubmit={(e) => { e.preventDefault(); Auth() }} className="flex flex-col items-center sm:items-start sm:pl-8 sm:-pr-14 sm:mt-2">
                                                    <div className="flex sm:w-full">
                                                        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="username" className="focus:ring-2 focus:ring-cyan-600 sm:w-[80%] min-w-min outline-none border-2 border-blue-700 rounded-md sm:rounded-sm mb-2 focus:shadow-2xl placeholder:text-center sm:placeholder:text-left sm:pl-3 focus:border-blue-700 mt-1 pl-2" />
                                                        <img src={iUser} className="h-7 w-7 mt-1 hidden sm:block ml-4" alt="" />
                                                    </div>
                                                    <div className="flex sm:w-full">
                                                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" className="focus:ring-2 focus:ring-cyan-600 sm:w-[80%] min-w-min outline-none border-2 border-blue-700 rounded-md sm:rounded-sm mb-2 focus:shadow-2xl placeholder:text-center sm:placeholder:text-left sm:pl-3 focus:border-blue-700 pl-2" />
                                                        <img src={iLogin} className="h-7 w-7  hidden sm:block ml-4" alt="" />
                                                    </div>
                                                    <div className="flex sm:w-full">
                                                        <select type="text" value={tahun} onChange={(e) => setTahun(e.target.value)} placeholder="tahun" className="focus:ring-2 focus:ring-cyan-600 sm:w-[80%] min-w-min block border-2 border-blue-700 rounded-none mb-2 focus:shadow-2xl placeholder:text-center sm:placeholder:text-left sm:pl-3 focus:border-blue-700 outline-none">
                                                            <option className="rounded-none">Pilih Tahun</option>
                                                            <option className="rounded-none">2022</option>
                                                        </select>
                                                        <img src={iCalender} className="h-7 w-7  hidden sm:block ml-4" alt="" />
                                                    </div>
                                                    <button type="submit" id="btn-login" className="focus:ring-2 focus:ring-blue-900 outline-none active:ring-2 active:ring-cyan-600 w-[50%] sm:w-[60%] min-w-min bg-blue-700 hover:bg-blue-800 active:bg-blue-900 rounded-md sm:rounded-sm sm:h-10 sm:mt-4"
                                                    >LOGIN</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container w-52">
                <div className="mx-auto my-auto bg-red-200">
                    <Transition appear show={isOpen} as={Fragment}>
                        <Dialog
                            as="div"
                            className="fixed inset-0 z-10 overflow-y-auto rounded-lg"
                            onClose={closeModal}
                        >
                            <div className="min-h-screen px-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Dialog.Overlay className="fixed inset-0" />
                                </Transition.Child>
                                {/* This element is to trick the browser into centering the modal contents. */}
                                <span
                                    className="inline-block h-screen align-middle"
                                    aria-hidden="true"
                                >
                                    &#8203;
                                </span>
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900" >
                                            <div className="mt-2 flex flex-col">
                                                <i className="mx-auto w-6"><DoDisturbIcon sx={{ color: red[500] }} /></i>
                                            </div>
                                        </Dialog.Title>
                                        <div className="mt-2 flex flex-col">
                                            <p className="text-lg font-semibold text-gray-500 text-center">
                                                {info}
                                            </p>
                                        </div>
                                        <div className="mt-4 mx-auto ">
                                            <div className="container mx-auto  w-6 -translate-x-3">
                                                <button
                                                    type="button"
                                                    className="mx-auto inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                                    onClick={closeModal}
                                                >
                                                    Ok
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Transition.Child>
                            </div>
                        </Dialog>
                    </Transition>
                </div>
            </div>
        </div>
    )
}

export default Login

