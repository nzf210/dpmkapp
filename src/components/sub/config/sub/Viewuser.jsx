import axios from 'axios';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

import { Dialog } from '@headlessui/react'


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
    const [kd_lvl1, setkdlvl1] = useState(2);
    const [kd_lvl2, setkdlvl2] = useState(1);
    const [kd_kampung, setkdkampung] = useState(2);
    const [kd_distrik, setkddistrik] = useState(1);
    const [info, setinfo] = useState('');

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
            const user = await axios.post('/user', {
                nama: nama,
                username: username,
                nohp: nohp,
                email: email,
                password: password,
                ulangpassword: password,
                kd_lvl1: kd_lvl1,
                kd_lvl2: kd_lvl2,
                kd_distrik: kd_distrik,
                kd_kampung: kd_kampung
            });
            setShowModal(false);
            setShowModalinfo(true);

            navLink('/home/config/ubahpassword');
            getUser();
            setBlank();

            let timeout;
            function myFunction() {
                timeout = setTimeout(alertFunc, 1000);
            }
            function alertFunc() {
                setShowModalinfo(false);
            }
            myFunction();

            setinfo(user.data.response.info);

        } catch (e) {
            if (e.response) {
                setinfo(e.response.data.info);
            }
        }
    }

    return (
        <div className='mx-auto mt-8 justify-center bg-blue-300'>
            <div className='container mx-auto'>
                <MyDialog />
            </div>
        </div>
    )
}

export default Viewuser;

function MyDialog() {
    let [isOpen, setIsOpen] = useState(false)

    return (
        <div className='mx-auto justify-center'>
            <div className='grid grid-cols-1'>
                <div>
                    <button onClick={() => { setIsOpen(true) }} className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-md p-2 text-white font-semibold"> Tambah Pengguna </button>
                </div>
                <div>
                    <div>
                        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                            <Dialog.Overlay />

                            <Dialog.Title>Deactivate account</Dialog.Title>
                            <Dialog.Description>
                                This will permanently deactivate your account
                            </Dialog.Description>

                            <p>
                                Are you sure you want to deactivate your account? All of your data will
                                be permanently removed. This action cannot be undone.
                            </p>

                            <button onClick={() => setIsOpen(false)}>Deactivate</button>
                            <button onClick={() => setIsOpen(false)}>Cancel</button>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    )
}





const stylemodal = {
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




// import axios from 'axios';
// import React, { useState } from 'react';
// import Modal from 'react-modal';
// import { useNavigate } from 'react-router-dom';

// Modal.setAppElement('#root');
// function Viewuser({ getUser }) {
//     const navLink = useNavigate();
//     const [showModal, setShowModal] = useState(false);
//     const [showModalinfo, setShowModalinfo] = useState(false);
//     const [nama, setnama] = useState('');
//     const [password, setpassword] = useState('');
//     const [nohp, setnohp] = useState('');
//     const [email, setemail] = useState('');
//     const [username, setusername] = useState('');
//     const [kd_lvl1, setkdlvl1] = useState(2);
//     const [kd_lvl2, setkdlvl2] = useState(1);
//     const [kd_kampung, setkdkampung] = useState(2);
//     const [kd_distrik, setkddistrik] = useState(1);
//     const [info, setinfo] = useState('');

//     function setBlank() {
//         setnama('');
//         setpassword('');
//         setnohp('');
//         setemail('');
//         setusername('');
//         setkdlvl1('');
//         setkdlvl2('');
//     }

//     const saveUser = async (e) => {
//         console.log('savee');
//         try {
//             const user = await axios.post('/user', {
//                 nama: nama,
//                 username: username,
//                 nohp: nohp,
//                 email: email,
//                 password: password,
//                 ulangpassword: password,
//                 kd_lvl1: kd_lvl1,
//                 kd_lvl2: kd_lvl2,
//                 kd_distrik: kd_distrik,
//                 kd_kampung: kd_kampung
//             });
//             setShowModal(false);
//             setShowModalinfo(true);

//             navLink('/home/config/ubahpassword');
//             getUser();
//             setBlank();

//             let timeout;
//             function myFunction() {
//                 timeout = setTimeout(alertFunc, 1000);
//             }
//             function alertFunc() {
//                 setShowModalinfo(false);
//             }
//             myFunction();

//             setinfo(user.data.response.info);

//         } catch (e) {
//             if (e.response) {
//                 setinfo(e.response.data.info);
//             }
//         }
//     }

//     return (
//         <>
//             <button className="h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
//                 onClick={() => { setShowModal(true) }}
//             >Tambah Pengguna</button>
//             <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)}
//                 style={stylemodal}

//             >
//                 <h1 className='text-center font-bold text-slate-800 mb-4'>Tambah Pengguna</h1>
//                 <hr />
//                 <div>{info}</div>
//                 <div className="space-y-2 mb-2">
//                     <form onSubmit={(e) => { e.preventDefault(); saveUser() }} className="space-y-2 mt-2" >
//                         <div className="grid grid-cols-5">
//                             <label htmlFor="nama" className='shadow-blue-600 shadow-sm rounded-sm'>Nama</label>
//                             <input type="text"
//                                 name="nama" id="nama"
//                                 className="outline-none  border-blue-600 ring-1  ring-blue-700 pl-2 ml-2 col-span-4 ... rounded-sm shadow-md active:ring-4 active:ring-blue-400"
//                                 placeholder="nama"
//                                 value={nama}
//                                 onChange={(e) => setnama(e.target.value)}
//                             />
//                         </div>
//                         <div className="grid grid-cols-5">
//                             <label htmlFor="username" className='shadow-blue-600 shadow-sm rounded-sm'>username</label>
//                             <input type="text"
//                                 name="username" id="username"
//                                 className="outline-none  border-blue-600 ring-1  ring-blue-700 pl-2 ml-2 col-span-4 ... rounded-sm shadow-md active:ring-4 active:ring-blue-400" placeholder="username"
//                                 value={username}
//                                 onChange={(e) => setusername(e.target.value)}
//                             />
//                         </div>
//                         <div className="grid grid-cols-5">
//                             <label htmlFor="password" className='shadow-blue-600 shadow-sm rounded-sm'>password</label>
//                             <input type="password"
//                                 name="password" id="password"
//                                 className="outline-none  border-blue-600 ring-1  ring-blue-700 pl-2 ml-2 col-span-4 ... rounded-sm shadow-md active:ring-4 active:ring-blue-400"
//                                 placeholder="password"
//                                 value={password}
//                                 onChange={(e) => setpassword(e.target.value)}
//                             />
//                         </div>
//                         <div className="grid grid-cols-5">
//                             <label htmlFor="nohp" className='shadow-blue-600 shadow-sm rounded-sm'>Nohp</label>
//                             <input type="text" name="nohp" id="nohp"
//                                 className="outline-none  border-blue-600 ring-1  ring-blue-700 pl-2 ml-2 col-span-4 ... rounded-sm shadow-md active:ring-4 active:ring-blue-400"
//                                 placeholder="no Handphone"
//                                 value={nohp}
//                                 onChange={(e) => setnohp(e.target.value)}
//                             />
//                         </div>
//                         <div className="grid grid-cols-5 mb-5">
//                             <label htmlFor="email" className='shadow-blue-600 shadow-sm rounded-sm'>Email</label>
//                             <input type="text" name="email" id="email"
//                                 className="outline-none  border-blue-600 ring-1  ring-blue-700 pl-2 ml-2 col-span-4 ... rounded-sm shadow-md active:ring-4 active:ring-blue-400"
//                                 placeholder="email"
//                                 value={email}
//                                 onChange={(e) => setemail(e.target.value)}
//                             />
//                         </div>
//                         <div className="grid grid-cols-6 gap-1 mt-5">
//                             <div className='...'></div>
//                             <span className="mt-3 text-center rounded-md bg-red-700 hover:bg-red-800 p-2 active:bg-red-700 col-span-2 ... shadow-md active:ring-2 active:ring-blue-400 hover:text-yellow-50"
//                                 onClick={(e) => { setShowModal(false) }}
//                             >BATAL
//                             </span>
//                             <button className="mt-3 rounded-md bg-blue-700 hover:bg-blue-800 p-2 active:bg-blue-700 col-span-2 ... shadow-md active:ring-2 active:ring-blue-400 hover:text-yellow-50"
//                             >SIMPAN
//                             </button>
//                             <div className='...'></div>
//                         </div>
//                     </form>
//                     <div>{nama} - {username}</div>
//                 </div>
//             </Modal>
//             <Modal isOpen={showModalinfo} style={stylemodalinfo} onRequestClose={() => setShowModalinfo(false)}>
//                 <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center top-0 right-0 bottom-0 left-0 fixed">
//                     <div className="bg-white px-16 py-14 rounded-md text-center">
//                         <h1 className="text-xl mb-4 font-bold text-slate-900">{info}</h1>
//                     </div>
//                 </div>
//             </Modal>

//         </>
//     )
// }

// export default Viewuser;




















// const stylemodal = {
//     overlay: {
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundColor: 'rgba(255, 255, 255, 0.35)'
//     },
//     content: {
//         position: 'absolute',
//         top: '20%',
//         left: '30%',
//         right: '30%',
//         bottom: '20%',
//         border: '1px solid #ccc',
//         background: '#fff',
//         overflow: 'hidden',
//         WebkitOverflowScrolling: 'touch',
//         borderRadius: '4px',
//         outline: 'none',
//         padding: '20px',
//         height: '320px'
//     }
// };


// const stylemodalinfo = {
//     overlay: {
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundColor: 'rgba(255, 255, 255, 0.35)',
//         border: '0px solid #ccc',
//     },
//     content: {
//         position: 'absolute',
//         top: '20%',
//         left: '30%',
//         right: '30%',
//         bottom: '40%',
//         border: '0px solid #ccc',
//         background: '#fff',
//         overflow: 'hidden',
//         WebkitOverflowScrolling: 'touch',
//         borderRadius: '40px',
//         outline: 'none',
//         padding: '20px',
//         height: '80px',
//         width: '520px',
//         backgroundColor: 'transparent'
//     }
// };