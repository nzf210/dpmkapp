import axios from "axios";
import { useFormik } from "formik";
import React, { Fragment, useEffect, useState, lazy, Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
//import MyModalInfo from './MyModalInfo'
const MyModalInfo = lazy(() => import("./MyModalInfo"));


export default function MyModalEdit({ editData, setIdEdit_ }) {

    const navLink = useNavigate();
    let [isOpen, setIsOpen] = useState(false)
    function closeModal() { setIsOpen(false) }
    function openModal() { setIsOpen(true) }

    const formik = useFormik({
        initialValues: {
            nama_: '',
            email_: '',
            username_: '',
            password_: '',
            ulangpassword_: '',
            nohp_: ''
        },
        onSubmit: v => {
            console.log(v)
            updateUser(v);
            formik.resetForm({
                nama_: "",
                email_: "",
                username_: "",
                password_: "",
                ulangpassword_: "",
                nohp_: "",
            })

        },
    });

    const { id } = useParams();
    const [nama, setNama] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [ulangpassword, setUlangpassword] = useState('');
    const [nohp, setNohp] = useState('');
    const [email, setEmail] = useState('');
    const [confpass, setConfpass] = useState(false);

    useEffect(() => {
        let e = true;
        const getUserOne = async () => {
            if (e) {
                const user = await axios.get(`/user/${id}`);
                setNama(user.data.nama);
                setUsername(user.data.username);
                setPassword(user.data.password);
                setUlangpassword(user.data.password);
                setNohp(user.data.nohp);
                setEmail(user.data.email);
            }
        }
        getUserOne();
        return () => { e = false; }
    }, [editData]);

    const [datahasil, setDatahasil] = useState('');

    useEffect(() => {
        setIdEdit_(id);
    }, [datahasil]);

    const updateUser = async () => {
        try {
            if (password === ulangpassword) {
                const hasil = await axios.patch(`/user/${id}`,
                    {
                        nama: nama,
                        username: username,
                        nohp: nohp,
                        email: email,
                        password: password,
                        ulangpassword: ulangpassword
                    }
                )
                setDatahasil(hasil.data.info);
                setIsOpen(false);
            } else { setConfpass(true) }
        }
        catch (e) {
            setDatahasil(e.message)
            if (e.response) {
                console.log(e.response.info)
            }
        }
    }

    return (
        <>
            <div key="modaledit">
                <div>
                    <button
                        type="button"
                        onClick={() => { openModal(); editData(); }}
                        className=" font-medium text-blue-600 dark:text-blue-500 hover:underline" >
                        Ubah
                    </button>
                    <Suspense fallback={<p>Data Sedang di muat ... </p>}> <MyModalInfo datahasil={datahasil} /> </Suspense>
                </div>
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal} >
                        <div className="min-h-screen px-4 text-center">
                            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                                <Dialog.Overlay className="fixed inset-0" />
                            </Transition.Child>
                            {/* This element is to trick the browser into centering the modal contents. */}
                            <span className="inline-block h-screen align-middle" aria-hidden="true" >                            &#8203;                        </span>
                            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 mb-2">
                                        Ubah Data Pengguna
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <div className='border border-slate-100 rounded-md  mx-auto'>
                                            <div className='p-4'>
                                                <form onSubmit={formik.handleSubmit}>
                                                    <div className="relative z-0 mb-6 w-full group">
                                                        <input type="text" name="nama_" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                            value={nama}
                                                            onChange={(e) => { setNama(e.target.value); formik.values.nama_ = e.target.value }}
                                                        />
                                                        <label htmlFor="nama_" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                                        >Nama Lengkap</label>
                                                        <span> {formik.errors.nama_ && formik.touched.nama_ && (<p className="text-red-400 font-thin">{formik.errors.nama_}</p>)}</span>
                                                    </div>
                                                    <div className="relative z-0 mb-6 w-full group">
                                                        <input type="text" name="username_" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                            value={username}
                                                            onChange={(e) => { setUsername(e.target.value); formik.handleChange(e.target.value); formik.values.username_ = e.target.value }}
                                                        />
                                                        <label htmlFor="username_" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">username</label>
                                                        <span>{formik.errors.username_ && formik.touched.username_ && (<p className="text-red-400 font-thin">{formik.errors.username_}</p>)}</span>
                                                    </div>
                                                    <div className="relative z-0 mb-6 w-full group">
                                                        <input type="password" name="password_" id="password_" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                            value={password}
                                                            onChange={(e) => { setPassword(e.target.value); formik.handleChange(e.target.value); formik.values.password_ = e.target.value }}
                                                        />
                                                        <label htmlFor="password_" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                                                        <span>{formik.errors.password_ && formik.touched.password_ && (<p className="text-red-400 font-thin">{formik.errors.password_}</p>)}</span>
                                                        <span> {confpass ? (<p className="text-red-400 font-thin">Password dan Ulangpassword tidak Cocok</p>) : null}</span>
                                                    </div>
                                                    <div className="relative z-0 mb-6 w-full group">
                                                        <input type="password" name="ulangpassword_" id="ulangpassword_" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                            value={ulangpassword}
                                                            onChange={(e) => { setUlangpassword(e.target.value); formik.handleChange(e.target.value); formik.values.ulangpassword_ = e.target.value }}
                                                        />
                                                        <label htmlFor="ulangpassword_" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ulang password</label>
                                                        <span> {formik.errors.ulangpassword_ && formik.touched.ulangpassword_ && (<p className="text-red-400 font-thin">{formik.errors.ulangpassword_}</p>)}</span>
                                                        <span> {confpass ? (<p className="text-red-400 font-thin">Password dan Ulangpassword tidak Cocok</p>) : null}</span>
                                                    </div>
                                                    <div className="relative z-0 mb-6 w-full group">
                                                        <input type="email" name="email_" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                            value={email}
                                                            onChange={(e) => { setEmail(e.target.value); formik.handleChange(e.target.value); formik.values.email_ = e.target.value }}
                                                        />
                                                        <label htmlFor="email_" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                                                        <span> {formik.errors.email_ && formik.touched.email_ && (<p className="text-red-400 font-thin">{formik.errors.email_}</p>)}</span>
                                                    </div>
                                                    <div className="relative z-0 mb-6 w-full group">
                                                        <input type="text" name="nohp_" id="nohp_" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                            value={nohp}
                                                            onChange={(e) => { setNohp(e.target.value); formik.handleChange(e.target.value); formik.values.nohp_ = e.target.value }}
                                                        />
                                                        <label htmlFor="nohp_" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 w-full">No Handphone 081100000000</label>
                                                        <span>{formik.errors.nohp_ && formik.touched.nohp_ && (<p className="text-red-400 font-thin">{formik.errors.nohp_}</p>)}</span>
                                                    </div>
                                                    <div className='space-x-2'>
                                                        <button onClick={() => { setIsOpen(false); navLink('/home/config/ubahpassword/') }} type="button" className="text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Cancel</button>
                                                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Simpan</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog >
                </Transition >
            </div >
        </>
    )
}
