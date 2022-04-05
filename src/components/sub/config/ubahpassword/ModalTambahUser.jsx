import React, { Fragment, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { mkamdisSelector } from '../../../../features/FilterSlice';
import * as Yup from "yup";
import { Transition, Combobox, Dialog } from '@headlessui/react';
import CloseIcon from '@mui/icons-material/Close';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import axios from "axios";






export default function MyModal({ setgetUserInfo, setInfoHasil }) {

    const { nama, kd_kampung, kd_distrik, kd_lvl1, kd_lvl2, userId } = useSelector(state => state.userLogin);

    // const [kd_kampung_, setKdDistrik_] = useState('0');
    // const [kd_distrik_, setKdKampung_] = useState('0');
    // const [kd_lvl1_, setKdlvl1_] = useState('');

    // useEffect(() => {
    //     if (kd_lvl1 === 2) {
    //         setKdDistrik_(kd_distrik);
    //         setKdKampung_(kd_kampung);
    //         setKdlvl1_(kd_lvl1);
    //     }
    //     return () => {

    //     };
    // }, []);


    const kam = useSelector(mkamdisSelector.selectAll);
    const dt = [{ id: 0, kampung: '', kd_kampung: 0, distrik: '', kd_distrik: 0 }];
    kam.map((d) => { return dt.push(d) });

    const kampung = dt;
    let [isOpen, setIsOpen] = useState(false)
    function closeModal() { setIsOpen(false) }
    function openModal() { setIsOpen(true) }

    const [selected, setSelected] = useState(kampung[0]);
    const [query, setQuery] = useState('');
    const [closeicon, setCloseicon] = useState(false);
    const [dinas, setDinas] = useState(false);
    const [erdinas, setErdinas] = useState(false);
    const [btnenable, setBtnEnable] = useState(true);

    const [distrik_, setDistrik_] = useState('');
    const [kd_lvl2_key, setKd_lvl2_key] = useState('');

    useEffect(() => {
        if (kd_lvl2 !== 2) {
            setBtnEnable(false);
        }
    }, [])


    let formik = null;

    if (kd_lvl1 === 2) {
        formik = useFormik({
            initialValues: {
                nama: "",
                email: "",
                username: "",
                password: "",
                ulangpassword: "",
                nohp: "",
                kd_lvl1: kd_lvl1,
                kd_lvl2: "",
                kd_kampung: kd_kampung,
                kd_distrik: kd_distrik
            },
            validationSchema:
                Yup.object({
                    nama: Yup.string()
                        .min(2, "Nama Minimal 2 Karakter")
                        .required("Nama Wajib di isi"),
                    username: Yup.string()
                        .min(2, "Nama Minimal 2 Karakter")
                        .required("Username Wajib di isi"),
                    email: Yup.string()
                        .email("Format Email Salah")
                        .required("Email Wajib di isi"),
                    password: Yup.string()
                        .min(1, "Password Minimal 4 Karakter")
                        .required("Password Wajib di isi"),
                    ulangpassword: Yup.string()
                        .oneOf([Yup.ref("password")], "Password dan Ulangpassword tidak Cocok")
                        .required("Wajib di isi, sama dengan password "),
                    nohp: Yup.number()
                        .min(8, "Minimal 8 Karakter")
                        .required("No Hp Wajib di Isi"),
                    kd_lvl2: Yup.string()
                        .matches(/[1-4]/, 'Pilih Level Pengguna')
                        .required('Pilih Level Pengguna')
                }),
            onSubmit: values => {
                simpanPengguna(values);
                console.log('lvl 2', values);
                formik.resetForm({
                    nama: "",
                    email: "",
                    username: "",
                    password: "",
                    ulangpassword: "",
                    nohp: "",
                    kd_lvl2: null
                })

            },
        });

    } else {
        formik = useFormik({
            initialValues: {
                nama: "",
                email: "",
                username: "",
                password: "",
                ulangpassword: "",
                nohp: "",
                kd_lvl1: "",
                kd_lvl2: "",
                kd_kampung: null,
                kd_distrik: null
            },
            validationSchema:
                Yup.object({
                    nama: Yup.string()
                        .min(2, "Nama Minimal 2 Karakter")
                        .required("Nama Wajib di isi"),
                    username: Yup.string()
                        .min(2, "Nama Minimal 2 Karakter")
                        .required("Username Wajib di isi"),
                    email: Yup.string()
                        .email("Format Email Salah")
                        .required("Email Wajib di isi"),
                    password: Yup.string()
                        .min(1, "Password Minimal 4 Karakter")
                        .required("Password Wajib di isi"),
                    ulangpassword: Yup.string()
                        .oneOf([Yup.ref("password")], "Password dan Ulangpassword tidak Cocok")
                        .required("Wajib di isi, sama dengan password "),
                    nohp: Yup.number()
                        .min(8, "Minimal 8 Karakter")
                        .required("No Hp Wajib di Isi"),
                    kd_lvl1: Yup.string()
                        .matches(/[1-4]/, 'Pilih Level Instansi')
                        .required('Pilih Level Instansi'),
                    kd_lvl2: Yup.string()
                        .matches(/[1-4]/, 'Pilih Level Pengguna')
                        .required('Pilih Level Pengguna')

                }),
            onSubmit: values => {
                if ((values.kd_kampung === 0 || values.kd_kampung === '') && values.kd_lvl1 === '2') {
                    setErdinas(true); return;
                } else {
                    simpanPengguna(values);
                    setErdinas(false);
                    formik.resetForm({
                        nama: "",
                        email: "",
                        username: "",
                        password: "",
                        ulangpassword: "",
                        nohp: "",
                        kd_lvl1: null,
                        kd_lvl2: null,
                        kd_kampung: 0,
                        kd_distrik: 0
                    })
                }
            },
        });
    }

    const simpanPengguna = (e) => {
        saveuser(e);
    }

    const filteredKampung =
        query === '' ? kampung : kampung.filter((dis) =>
            dis.kampung.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, '')));

    const clearinput = () => {
        setDistrik_('');
        setSelected(kampung[0]);
        setCloseicon(false);
    }

    const saveuser = async (d) => {
        try {
            const hasil = await axios.post('/user',
                {
                    nama: d.nama,
                    username: d.username,
                    nohp: d.nohp,
                    email: d.email,
                    password: d.password,
                    ulangpassword: d.password,
                    kd_lvl1: d.kd_lvl1,
                    kd_lvl2: d.kd_lvl2,
                    kd_distrik: d.kd_distrik,
                    kd_kampung: d.kd_kampung
                }
            )
            setIsOpen(false);
            clearinput();
            setgetUserInfo(hasil.data.info);
            setInfoHasil(true);
            function na() { setInfoHasil(false); }
            setTimeout(() => na(), 2000);
        }
        catch (e) {
            if (e.response) {
                console.log('xx', e.response.data.info);
                setgetUserInfo(`err: ${e.response.data.info}`)
                setIsOpen(true);
                setInfoHasil(true);
            }
        }

    }

    return (
        <div key="modalq">
            <div >
                <button
                    type="button"
                    onClick={openModal}
                    className="font-semibold text-white rounded-md bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md p-2"
                    disabled={btnenable}
                >
                    Tambah Pengguna
                </button>
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
                                    Tambah Pengguna Baru
                                </Dialog.Title>
                                <div className="mt-2">
                                    <div className='border border-slate-100 rounded-md  mx-auto'>
                                        <div className='p-4'>
                                            <form onSubmit={formik.handleSubmit}>
                                                <div className="relative z-0 mb-6 w-full group">
                                                    <input type="text" name="nama" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                        value={formik.values.nama}
                                                        onChange={formik.handleChange}
                                                    />
                                                    <label htmlFor="floating_nama" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                                    >Nama Lengkap</label>
                                                    <span> {formik.errors.nama && formik.touched.nama && (<p className="text-red-400 font-thin">{formik.errors.nama}</p>)}</span>
                                                </div>
                                                <div className="relative z-0 mb-6 w-full group">
                                                    <input type="username" name="username" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                        value={formik.values.username}
                                                        onChange={formik.handleChange}
                                                    />
                                                    <label htmlFor="username" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">username</label>
                                                    <span>{formik.errors.username && formik.touched.username && (<p className="text-red-400 font-thin">{formik.errors.username}</p>)}</span>
                                                </div>
                                                <div className="relative z-0 mb-6 w-full group">
                                                    <input type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                        value={formik.values.password}
                                                        onChange={formik.handleChange}
                                                    />
                                                    <label htmlFor="password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                                                    <span>{formik.errors.password && formik.touched.password && (<p className="text-red-400 font-thin">{formik.errors.password}</p>)}</span>
                                                </div>
                                                <div className="relative z-0 mb-6 w-full group">
                                                    <input type="password" name="ulangpassword" id="ulangpassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                        value={formik.values.ulangpassword}
                                                        onChange={formik.handleChange}
                                                    />
                                                    <label htmlFor="ulangpassword" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ulang password</label>
                                                    <span> {formik.errors.ulangpassword && formik.touched.ulangpassword && (<p className="text-red-400 font-thin">{formik.errors.ulangpassword}</p>)}</span>
                                                </div>
                                                <div className="relative z-0 mb-6 w-full group">
                                                    <input type="email" name="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                        value={formik.values.email}
                                                        onChange={formik.handleChange}
                                                    />
                                                    <label htmlFor="email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                                                    <span> {formik.errors.email && formik.touched.email && (<p className="text-red-400 font-thin">{formik.errors.email}</p>)}</span>
                                                </div>
                                                {kd_lvl1 !== 2 ? <div className="relative z-0 mb-6 w-full group">
                                                    <select name="kd_lvl1" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=""
                                                        value={formik.values.kd_lvl1}
                                                        onChange={(e) => {
                                                            formik.handleChange(e); if (e.target.value === '1') {
                                                                setDinas(false)
                                                            } else { setDinas(true) };
                                                        }}
                                                    >
                                                        <option onClick={(e) => { }} value={0} >...</option>
                                                        <option onClick={(e) => { setDinas(false); }} value={1}>Dinas DPMK</option>
                                                        <option onClick={(e) => { setDinas(true); }} value={2}>Kampung</option>
                                                    </select>
                                                    <label htmlFor="kd_lvl1" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Instansi</label>
                                                    <span>{formik.errors.kd_lvl1 && formik.touched.kd_lvl1 && (<p className="text-red-300 font-thin">{formik.errors.kd_lvl1}</p>)}</span>
                                                </div> : null}
                                                <div className="relative z-0 mb-6 w-full group">
                                                    <select name="kd_lvl2" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " key={kd_lvl2_key}
                                                        value={formik.values.kd_lvl2}
                                                        onChange={(e) => { formik.handleChange(e); }}
                                                    >
                                                        <option onClick={(e) => { setKd_lvl2_key(e.target.value); }} value={0} >...</option>
                                                        <option onClick={(e) => { setKd_lvl2_key(e.target.value) }} value={1}>Admin</option>
                                                        <option onClick={(e) => { setKd_lvl2_key(e.target.value) }} value={2}>Operator</option>
                                                    </select>
                                                    <label htmlFor="kd_lvl2" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Level Pengguna</label>
                                                    <span>{formik.errors.kd_lvl2 && formik.touched.kd_lvl2 && (<p className="text-red-300 font-thin">{formik.errors.kd_lvl2}</p>)}</span>
                                                </div>
                                                {/* //Combo================================================================================================================================ */}
                                                {dinas ? <div>
                                                    <div className="relative z-20 mb-6 w-full group">
                                                        <Combobox value={selected} onChange={(e) => {
                                                            setSelected(e); setDistrik_(e.distrik);
                                                            formik.values.kd_distrik = e.kd_distrik;
                                                            formik.values.kd_kampung = e.kd_kampung;
                                                        }} >
                                                            <div className="mt-1">
                                                                <div className="flex flex-row w-full text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-teal-300 focus-visible:ring-offset-2 sm:text-sm overflow-hidden">
                                                                    <Combobox.Input placeholder='Nama Kampung ... '
                                                                        className="w-full border-none focus:ring-2 py-2 pl-2 pr-1 text-sm leading-5 text-gray-900 active:ring-0 focus:border-none focus:outline-none focus:ring-cyan-600"
                                                                        displayValue={(kampung) => kampung.kampung}
                                                                        onChange={(e) => { setQuery(e.target.value); setCloseicon(true); }}
                                                                    />
                                                                    <div className='mt-[5.2px] cursor-pointer' onClick={clearinput} > {closeicon ? <CloseIcon /> : null}  </div>
                                                                    <Combobox.Button className="inset-y-0 right-0 flex items-center">
                                                                        <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                                                    </Combobox.Button>
                                                                </div>
                                                                <Transition
                                                                    as={Fragment}
                                                                    leave="transition ease-in duration-100"
                                                                    leaveFrom="opacity-100"
                                                                    leaveTo="opacity-0"
                                                                    afterLeave={() => setQuery('')}
                                                                >
                                                                    <div className='absolute w-full'>
                                                                        <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                                            {filteredKampung.length === 0 && query !== '' ? (<div className="cursor-default select-none py-2 px-4 text-gray-700">Tidak di temukan.</div>)
                                                                                : (
                                                                                    filteredKampung.map((dis) => (
                                                                                        <Combobox.Option
                                                                                            key={dis.id}
                                                                                            className={({ active }) => `cursor-default select-none py-2 pl-10 pr-4 ${active ? 'text-white bg-slate-600' : 'text-gray-900'}`}
                                                                                            value={dis}
                                                                                        >
                                                                                            {({ selected, active }) => (
                                                                                                <>
                                                                                                    <div className='' >
                                                                                                        <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}
                                                                                                        > {dis.kampung}</span>
                                                                                                        {selected ? (
                                                                                                            <span className={`inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-slate-600'}`} >
                                                                                                                <span className='bg-red-200'> {dis.distrik === '' ? null : <CheckIcon className={`absolute w-5 h-5 left-3 -mt-5 ${active ? '' : 'h-0'} `} aria-hidden="true" />} </span>
                                                                                                            </span>
                                                                                                        ) : null}
                                                                                                    </div>
                                                                                                </>
                                                                                            )}
                                                                                        </Combobox.Option>
                                                                                    ))
                                                                                )}
                                                                        </Combobox.Options>
                                                                    </div>
                                                                </Transition>
                                                            </div>
                                                        </Combobox>
                                                        {erdinas ? <p className="text-red-400 font-thin">Pilih Kampung</p> : null}
                                                    </div>

                                                    <div className="relative z-0 mb-6 w-full group">
                                                        <input type="email" name="floating_kd_distrik" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                            value={distrik_} disabled
                                                        />
                                                        <div className='w-full space-y-1'>
                                                            <div className='w-full translate-x-0'>
                                                                <div className='relative w-full'>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <label htmlFor="floating_kd_distrik" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nama Distrik</label>
                                                    </div>
                                                </div> : null}

                                                <div className="relative z-0 mb-6 w-full group">
                                                    <input type="text" name="nohp" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                        value={formik.values.nohp}
                                                        onChange={formik.handleChange}
                                                    />
                                                    <label htmlFor="nohp" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 w-full">No Handphone 081100000000</label>
                                                    <span>{formik.errors.nohp && formik.touched.nohp && (<p className="text-red-400 font-thin">{formik.errors.nohp}</p>)}</span>
                                                </div>
                                                <div className='space-x-2'>
                                                    <button onClick={() => setIsOpen(false)} type="button" className="text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Cancel</button>
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
    )
}