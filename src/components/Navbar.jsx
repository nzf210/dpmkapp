import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header"
import LogoutIcon from '@mui/icons-material/Logout';
import axios from "axios";
import jwt_decode from "jwt-decode";


import { DiOpensource } from 'react-icons/di';
import { DiUbuntu } from 'react-icons/di';
import { DiCompass } from 'react-icons/di';
import { DiSafari } from 'react-icons/di';
import { IoBuildOutline } from 'react-icons/io5';
import { MdAccountBalance } from 'react-icons/md';
import { BsCheck2Square } from 'react-icons/bs';
import { GrDocumentText } from 'react-icons/gr';
import { AiOutlineRightSquare } from 'react-icons/ai';
import { CgPentagonRight } from 'react-icons/cg';


import Home from "../public/icons/icons8-home.svg";
import Apbk from "../public/icons/icons8-bookmark-50.svg";
import Config from "../public/icons/icons8-settings-50.svg";
import Spp from "../public/icons/icons8-file-50.svg";
import Sp2d from "../public/icons/icons8-speech-bubble-50.svg";
import Spd from "../public/icons/icons8-opened-folder-50.svg";
import Atvis from "../public/icons/icons8-services-50.svg";
import Realisasii from "../public/icons/icons8-about-50.svg";
import Spm from "../public/icons/icons8-news-50.svg";
import Yhk2 from "../public/yhk-2.png";
import iHamberger from "../public/icons/hamburger-menu-icon.png";

//Redux
import { useDispatch } from 'react-redux';
import { dataUser } from '../features/userLoginSlice';
//Redux


axios.defaults.withCredentials = true;


const Navbar = ({ ubahMenu }) => {
    function btnNav(e) {
        //console.log('first=====', e.target.id)
        switch (e.target.id) {
            case 'btn-home':
            case 'img-home':
            case 'li-dropdown-home':
                document.getElementById('li-dropdown-home').classList.remove('sm:bg-transparent');
                document.getElementById('li-dropdown-apbk').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-config').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-spm').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-spp').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-sp2d').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-spd').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-atvis').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-realisasi').classList.add('sm:bg-transparent');
                break;
            // case 'btn-apbk':
            // case 'img-apbk':
            case 'btn-apbk-realisasi':
            case 'btn-apbk-monitor':
                document.getElementById('li-dropdown-home').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-apbk').classList.remove('sm:bg-transparent');
                document.getElementById('li-dropdown-config').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-spm').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-spp').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-sp2d').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-spd').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-atvis').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-realisasi').classList.add('sm:bg-transparent');
                break;
            //          case 'btn-config':
            case 'btn-config-ubahpass':
            case 'btn-config-pejabat':
            case 'btn-config-aparat':
                document.getElementById('li-dropdown-home').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-apbk').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-config').classList.remove('sm:bg-transparent');
                document.getElementById('li-dropdown-spm').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-spp').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-sp2d').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-spd').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-atvis').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-realisasi').classList.add('sm:bg-transparent');
                break;
            // case 'btn-spd':
            // case 'img-spd':
            case 'btn-spp-reguler':
            case 'btn-spp-covid':
            case 'btn-spp-blt':
            case 'btn-spp-add':
            case 'btn-spp-persetujuan':
            case 'btn-spp-laporan':
                document.getElementById('li-dropdown-home').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-apbk').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-config').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-spm').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-spp').classList.remove('sm:bg-transparent');
                document.getElementById('li-dropdown-sp2d').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-spd').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-atvis').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-realisasi').classList.add('sm:bg-transparent');
                break;
            case 'btn-spm-reguler':
            case 'btn-spm-covid':
            case 'btn-spm-blt':
            case 'btn-spm-add':
            case 'btn-spm-persetujuan':
            case 'btn-spm-laporan':
                document.getElementById('li-dropdown-home').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-apbk').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-config').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-spm').classList.remove('sm:bg-transparent');
                document.getElementById('li-dropdown-spp').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-sp2d').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-spd').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-atvis').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-realisasi').classList.add('sm:bg-transparent');
                break;
            // case 'btn-spd':
            case 'btn-spd-reguler':
            case 'btn-spd-covid':
            case 'btn-spd-blt':
            case 'btn-spd-add':
            case 'btn-spd-laporan':
                document.getElementById('li-dropdown-home').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-apbk').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-config').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-spm').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-spp').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-sp2d').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-spd').classList.remove('sm:bg-transparent');
                document.getElementById('li-dropdown-atvis').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-realisasi').classList.add('sm:bg-transparent');
                break;
            // case 'img-sp2d':
            case 'btn-sp2d-reguler':
            case 'btn-sp2d-covid':
            case 'btn-sp2d-blt':
            case 'btn-sp2d-add':
            case 'btn-sp2d-laporan':
            case 'btn-sp2d-laporan-1':
            case 'btn-sp2d-laporan-2':
            case 'btn-sp2d-laporan-3':
            case 'btn-sp2d-laporan-4':
            case 'btn-sp2d-laporan-5':

                document.getElementById('li-dropdown-home').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-apbk').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-config').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-spm').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-spp').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-sp2d').classList.remove('sm:bg-transparent');
                document.getElementById('li-dropdown-spd').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-atvis').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-realisasi').classList.add('sm:bg-transparent');
                break;
            case 'btn-atvis':
            case 'img-atvis':
                document.getElementById('li-dropdown-home').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-apbk').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-config').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-spm').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-spp').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-sp2d').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-spd').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-atvis').classList.remove('sm:bg-transparent');
                document.getElementById('li-dropdown-realisasi').classList.add('sm:bg-transparent');
                break;
            case 'btn-realisasi':
            case 'img-realisasi':
                document.getElementById('li-dropdown-home').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-apbk').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-config').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-spm').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-spp').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-sp2d').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-spd').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-atvis').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-realisasi').classList.remove('sm:bg-transparent');
                break;
            default:
        }
    }

    const [token, setToken] = useState('');
    const [namauser, setNamauser] = useState('');
    const [kd_kampung, setKdkampung] = useState('');
    const [kd_distrik, setKddistrik] = useState('');
    const [kd_lvl1, setKdlvl1] = useState('');
    const [kd_lvl2, setKdlvl2] = useState('');
    const [userId, setUserId] = useState('');
    const [expier, setExpier] = useState('');
    const [vlaporan, setVlaporan] = useState(false);
    const [dataKadis, setDataKadis] = useState({});


    const navLink = useNavigate();

    const refreshtoken = async () => {
        try {
            const respon = await axios.get('/user/token');
            setToken(respon.data.accestoken);
            const decode = jwt_decode(respon.data.accestoken);
            //console.log(decode);
            setExpier(decode.exp);
            setNamauser(decode.nama);
            setKddistrik(decode.kd_distrik);
            setKdkampung(decode.kd_kampung);
            setKdlvl1(decode.kd_lvl1);
            setKdlvl2(decode.kd_lvl2);
            setUserId(decode.userId);
            await axios.get('/kadis').then((e) => { setDataKadis(e.data); console.log("Data kadis di Nav", e.data) })
        } catch (e) {
            //console.log('error refresh token', e.message);
            navLink('/');
        }
    }

    useEffect(() => {
        refreshtoken();
    }, []);
    //Redux Data
    const dispatch = useDispatch();

    useEffect(() => dispatch(dataUser({ namauser, kd_lvl1, kd_lvl2, kd_kampung, kd_distrik, userId, token, dataKadis }))
        , [refreshtoken])
    //Redux Data

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentdate = new Date();
        if (expier * 1000 < currentdate.getTime()) {
            const respon = await axios.get('/user/token');
            config.headers.Authorization = `Bearer ${respon.data.accestoken}`;
            setToken(respon.data.accestoken);
            const decode = jwt_decode(respon.data.accestoken);
            // console.log(decode);
            setNamauser(decode.nama);
            setExpier(decode.exp);
        }
        return config;
    }, (err) => {
        return Promise.reject(err);
    }
    )

    // const getUser = async () => {
    //     const respon = await axiosJWT.get('/user', {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     });
    //     console.log(respon.data);
    // }

    const logOut = async () => {
        try {
            await axios.delete('/user/logout');
            navLink('/');
        } catch (error) { console.log(error) }
    }

    const nmuser = document.getElementById('namauser');
    if (nmuser !== null) {
        nmuser.innerText = namauser;
    }

    return (
        <div className="w-full z-50">
            {/* <div className="hidden" >
                <span>{kd_kampung}</span>
                <span>{kd_distrik}</span>
                <span>{kd_lvl1}</span>
                <span>{kd_lvl2}</span>
            </div> */}
            <nav className="z-50">
                <Header />
                <div className="">
                    <div className="sm:items-center sm:my-auto border-b-4 border-slate-800 sm:border-b-0 transition-all">
                        <div className="flex">
                            <div className="flex pl-3 bg-slate-600 p-1 w-full pr-1">
                                <img url src={Yhk2} alt="Logo Yahukimo" className="h-8 w-8" />
                                <span className="items-center pl-2 my-auto font-extrabold text-white tracking-widest">DPMK</span>
                            </div>
                            <div className="items-center my-auto flex text-center bg-slate-600 h-10 pr-4 pl-2 justify-between space-x-1">
                                <button id="menu" className="px-2 w-12 border p-2 sm:hidden block"><img id="img-humberger" src={iHamberger} alt="menu" className="w-12 h-6"
                                    onClick={() => {
                                        document.getElementById('div-navbar').firstElementChild.classList.toggle('hidden');
                                    }} /></button>
                                <button onClick={logOut} className="-mt-[4.5px] sm:mt-0 flex space-x-1 hover:bg-blue-700 p-2">
                                    <span className="mr-1 font-semibold text-red-100">LOGOUT</span> <LogoutIcon />
                                </button>
                            </div>
                        </div>
                        <div id="div-navbar" className="sm:ml-28">
                            <div className="pl-4 pr-4 text-white font-thin sm:flex sm:flex-row hidden" id="div-nav">
                                <ul className="py-1 my-1 pl-2 sm:flex sm:flex-row sm:-mt-[45px] sm:space-x-1 duration-100 md:space-x-2">
                                    <Link to="/home" onClick={() => { ubahMenu('home') }}>
                                        <li id="li-dropdown-home" className="items-center mx-auto bg-blue-900 pl-2 hover:bg-blue-800 active:bg-blue-900 my-1 rounded-sm sm:w-full flex cursor-pointer sm:py-1" /*onMouseEnter={() => { console.log('home in') }} onMouseLeave={() => { console.log('mouse left') }}*/
                                            onClick={(e) => { btnNav(e) }} >
                                            <div className="mx-auto flex flex-1">
                                                <i><img src={Home} alt="" className="h-6" id="img-home" /></i>
                                                <span className="text-center px-2" id="btn-home">Home</span>
                                            </div>
                                        </li>
                                    </Link>
                                    <li id="li-dropdown-apbk" className="items-center mx-auto bg-blue-900 pl-2 hover:bg-blue-800 active:bg-blue-900 my-1 rounded-sm sm:w-[90px] flex sm:bg-transparent cursor-pointer" onMouseEnter={() => { document.getElementById('div-dropdown-apbk').classList.remove('hidden'); }} onMouseLeave={() => { document.getElementById('div-dropdown-apbk').classList.add('hidden'); }} onClick={(e) => {
                                        btnNav(e);
                                    }}>
                                        <div className="grid grid-cols-1 relative w-full">
                                            <div className="flex flex-row">
                                                <div className="mx-auto flex flex-1">
                                                    <i><img src={Apbk} id="img-home" alt="" className="h-6" /></i>
                                                    <span className="text-center pl-2" id="btn-apbk">APBK</span>
                                                </div>
                                            </div>
                                            <div className="text-slate-800 sm:absolute w-full sm:mt-[26px] sm:-translate-x-4 hidden z-50" id="div-dropdown-apbk">
                                                <ul>
                                                    <Link to="/home/apbk/realisasi" onClick={() => { ubahMenu() }}>
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                            <span id="btn-apbk-realisasi" className="w-full inline-block" onClick={() => {
                                                            }}> <DiOpensource className="inline-block -mt-1 " /> Realisasi APBK</span> </li>
                                                    </Link>
                                                    <Link to="/home/apbk/monitoring" onClick={() => { ubahMenu() }}>
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                            <span id="btn-apbk-monitor" className="w-full inline-block"><DiOpensource className="inline-block -mt-1 " /> Monitor APBK</span> </li>
                                                    </Link>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>

                                    <li className="items-center mx-auto bg-blue-900 pl-2 hover:bg-blue-800 active:bg-blue-900 my-1 rounded-sm sm:w-[90px] flex sm:bg-transparent cursor-pointer" id="li-dropdown-config" onMouseEnter={() => {
                                        document.getElementById('div-dropdown-config').classList.remove('hidden');
                                    }} onMouseLeave={() => { document.getElementById('div-dropdown-config').classList.add('hidden'); }} onClick={(e) => {
                                        btnNav(e);
                                    }}>
                                        <div className="grid grid-cols-1 relative w-full">
                                            <div className="flex flex-row">
                                                <i><img src={Config} alt="" id="img-config" className="h-6 sm:hidden md:block" /></i>
                                                <button className="text-center px-2" id="btn-config">Config</button>
                                            </div>
                                            <div className="text-slate-800 sm:absolute w-full sm:mt-[26px] sm:-translate-x-4 hidden  z-50" id="div-dropdown-config">
                                                <ul className="w-full m-1">
                                                    <Link to="/home/config/ubahpassword" onClick={() => { ubahMenu() }}>
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                            <span id="btn-config-ubahpass" className="w-full inline-block" ><IoBuildOutline className="inline-block -mt-1" /> Ubah Password</span> </li>
                                                    </Link>
                                                    <Link to="/home/config/pejabat" onClick={() => { ubahMenu() }}>
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                            <span id="btn-config-pejabat" className="w-full inline-block"><IoBuildOutline className="inline-block -mt-1" /> Pejabat Pengesahan</span> </li>
                                                    </Link>
                                                    <Link to="/home/config/aparat" onClick={() => { ubahMenu() }}>
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                            <span id="btn-config-aparat" className="w-full inline-block" ><IoBuildOutline className="inline-block -mt-1" /> Aparat Kampung</span> </li>
                                                    </Link>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>

                                    <li id="li-dropdown-spd" className={`hidden items-center mx-auto bg-blue-900 pl-2 hover:bg-blue-800 active:bg-blue-900 my-1 rounded-sm sm:w-[90px] sm:bg-transparent cursor-pointer`} onMouseEnter={() => {
                                        document.getElementById('div-dropdown-spd').classList.remove('hidden');
                                    }} onMouseLeave={() => { document.getElementById('div-dropdown-spd').classList.add('hidden'); }} onClick={(e) => {
                                        btnNav(e);
                                    }}>
                                        <div className="grid grid-cols-1 relative w-full">
                                            <div className="flex flex-row">
                                                <i><img src={Spd} alt="" id="img-spd" className="h-6 sm:hidden md:block" /></i>
                                                <button className="text-center pl-2" id="btn-spd">SPD</button>
                                            </div>
                                            <div className="text-slate-800 sm:absolute w-full sm:mt-[26px] sm:-translate-x-4 hidden z-50" id="div-dropdown-spd">
                                                <ul className="w-full m-1">
                                                    <Link onClick={() => { ubahMenu() }} to="/home/spd/reguler">
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40" >
                                                            <span id="btn-spd-reguler" className="w-full inline-block"><DiCompass className='inline-block -mt-1' /> Reguler</span> </li>
                                                    </Link>
                                                    <Link onClick={() => { ubahMenu() }} to="/home/spd/covid">
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40" >
                                                            <span id="btn-spd-covid" className="w-full inline-block"><DiCompass className='inline-block -mt-1' /> Covid 8%</span> </li>
                                                    </Link>
                                                    <Link onClick={() => { ubahMenu() }} to="/home/spd/blt">
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40" >
                                                            <span id="btn-spd-reguler" className="w-full inline-block"><DiCompass className='inline-block -mt-1' /> B L T</span></li>
                                                    </Link>
                                                    <Link onClick={() => { ubahMenu() }} to="/home/spd/add-honor">
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40" >
                                                            <span id="btn-spd-add" className="w-full inline-block"><DiCompass className='inline-block -mt-1' /> ADD / Honor</span></li>
                                                    </Link>
                                                    <Link onClick={() => { ubahMenu() }} to="/home/spd/laporan">
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40" >
                                                            <span id="btn-spd-laporan" className="w-full inline-block"><GrDocumentText className='inline-block -mt-1 mr-1' />Laporan SPD</span></li>
                                                    </Link>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>

                                    <li id="li-dropdown-spp" className="items-center mx-auto bg-blue-900 pl-2 hover:bg-blue-800 active:bg-blue-900 my-1 rounded-sm sm:w-[90px] flex sm:bg-transparent cursor-pointer" onMouseEnter={() => {
                                        document.getElementById('div-dropdown-spp').classList.remove('hidden');
                                    }} onMouseLeave={() => { document.getElementById('div-dropdown-spp').classList.add('hidden'); }} onClick={(e) => {
                                        btnNav(e);
                                    }}>
                                        <div className="grid grid-cols-1 relative w-full">
                                            <div className="flex flex-row">
                                                <i><img src={Spp} alt="" id="img-spp" className="h-6 sm:hidden md:block" /></i>
                                                <button className="text-center pl-2" id="btn-spp">SP2SPD </button>
                                            </div>
                                            <div className="text-slate-800 sm:absolute w-full sm:mt-[26px] sm:-translate-x-4 hidden  z-50" id="div-dropdown-spp">
                                                <ul className="w-full m-1">
                                                    <Link to="/home/spp/reguler" onClick={() => { ubahMenu() }}>
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40"
                                                            onClick={() => { }}>
                                                            <span id="btn-spp-reguler" className="w-full inline-block" ><DiUbuntu className="inline-block -mt-1" /> Reguler</span> </li>
                                                    </Link>
                                                    <Link onClick={() => { ubahMenu() }} to="/home/spp/covid">
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                            <span id="btn-spp-covid" className="w-full inline-block" ><DiUbuntu className="inline-block -mt-1" /> Covid 8%</span> </li>
                                                    </Link>
                                                    <Link onClick={() => { ubahMenu() }} to="/home/spp/blt">
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                            <span id="btn-spp-blt" className="w-full  inline-block" ><DiUbuntu className="inline-block -mt-1" /> B L T</span></li>
                                                    </Link>
                                                    <Link onClick={() => { ubahMenu() }} to="/home/spp/add-honor">
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                            <span id="btn-spp-add" className="w-full inline-block" ><DiUbuntu className="inline-block -mt-1" />ADD / Honor</span></li>
                                                    </Link>
                                                    <Link onClick={() => { ubahMenu() }} to="/home/spp/persetujuan" className="hidden">
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                            <span id="btn-spp-persetujuan" className="w-full inline-block" > <BsCheck2Square className="inline-block -mt-1" /> Persetujuan SPP Kampung</span></li>
                                                    </Link>
                                                    <Link onClick={() => { ubahMenu() }} to="/home/spp/laporan" className="hidden">
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                            <span id="btn-spp-laporan" className="w-full inline-block" ><GrDocumentText className='inline-block -mt-1 mr-1' />Laporan</span></li>
                                                    </Link>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                    <li id="li-dropdown-spm" className="items-center mx-auto bg-blue-900 pl-2 hover:bg-blue-800 active:bg-blue-900 my-1 rounded-sm sm:w-[90px] flex sm:bg-transparent cursor-pointer" onMouseEnter={() => {
                                        document.getElementById('div-dropdown-spm').classList.remove('hidden');
                                    }} onMouseLeave={() => { document.getElementById('div-dropdown-spm').classList.add('hidden'); }} onClick={(e) => {
                                        btnNav(e);
                                    }}>
                                        <div className="grid grid-cols-1 relative w-full">
                                            <div className="flex flex-row">
                                                <i><img src={Spm} alt="" id="img-spm" className="h-6 sm:hidden md:block" /></i>
                                                <button className="text-center pl-2" id="btn-spm">S K B K </button>
                                            </div>
                                            <div className="text-slate-800 sm:absolute w-full sm:mt-[26px] sm:-translate-x-4 hidden z-50" id="div-dropdown-spm">
                                                <ul className="w-full m-1">
                                                    <Link onClick={() => { ubahMenu() }} to="/home/spm/reguler">
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                            <span id="btn-spm-reguler" className="w-full inline-block" ><DiSafari className="inline-block -mt-1" /> Reguler</span> </li>
                                                    </Link>
                                                    <Link onClick={() => { ubahMenu() }} to="/home/spm/covid">
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                            <span id="btn-spm-covid" className="w-full inline-block" ><DiSafari className="inline-block -mt-1" /> Covid 8%</span> </li>
                                                    </Link>

                                                    <Link onClick={() => { ubahMenu() }} to="/home/spm/blt">
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                            <span id="btn-spm-blt" className="w-full  inline-block" ><DiSafari className="inline-block -mt-1" /> B L T</span></li>
                                                    </Link>

                                                    <Link onClick={() => { ubahMenu() }} to="/home/spm/add-honor">
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                            <span id="btn-spm-add" className="w-full inline-block" ><DiSafari className="inline-block -mt-1" /> ADD / Honor</span></li>
                                                    </Link>
                                                    <Link onClick={() => { ubahMenu() }} to="/home/spm/persetujuan" className="hidden">
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                            <span id="btn-spm-persetujuan" className="w-full inline-block" ><BsCheck2Square className="inline-block -mt-1" />  Persetujuan SPM Kampung</span></li>
                                                    </Link>
                                                    <Link onClick={() => { ubahMenu() }} to="/home/spm/laporan" className="hidden">
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                            <span id="btn-spm-laporan" className="w-full inline-block" ><GrDocumentText className='inline-block -mt-1 mr-1' /> Laporan SPM</span></li>
                                                    </Link>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>

                                    <li id="li-dropdown-sp2d" className={`${kd_lvl1 === 2 ? 'hidden' : null} items-center mx-auto bg-blue-900 pl-2 hover:bg-blue-800 active:bg-blue-900 my-1 rounded-sm sm:w-[90px] flex sm:bg-transparent cursor-pointer`} onMouseEnter={() => {
                                        document.getElementById('div-dropdown-sp2d').classList.remove('hidden');
                                    }} onMouseLeave={() => { document.getElementById('div-dropdown-sp2d').classList.add('hidden'); }} onClick={(e) => {
                                        btnNav(e);
                                    }}>
                                        <div className="grid grid-cols-1 relative w-full">
                                            <div className="flex flex-row">
                                                <i><img src={Sp2d} alt="" id="img-sp2d" className="h-6 sm:hidden md:block" /></i>
                                                <button className="text-center pl-2" id="btn-sp2d">SP2D</button>
                                            </div>
                                            <div className="text-slate-800 sm:absolute w-full sm:mt-[26px] sm:-translate-x-4 hidden z-50" id="div-dropdown-sp2d">
                                                <ul className="w-full m-1">
                                                    <Link onClick={() => { ubahMenu() }} to="/home/sp2d/reguler">
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40" >
                                                            <span id="btn-sp2d-reguler" className="w-full inline-block"><MdAccountBalance className='inline-block -mt-1' /> Reguler</span> </li>
                                                    </Link>
                                                    <Link onClick={() => { ubahMenu() }} to="/home/sp2d/covid">
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40" >
                                                            <span id="btn-sp2d-covid" className="w-full inline-block"><MdAccountBalance className='inline-block -mt-1' /> Covid 8%</span> </li>
                                                    </Link>
                                                    <Link onClick={() => { ubahMenu() }} to="/home/sp2d/blt">
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40" >
                                                            <span id="btn-spd2-reguler" className="w-full inline-block"><MdAccountBalance className='inline-block -mt-1' /> B L T</span></li>
                                                    </Link>
                                                    <Link onClick={() => { ubahMenu() }} to="/home/sp2d/dds">
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40" >
                                                            <span id="btn-spd2-reguler" className="w-full inline-block"><MdAccountBalance className='inline-block -mt-1' /> SP2D DDS</span></li>
                                                    </Link>
                                                    <Link onClick={() => { ubahMenu() }} to="/home/sp2d/add-honor">
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40" >
                                                            <span id="btn-sp2d-add" className="w-full inline-block"><MdAccountBalance className='inline-block -mt-1' /> ADD / Honor</span></li>
                                                    </Link>

                                                    <span >
                                                        <li onMouseEnter={() => setVlaporan(true)} onMouseLeave={() => setVlaporan(false)}
                                                        //className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40" 
                                                        >
                                                            <div className="flex flex-row m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                                <span id="btn-sp2d-laporan" className="w-full inline-block" ><GrDocumentText className='inline-block -mt-1 mr-1' />Laporan SP2D </span>
                                                                <AiOutlineRightSquare className="mt-1" />
                                                            </div>
                                                            {vlaporan ?
                                                                <div className="absolute ml-[160px] -mt-8 z-[51]" onMouseEnter={() => setVlaporan(true)}>
                                                                    <li className="m-1 bg-slate-400 w-[90%] pl-1 mr-8 rounded-sm hover:bg-slate-600 hover:text-white sm:w-40 flex flex-row"><CgPentagonRight className="mt-1" /><span ><Link id="btn-sp2d-laporan-1" onClick={(e) => { ubahMenu(); btnNav(e); }} to="/home/sp2d/lapreg">Laporan DDS Reg</Link></span></li>
                                                                    <li className="m-1 bg-slate-400 w-[90%] pl-1 mr-8 rounded-sm hover:bg-slate-600 hover:text-white sm:w-40 flex flex-row"><CgPentagonRight className="mt-1" /><span ><Link id="btn-sp2d-laporan-2" onClick={(e) => { ubahMenu(); btnNav(e); }} to="/home/sp2d/lapblt">Laporan BLT</Link></span></li>
                                                                    <li className="m-1 bg-slate-400 w-[90%] pl-1 mr-8 rounded-sm hover:bg-slate-600 hover:text-white sm:w-40 flex flex-row"><CgPentagonRight className="mt-1" /><span ><Link id="btn-sp2d-laporan-3" onClick={(e) => { ubahMenu(); btnNav(e); }} to="/home/sp2d/lapcov">Laporan Covid</Link></span></li>
                                                                    <li className="m-1 bg-slate-400 w-[90%] pl-1 mr-8 rounded-sm hover:bg-slate-600 hover:text-white sm:w-40 flex flex-row"><CgPentagonRight className="mt-1" /><span ><Link id="btn-sp2d-laporan-4" onClick={(e) => { ubahMenu(); btnNav(e); }} to="/home/sp2d/lapadd">Laporan Add</Link></span></li>
                                                                    <li className="m-1 bg-slate-400 w-[90%] pl-1 mr-8 rounded-sm hover:bg-slate-600 hover:text-white sm:w-40 flex flex-row"><CgPentagonRight className="mt-1" /><span ><Link id="btn-sp2d-laporan-5" onClick={(e) => { ubahMenu(); btnNav(e); }} to="/home/sp2d/laporan">Laporan Gabungan</Link></span></li>
                                                                </div> : null
                                                            }
                                                        </li>
                                                    </span>

                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                    <Link onClick={() => { ubahMenu() }} to="/home/atvis" className={`${kd_lvl1 === 2 ? 'hidden' : null}`} >
                                        <li id="li-dropdown-atvis" className=" items-center mx-auto bg-blue-900 pl-2 hover:bg-blue-800 active:bg-blue-900 my-1 rounded-sm sm:w-[90px] flex cursor-pointer sm:py-1 sm:bg-transparent" onClick={(e) => { btnNav(e); }} >
                                            <i><img src={Atvis} id="img-atvis" alt="" className="h-6 sm:hidden md:block" /></i>
                                            <span className="text-center pl-2" id="btn-atvis">Atvis</span>
                                        </li>
                                    </Link>
                                    <Link onClick={() => { ubahMenu() }} to="/home/realisasi" className={`${kd_lvl1 === 2 ? 'hidden' : null} inline-block w-full sm:w-11`}>
                                        <li id="li-dropdown-realisasi" className="items-center mx-auto bg-blue-900 pl-2 hover:bg-blue-800 active:bg-blue-900 my-1 rounded-sm sm:w-[190px] flex cursor-pointer sm:py-1 sm:bg-transparent" onClick={(e) => { btnNav(e); }} >
                                            <i><img src={Realisasii} id="img-realisasi" alt="ico" className="h-6 sm:hidden md:block" /></i>
                                            <span className="text-center pl-2" id="btn-realisasi">Realisasi Anggaran</span>
                                        </li>
                                    </Link>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav >
        </div >

    )
}

export default Navbar;

