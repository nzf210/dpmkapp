import { Link } from "react-router-dom";
import Header from "./Header"
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

axios.defaults.withCredentials = true;


// axios.interceptors.request.use(
//     config => {
//         config.headers.authorization = `Bearer ${tkn}`;
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );


const Navbar = ({ ubahMenu }) => {

    function btnNav(e) {
        switch (e.target.id) {
            case 'btn-home':
            case 'img-home':
                document.getElementById('li-dropdown-home').classList.remove('sm:bg-transparent');
                document.getElementById('li-dropdown-apbk').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-config').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-spm').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-spp').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-sp2d').classList.add('sm:bg-transparent');
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
                document.getElementById('li-dropdown-atvis').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-realisasi').classList.add('sm:bg-transparent');
                break;
            // case 'btn-sp2d':
            // case 'img-sp2d':
            case 'btn-sp2d-reguler':
            case 'btn-sp2d-covid':
            case 'btn-sp2d-blt':
            case 'btn-sp2d-add':
            case 'btn-sp2d-laporan':
                document.getElementById('li-dropdown-home').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-apbk').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-config').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-spm').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-spp').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-sp2d').classList.remove('sm:bg-transparent');
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
                document.getElementById('li-dropdown-atvis').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-realisasi').classList.remove('sm:bg-transparent');
                break;
            default:
        }
    }

    const [nama, setNama] = useState('');
    const [token, setToken] = useState('');
    const [namauser, setNamauser] = useState('');


    useEffect(() => {
        refreshtoken();
    }, []);

    const refreshtoken = async () => {
        try {
            const respon = await axios.get('token');
            setToken(respon.data.accestoken);
            const decode = jwt_decode(respon.data.accestoken);
            console.log(decode);
            setNamauser(decode.nama);
        } catch (e) {
            console.log('ddd', e.message);
        }
    }


    document.getElementById('namauser').innerText = namauser

    return (

        <div className="fixed w-full h-full">
            <nav>
                <Header />
                <div className="w-full h-full">
                    <div className="sm:items-center sm:my-auto border-b-4 border-slate-800 sm:border-b-0 transition-all">
                        <div className="flex">
                            <div className="flex pl-3 bg-slate-600 p-1 w-full pr-1">
                                <img src="yhk-2.png" alt="Logo Yahukimo" className="h-8 w-8" />
                                <span className="items-center pl-2 my-auto font-extrabold text-white tracking-widest">DPMK</span>
                            </div>
                            <div className="items-center my-auto flex text-center bg-slate-600 h-10 pr-4 pl-2 justify-between space-x-1">
                                <button id="menu" className="px-2 w-12 border p-2 sm:hidden block"><img id="img-humberger" src="icons/hamburger-menu-icon.png" alt="menu" className="w-12 h-6"
                                    onClick={() => {
                                        document.getElementById('div-navbar').firstElementChild.classList.toggle('hidden');
                                    }} /></button>
                                <Link to="/" className="-mt-[4.5px] sm:mt-0 flex space-x-1 hover:bg-blue-700 p-2">
                                    <span className="mr-1 font-semibold text-red-100">LOGOUT</span>  <LogoutIcon />
                                </Link>
                            </div>
                        </div>
                        <div id="div-navbar" className="sm:ml-28">
                            <div className="pl-4 pr-4 text-white font-thin sm:flex sm:flex-row hidden" id="div-nav">
                                <ul className="py-1 my-1 pl-2 sm:flex sm:flex-row sm:-mt-[45px] sm:space-x-1 duration-100 md:space-x-2">
                                    <Link to="/home" onClick={() => { ubahMenu('home') }}>
                                        <li id="li-dropdown-home" className="items-center mx-auto bg-blue-900 pl-2 hover:bg-blue-800 active:bg-blue-900 my-1 rounded-sm sm:w-full flex cursor-pointer sm:py-1" onMouseEnter={() => { console.log('home in') }} onMouseLeave={() => { console.log('mouse left') }} onClick={(e) => { btnNav(e) }} >
                                            <div className="mx-auto flex flex-1">
                                                <i><img src="icons/icons8-home.svg" id="img-home" alt="" className="h-6" /></i>
                                                <span className="text-center  pl-2 sm:pl-1 lg:pl-3" id="btn-home">Home</span>
                                            </div>
                                        </li>
                                    </Link>
                                    <li id="li-dropdown-apbk" className="items-center mx-auto bg-blue-900 pl-2 hover:bg-blue-800 active:bg-blue-900 my-1 rounded-sm sm:w-[90px] flex sm:bg-transparent cursor-pointer" onMouseEnter={() => { document.getElementById('div-dropdown-apbk').classList.remove('hidden'); }} onMouseLeave={() => { document.getElementById('div-dropdown-apbk').classList.add('hidden'); }} onClick={(e) => {
                                        btnNav(e);
                                    }}>
                                        <div className="grid grid-cols-1 relative w-full">
                                            <div className="flex flex-row">
                                                <div className="mx-auto flex flex-1">
                                                    <i><img src="icons/icons8-bookmark-50.svg" id="img-home" alt="" className="h-6" /></i>
                                                    <span className="text-center pl-2" id="btn-apbk">APBK</span>
                                                </div>
                                            </div>
                                            <div className="text-slate-800 sm:absolute w-full sm:mt-[26px] sm:-translate-x-4 hidden" id="div-dropdown-apbk">
                                                <ul className="w-full m-1">
                                                    <Link to="/home/apbk/realisasi" onClick={() => { ubahMenu() }} >

                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                            <span id="btn-apbk-realisasi" className="w-full inline-block" onClick={() => {
                                                            }}>🛂 Realisasi APBK</span> </li>

                                                    </Link>
                                                    <Link to="/home/apbk/monitoring" onClick={() => { ubahMenu() }}>
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                            <span id="btn-apbk-monitor" className="w-full inline-block" onClick={() => { }}>🛂 Monitor APBK</span> </li>
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
                                                <i><img src="icons/icons8-settings-50.svg" alt="" id="img-config" className="h-6 sm:hidden md:block" /></i>
                                                <button className="text-center pl-2 sm:pl-1 lg:pl-3" id="btn-config">Config</button>
                                            </div>
                                            <div className="text-slate-800 sm:absolute w-full sm:mt-[26px] sm:-translate-x-4 hidden" id="div-dropdown-config">
                                                <ul className="w-full m-1">
                                                    <Link to="/home/config/ubahpassword" onClick={() => { ubahMenu() }}>
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                            <span id="btn-config-ubahpass" className="w-full inline-block" >🛂 Ubah Password</span> </li>
                                                    </Link>
                                                    <Link to="/home/config/pejabat" onClick={() => { ubahMenu() }}>
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                            <span id="btn-config-pejabat" className="w-full inline-block">🛂 Pejabat Pengesahan</span> </li>
                                                    </Link>
                                                    <Link to="/home/config/aparat" onClick={() => { ubahMenu() }}>
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                            <span id="btn-config-aparat" className="w-full inline-block" >🛂 Aparat Kampung</span> </li>
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
                                                <i><img src="icons/icons8-file-50.svg" alt="" id="img-spp" className="h-6 sm:hidden md:block" /></i>
                                                <button className="text-center pl-2" id="btn-spp">SPP</button>
                                            </div>
                                            <div className="text-slate-800 sm:absolute w-full sm:mt-[26px] sm:-translate-x-4 hidden" id="div-dropdown-spp">
                                                <ul className="w-full m-1">
                                                    <Link to="/home/spp/reguler" onClick={() => { ubahMenu() }}>
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40"
                                                            onClick={() => { }}>
                                                            <span id="btn-spp-reguler" className="w-full inline-block" >🛂 Reguler</span> </li>
                                                    </Link>
                                                    <Link onClick={() => { ubahMenu() }} to="/home/spp/covid">
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                            <span id="btn-spp-covid" className="w-full inline-block" onClick={(e) => { }}>🛂 Covid 8%</span> </li>
                                                    </Link>
                                                    <Link onClick={() => { ubahMenu() }} to="/home/spp/blt">
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                            <span id="btn-spp-blt" className="w-full  inline-block" onClick={() => { }}>🛂 B L T</span></li>
                                                    </Link>
                                                    <Link onClick={() => { ubahMenu() }} to="/home/spp/add-honor">
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                            <span id="btn-spp-add" className="w-full inline-block" onClick={() => { }}>🛂 ADD / Honor</span></li>
                                                    </Link>
                                                    <Link onClick={() => { ubahMenu() }} to="/home/spp/persetujuan">
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                            <span id="btn-spp-persetujuan" className="w-full inline-block" onClick={() => { }}>✅ Persetujuan SPP Kampung</span></li>
                                                    </Link>
                                                    <Link onClick={() => { ubahMenu() }} to="/home/spp/laporan">
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                            <span id="btn-spp-laporan" className="w-full inline-block" onClick={() => { }}>📃Laporan</span></li>
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
                                                <i><img src="icons/icons8-news-50.svg" alt="" id="img-spm" className="h-6 sm:hidden md:block" /></i>
                                                <button className="text-center pl-2" id="btn-spm">SPM</button>
                                            </div>
                                            <div className="text-slate-800 sm:absolute w-full sm:mt-[26px] sm:-translate-x-4 hidden" id="div-dropdown-spm">
                                                <ul className="w-full m-1">
                                                    <Link onClick={() => { ubahMenu() }} to="/home/spm/reguler">
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                            <span id="btn-spm-reguler" className="w-full inline-block" onClick={() => { }}>🛂 Reguler</span> </li>
                                                    </Link>
                                                    <Link onClick={() => { ubahMenu() }} to="/home/spm/covid">
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                            <span id="btn-spm-covid" className="w-full inline-block" onClick={(e) => { }}>🛂 Covid 8%</span> </li>
                                                    </Link>

                                                    <Link onClick={() => { ubahMenu() }} to="/home/spm/blt">
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                            <span id="btn-spm-blt" className="w-full  inline-block" onClick={() => { }}>🛂 B L T</span></li>
                                                    </Link>

                                                    <Link onClick={() => { ubahMenu() }} to="/home/spm/add-honor">
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                            <span id="btn-spm-add" className="w-full inline-block" onClick={() => { }}>🛂 ADD / Honor</span></li>
                                                    </Link>
                                                    <Link onClick={() => { ubahMenu() }} to="/home/spm/persetujuan">
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                            <span id="btn-spm-persetujuan" className="w-full inline-block" onClick={() => { }}>✅ Persetujuan SPM Kampung</span></li>
                                                    </Link>
                                                    <Link onClick={() => { ubahMenu() }} to="/home/spm/laporan">
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                            <span id="btn-spm-laporan" className="w-full inline-block" onClick={() => { }}>📃 Laporan SPM</span></li>
                                                    </Link>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                    <li id="li-dropdown-sp2d" className="items-center mx-auto bg-blue-900 pl-2 hover:bg-blue-800 active:bg-blue-900 my-1 rounded-sm sm:w-[90px] flex sm:bg-transparent cursor-pointer" onMouseEnter={() => {
                                        document.getElementById('div-dropdown-sp2d').classList.remove('hidden');
                                    }} onMouseLeave={() => { document.getElementById('div-dropdown-sp2d').classList.add('hidden'); }} onClick={(e) => {
                                        btnNav(e);
                                    }}>
                                        <div className="grid grid-cols-1 relative w-full">
                                            <div className="flex flex-row">
                                                <i><img src="icons/icons8-speech-bubble-50.svg" alt="" id="img-sp2d" className="h-6 sm:hidden md:block" /></i>
                                                <button className="text-center pl-2" id="btn-sp2d">SP2D</button>
                                            </div>
                                            <div className="text-slate-800 sm:absolute w-full sm:mt-[26px] sm:-translate-x-4 hidden" id="div-dropdown-sp2d">
                                                <ul className="w-full m-1">

                                                    <Link onClick={() => { ubahMenu() }} to="/home/sp2d/reguler">
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40" onClick={() => { }}>
                                                            <span id="btn-sp2d-reguler" className="w-full inline-block">🛂 Reguler</span> </li>
                                                    </Link>
                                                    <Link onClick={() => { ubahMenu() }} to="/home/sp2d/covid">
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40" onClick={() => { }}>
                                                            <span id="btn-sp2d-covid" className="w-full inline-block">🛂 Covid 8%</span> </li>
                                                    </Link>
                                                    <Link onClick={() => { ubahMenu() }} to="/home/sp2d/blt">
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40" onClick={() => { }}>
                                                            <span id="btn-spd2-reguler" className="w-full inline-block">🛂 B L T</span></li>
                                                    </Link>
                                                    <Link onClick={() => { ubahMenu() }} to="/home/sp2d/add-honor">
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40" onClick={() => { }}>
                                                            <span id="btn-sp2d-add" className="w-full inline-block">🛂 ADD / Honor</span></li>
                                                    </Link>
                                                    <Link onClick={() => { ubahMenu() }} to="/home/sp2d/laporan">
                                                        <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40" onClick={() => { }}>
                                                            <span id="btn-sp2d-laporan" className="w-full inline-block">📃Laporan SP2D</span></li>
                                                    </Link>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                    <Link onClick={() => { ubahMenu() }} to="/home/atvis">
                                        <li id="li-dropdown-atvis" className="items-center mx-auto bg-blue-900 pl-2 hover:bg-blue-800 active:bg-blue-900 my-1 rounded-sm sm:w-[90px] flex cursor-pointer sm:py-1 sm:bg-transparent" onClick={(e) => { btnNav(e); }} >
                                            <i><img src="icons/icons8-services-50.svg" id="img-atvis" alt="" className="h-6 sm:hidden md:block" /></i>
                                            <span className="text-center pl-2" id="btn-atvis">Atvis</span>
                                        </li>
                                    </Link>
                                    <Link onClick={() => { ubahMenu() }} to="/home/realisasi" className="inline-block w-full sm:w-11">
                                        <li id="li-dropdown-realisasi" className="items-center mx-auto bg-blue-900 pl-2 hover:bg-blue-800 active:bg-blue-900 my-1 rounded-sm sm:w-[190px] flex cursor-pointer sm:py-1 sm:bg-transparent" onClick={(e) => { btnNav(e); }} >
                                            <i><img src="icons/icons8-about-50.svg" id="img-realisasi" alt="ico" className="h-6 sm:hidden md:block" /></i>
                                            <span className="text-center pl-2" id="btn-realisasi">Realisasi Anggaran</span>
                                        </li>
                                    </Link>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav >
        </div>

    )
}

export default Navbar;

