import { useState } from "react";
import axios from "axios";
import { } from "react-router-dom";

const Tambahpass = () => {

    return (
        <>
        </>
    )
}

export default Tambahpass;



export function Modal() {
    const [showModal, setShowModal] = useState(false);

    const [nama, setnama] = useState('');
    const [password, setpassword] = useState('');
    const [nohp, setnohp] = useState('');
    const [email, setemail] = useState('');
    const [username, setusername] = useState('');
    const [kd_lvl1, setkdlvl1] = useState(2);
    const [kd_lvl2, setkdlvl2] = useState(1);
    const [kd_kampung, setkdkampung] = useState(2);
    const [kd_distrik, setkddistrik] = useState(4);


    const saveuser = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3002/user',
                {
                    nama: nama,
                    username: username,
                    nohp: nohp,
                    email: email,
                    password: password + "a",
                    ulangpassword: password,
                    kd_lvl1: kd_lvl1,
                    kd_lvl2: kd_lvl2,
                    kd_distrik: kd_distrik,
                    kd_kampung: kd_kampung
                }
            )
        }
        catch (e) {
            console.log('Save User error');
            if (e.response) {
                console.log(e.response.data);
            }
        }

    }

    return (
        <>
            <button
                className="bg-indigo-500 shadow-lg shadow-indigo-500/50 ... p-2 rounded-sm hover:bg-indigo-400 ml-6"
                type="button"
                onClick={() => setShowModal(true)}>
                Tambah User
            </button>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-sm">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">Tambah User</h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}>
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">❌</span>
                                    </button>
                                </div>
                                {/*body*/}
                                <form onSubmit={(e) => { e.preventDefault(); saveuser(); }}>
                                    <div className="relative p-6 flex-auto">
                                        <div className="">
                                            <div className="">
                                                <label htmlFor="nama">Nama</label>
                                                <input type="text"
                                                    name="nama" id="nama"
                                                    className="outline-none border-2 border-slate-600 ring-1ring-slate-700 pl-2 ml-2"
                                                    placeholder="nama"
                                                    value={nama}
                                                    onChange={(e) => { setnama(e.target.value); }}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="username">username</label>
                                                <input type="text"
                                                    name="username" id="username"
                                                    className="outline-none border-2 border-slate-600 ring-1 ring-slate-700 pl-2 ml-2"
                                                    placeholder="username"
                                                    value={username}
                                                    onChange={(e) => setusername(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="password">password</label>
                                                <input type="password"
                                                    name="password" id="password"
                                                    className="outline-none border-2 border-slate-600 ring-1 ring-slate-700 pl-2 ml-2"
                                                    placeholder="password"
                                                    value={password}
                                                    onChange={(e) => setpassword(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="nohp">Nohp</label>
                                                <input type="text" name="nohp" id="nohp"
                                                    className="outline-none border-2 border-slate-600 ring-1 ring-slate-700 pl-2 ml-2"
                                                    placeholder="no Handphone"
                                                    value={nohp}
                                                    onChange={(e) => setnohp(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="email">Email</label>
                                                <input type="text" name="email" id="email"
                                                    className="outline-none border-2 border-slate-600 ring-1 ring-slate-700 pl-2 ml-2"
                                                    placeholder="email"
                                                    value={email}
                                                    onChange={(e) => setemail(e.target.value)}
                                                />
                                            </div>
                                            <div className="hidden">
                                                <input type="text" id="kdlvl1"
                                                    className="outline-none border-2 border-slate-600 ring-1ring-slate-700 pl-2 ml-2"
                                                    placeholder="email"
                                                    value={kd_lvl1}
                                                    onChange={(e) => setemail(e.target.value)}
                                                />
                                            </div>
                                            <div className="hidden">
                                                <input type="text" id="kdlvl2"
                                                    className="outline-none border-2 border-slate-600 ring-1ring-slate-700 pl-2 ml-2"
                                                    placeholder="email"
                                                    value={kd_lvl2}
                                                    onChange={(e) => setemail(e.target.value)}
                                                />
                                            </div>
                                            <div className="hidden">
                                                <input type="text" id="kddistrik"
                                                    className="outline-none border-2 border-slate-600 ring-1ring-slate-700 pl-2 ml-2"
                                                    placeholder="email"
                                                    value={kd_distrik}
                                                    onChange={(e) => setemail(e.target.value)}
                                                />
                                            </div>
                                            <div className="hidden">
                                                <input type="text" id="kdkampung"
                                                    className="outline-none border-2 border-slate-600 ring-1ring-slate-700 pl-2 ml-2"
                                                    placeholder="email"
                                                    value={kd_kampung}
                                                    onChange={(e) => setemail(e.target.value)}
                                                />
                                            </div>
                                            {/* <div>{nama} - {username}</div> */}
                                        </div>
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                        <button
                                            className="hover:shadow-xl text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => {
                                                setShowModal(false);
                                            }}>
                                            Batal
                                        </button>
                                        <button
                                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowModal(false)}>
                                            Simpan
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}
