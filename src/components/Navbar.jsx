//import { useState, useEffect } from 'react';

const Navbar = () => {

    function btnNav(e) {
        switch (e.target.id) {
            case 'btn-home':
            case 'img-home':
                document.getElementById('li-dropdown-home').classList.remove('sm:bg-transparent');
                document.getElementById('li-dropdown-apbk').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-config').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-spd').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-sp2d').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-atvis').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-realisasi').classList.add('sm:bg-transparent');
                break;
            case 'btn-apbk':
            case 'img-apbk':
                document.getElementById('li-dropdown-home').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-apbk').classList.remove('sm:bg-transparent');
                document.getElementById('li-dropdown-config').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-spd').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-sp2d').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-atvis').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-realisasi').classList.add('sm:bg-transparent');
                break;
            //          case 'btn-config':
            case 'btn-config-ubahpass':
            case 'btn-config-pejabat':
                //            case 'img-config':
                document.getElementById('li-dropdown-home').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-apbk').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-config').classList.remove('sm:bg-transparent');
                document.getElementById('li-dropdown-spd').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-sp2d').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-atvis').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-realisasi').classList.add('sm:bg-transparent');
                break;
            // case 'btn-spd':
            // case 'img-spd':
            case 'btn-spd-reguler':
            case 'btn-spd-covid':
            case 'btn-spd-blt':
            case 'btn-spd-add':
                document.getElementById('li-dropdown-home').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-apbk').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-config').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-spd').classList.remove('sm:bg-transparent');
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
                document.getElementById('li-dropdown-home').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-apbk').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-config').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-spd').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-sp2d').classList.remove('sm:bg-transparent');
                document.getElementById('li-dropdown-atvis').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-realisasi').classList.add('sm:bg-transparent');
                break;
            case 'btn-atvis':
            case 'img-atvis':
                document.getElementById('li-dropdown-home').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-apbk').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-config').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-spd').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-sp2d').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-atvis').classList.remove('sm:bg-transparent');
                document.getElementById('li-dropdown-realisasi').classList.add('sm:bg-transparent');
                break;
            case 'btn-realisasi':
            case 'img-realisasi':
                document.getElementById('li-dropdown-home').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-apbk').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-config').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-spd').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-sp2d').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-atvis').classList.add('sm:bg-transparent');
                document.getElementById('li-dropdown-realisasi').classList.remove('sm:bg-transparent');
                break;
        }
    }

    return (
        <div>
            <div className="fixed w-full">
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
                            <button id="btn-loginout" className="px-2 cursor-pointer justify-center hover:bg-blue-700 h-10 pt-2 p-1 rounded-md sm:flex sm:flex-row text-slate-200">
                                <div className="-mt-[4.5px]">
                                    <div>
                                        <img src="icons/icons8-connect-50.svg" className="hidden sm:block -mt-1" alt="logout" />
                                    </div>
                                </div>
                                LOGOUT
                            </button>
                        </div>
                    </div>
                    <div id="div-navbar" className="sm:ml-28">
                        <div className="pl-4 pr-4 text-white font-thin sm:flex sm:flex-row sm:space-x-1 hidden" id="div-nav">
                            <ul className="py-1 my-1 pl-2 sm:flex sm:flex-row sm:-mt-[45px] sm:space-x-2 duration-100">
                                <li id="li-dropdown-home" className="items-center mx-auto bg-blue-900 pl-2 hover:bg-blue-800 active:bg-blue-900 my-1 rounded-sm sm:w-[90px] flex cursor-pointer sm:py-1" onMouseEnter={() => { console.log('home in') }} onMouseLeave={() => { console.log('mouse left') }} onClick={(e) => {
                                    btnNav(e);
                                }} >
                                    <i><img src="icons/icons8-home.svg" id="img-home" alt="" className="h-6 sm:hidden md:block" /></i>
                                    <a href="#" className="text-center pl-2" id="btn-home">Home</a>
                                </li>
                                <li id="li-dropdown-apbk" className="items-center mx-auto bg-blue-900 pl-2 hover:bg-blue-800 active:bg-blue-900 my-1 rounded-sm sm:w-[90px] flex sm:bg-transparent cursor-pointer" onMouseEnter={() => { console.log('apbk in') }} onMouseLeave={() => { console.log('apbk left') }} onClick={(e) => {
                                    btnNav(e);
                                }}>
                                    <i><img src="icons/icons8-document-50.svg" alt="" id="img-apbk" className="h-6 sm:hidden md:block" /></i>
                                    <a href="#" className="text-center pl-2" id="btn-apbk">APBK</a></li>
                                <li className="items-center mx-auto bg-blue-900 pl-2 hover:bg-blue-800 active:bg-blue-900 my-1 rounded-sm sm:w-[90px] flex sm:bg-transparent cursor-pointer" id="li-dropdown-config" onMouseEnter={() => {
                                    document.getElementById('div-dropdown-config').classList.remove('hidden');
                                }} onMouseLeave={() => { document.getElementById('div-dropdown-config').classList.add('hidden'); }} onClick={(e) => {
                                    btnNav(e);
                                }}>
                                    <div className="grid grid-cols-1 relative w-full">
                                        <div className="flex flex-row">
                                            <i><img src="icons/icons8-settings-50.svg" alt="" id="img-config" className="h-6 sm:hidden md:block" /></i>
                                            <button className="text-center pl-2" id="btn-config">Config</button>
                                        </div>
                                        <div className="text-slate-800 sm:absolute w-full sm:mt-[26px] sm:-translate-x-4 hidden" id="div-dropdown-config">
                                            <ul className="w-full m-1">
                                                <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                    <a href="#" id="btn-config-ubahpass" className="w-full inline-block" onClick={() => {
                                                        console.log('Ubah Pass');
                                                    }}>Ubah Password</a> </li>
                                                <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                    <a href="#" id="btn-config-pejabat" className="w-full inline-block" onClick={() => {
                                                        console.log('Pejabat');
                                                    }}>Pejabat Pengesahan</a> </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li><li id="li-dropdown-spd" className="items-center mx-auto bg-blue-900 pl-2 hover:bg-blue-800 active:bg-blue-900 my-1 rounded-sm sm:w-[90px] flex sm:bg-transparent cursor-pointer" onMouseEnter={() => {
                                    document.getElementById('div-dropdown-spd').classList.remove('hidden');
                                }} onMouseLeave={() => { document.getElementById('div-dropdown-spd').classList.add('hidden'); }} onClick={(e) => {
                                    btnNav(e);
                                }}>
                                    <div className="grid grid-cols-1 relative w-full">
                                        <div className="flex flex-row">
                                            <i><img src="icons/icons8-news-50.svg" alt="" id="img-spd" className="h-6 sm:hidden md:block" /></i>
                                            <button className="text-center pl-2" id="btn-spd">SPD</button>
                                        </div>
                                        <div className="text-slate-800 sm:absolute w-full sm:mt-[26px] sm:-translate-x-4 hidden" id="div-dropdown-spd">
                                            <ul className="w-full m-1">
                                                <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                    <a href="#" id="btn-spd-reguler" className="w-full inline-block" onClick={() => {
                                                        console.log('Spd reg');
                                                    }}>Reguler</a> </li>
                                                <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                    <a href="#" id="btn-spd-covid" className="w-full inline-block" onClick={(e) => {
                                                        console.log('Spd Covid', e);
                                                    }}>Covid 8%</a> </li>
                                                <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                    <a href="#" id="btn-spd-blt" className="w-full  inline-block" onClick={() => {
                                                        console.log('Spd BLT');
                                                    }}>B L T</a></li>
                                                <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                    <a href="#" id="btn-spd-add" className="w-full inline-block" onClick={() => {
                                                        console.log('Spd ADD');
                                                    }}>ADD / Honor</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </li><li id="li-dropdown-sp2d" className="items-center mx-auto bg-blue-900 pl-2 hover:bg-blue-800 active:bg-blue-900 my-1 rounded-sm sm:w-[90px] flex sm:bg-transparent cursor-pointer" onMouseEnter={() => {
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
                                                <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                    <a href="#" id="btn-sp2d-reguler" className="w-full inline-block">Reguler</a> </li>
                                                <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                    <a href="#" id="btn-sp2d-covid" className="w-full inline-block">Covid 8%</a> </li>
                                                <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                    <a href="#" id="btn-spd2-reguler" className="w-full inline-block">B L T</a></li>
                                                <li className="m-1 bg-slate-200 w-[93%] pl-1 mr-8 rounded-sm hover:bg-slate-300 hover:text-white sm:w-40">
                                                    <a href="#" id="btn-sp2d-add" className="w-full inline-block">ADD / Honor</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li id="li-dropdown-atvis" className="items-center mx-auto bg-blue-900 pl-2 hover:bg-blue-800 active:bg-blue-900 my-1 rounded-sm sm:w-[90px] flex sm:bg-transparent cursor-pointer  group" onClick={(e) => {
                                    btnNav(e);
                                }}>
                                    <i><img src="icons/icons8-services-50.svg" alt="" id="img-atvis" className="h-6 sm:hidden md:block" /></i>
                                    <a href="#" className="text-center pl-2" id="btn-atvis">ATVIS</a></li>
                                <li id="li-dropdown-realisasi" className="items-center mx-auto bg-blue-900 pl-2 hover:bg-blue-800 active:bg-blue-900 my-1 rounded-sm sm:w-44 flex sm:bg-transparent cursor-pointer group" onClick={(e) => {
                                    btnNav(e);
                                }}>
                                    <i><img src="icons/icons8-about-50.svg" alt="" id="img-realisasi" className="h-6 sm:hidden md:block" /></i>
                                    <a href="#" className="text-center pl-2" id="btn-realisasi">Realisasi
                                        Anggaran</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;