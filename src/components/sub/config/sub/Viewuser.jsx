import axios from 'axios';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

const stylemodal = {
    content: {
        top: '60%',
        left: '60%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(0%, 0%)',
    },
};


const stylemodalinfo = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.35)',
        border: '0px solid #ccc',
    },
    content: {
        position: 'absolute',
        top: '20%',
        left: '30%',
        right: '30%',
        bottom: '40%',
        border: '0px solid #ccc',
        background: '#fff',
        overflow: 'hidden',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '40px',
        outline: 'none',
        padding: '20px',
        height: '80px',
        width: '520px',
        backgroundColor: 'transparent'
    }
};

Modal.setAppElement('#root');

function Viewuser({ getUser }) {
    const navLink = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showModalinfo, setShowModalinfo] = useState(false);
    const [nama, setnama] = useState('');
    const [password, setpassword] = useState('');
    const [nohp, setnohp] = useState('');
    const [email, setemail] = useState('');
    const [username, setusername] = useState('');
    const [kdlvl1, setkdlvl1] = useState(11);
    const [kdlvl2, setkdlvl2] = useState(12);
    const [kdkampung, setkdkampung] = useState(22);
    const [kddistrik, setkddistrik] = useState(23);

    function setBlank() {
        setnama('');
        setpassword('');
        setnohp('');
        setemail('');
        setusername('');
        setkdlvl1('');
        setkdlvl2('');
    }

    const saveUser = async (e) => {
        console.log('savee');
        try {
            await axios.post('http://127.0.0.1:3002/user', {
                nama: nama,
                username: username,
                password: password,
                email: email,
                nohp: nohp,
                hd_lvl1: kdlvl1,
                hd_lvl2: kdlvl2
            });
            setShowModal(false);
            setShowModalinfo(true);
            //setTimeout(setShowModalinfo(false), 30000);
            navLink('/home/config/ubahpassword');
            getUser();
            setBlank();

            let timeout;

            function myFunction() {
                timeout = setTimeout(alertFunc, 3000);
            }

            function alertFunc() {
                //alert("Hello!");
                setShowModalinfo(false);
            }

            myFunction();




        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <button className="h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
                onClick={() => { setShowModal(true) }}
            >Tambah Pengguna</button>
            <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)}
                style={{
                    overlay: {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(255, 255, 255, 0.35)'
                    },
                    content: {
                        position: 'absolute',
                        top: '20%',
                        left: '30%',
                        right: '30%',
                        bottom: '20%',
                        border: '1px solid #ccc',
                        background: '#fff',
                        overflow: 'hidden',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '4px',
                        outline: 'none',
                        padding: '20px',
                        height: '320px'
                    }
                }}

            >
                <h1 className='text-center font-bold text-slate-800 mb-4'>Menambah User Baru</h1>
                <hr />
                <div className="space-y-2 mb-2">
                    <form onSubmit={(e) => { e.preventDefault(); saveUser() }} className="space-y-2 mt-2" >
                        <div className="grid grid-cols-5">
                            <label htmlFor="nama" className='shadow-blue-600 shadow-sm rounded-sm'>Nama</label>
                            <input type="text"
                                name="nama" id="nama"
                                className="outline-none  border-blue-600 ring-1  ring-blue-700 pl-2 ml-2 col-span-4 ... rounded-sm shadow-md active:ring-4 active:ring-blue-400"
                                placeholder="nama"
                                value={nama}
                                onChange={(e) => setnama(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-5">
                            <label htmlFor="username" className='shadow-blue-600 shadow-sm rounded-sm'>username</label>
                            <input type="text"
                                name="username" id="username"
                                className="outline-none  border-blue-600 ring-1  ring-blue-700 pl-2 ml-2 col-span-4 ... rounded-sm shadow-md active:ring-4 active:ring-blue-400" placeholder="username"
                                value={username}
                                onChange={(e) => setusername(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-5">
                            <label htmlFor="password" className='shadow-blue-600 shadow-sm rounded-sm'>password</label>
                            <input type="password"
                                name="password" id="password"
                                className="outline-none  border-blue-600 ring-1  ring-blue-700 pl-2 ml-2 col-span-4 ... rounded-sm shadow-md active:ring-4 active:ring-blue-400"
                                placeholder="password"
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-5">
                            <label htmlFor="nohp" className='shadow-blue-600 shadow-sm rounded-sm'>Nohp</label>
                            <input type="text" name="nohp" id="nohp"
                                className="outline-none  border-blue-600 ring-1  ring-blue-700 pl-2 ml-2 col-span-4 ... rounded-sm shadow-md active:ring-4 active:ring-blue-400"
                                placeholder="no Handphone"
                                value={nohp}
                                onChange={(e) => setnohp(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-5 mb-5">
                            <label htmlFor="email" className='shadow-blue-600 shadow-sm rounded-sm'>Email</label>
                            <input type="text" name="email" id="email"
                                className="outline-none  border-blue-600 ring-1  ring-blue-700 pl-2 ml-2 col-span-4 ... rounded-sm shadow-md active:ring-4 active:ring-blue-400"
                                placeholder="email"
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-6 gap-1 mt-5">
                            <div className='...'></div>
                            <span className="mt-3 text-center rounded-md bg-red-700 hover:bg-red-800 p-2 active:bg-red-700 col-span-2 ... shadow-md active:ring-2 active:ring-blue-400 hover:text-yellow-50"
                                onClick={(e) => { setShowModal(false) }}
                            >BATAL
                            </span>
                            <button className="mt-3 rounded-md bg-blue-700 hover:bg-blue-800 p-2 active:bg-blue-700 col-span-2 ... shadow-md active:ring-2 active:ring-blue-400 hover:text-yellow-50"
                            >SIMPAN
                            </button>
                            <div className='...'></div>
                        </div>
                    </form>
                    <div>{nama} - {username}</div>
                </div>
            </Modal>
            <Modal isOpen={showModalinfo} style={stylemodalinfo} onRequestClose={() => setShowModalinfo(false)}>
                <div className='bg-transparent mx-auto font-black  h-full items-center flex border '><span className='mx-auto items-center text-center my-auto text-blue-900'>Pengguna Berhasil Di Tambahkan</span> </div>
            </Modal>

        </>
    )
}

export default Viewuser