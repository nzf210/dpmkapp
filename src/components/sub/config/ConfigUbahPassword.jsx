import Passtableview from "./sub/Passtableview";
import Filterkampung from "../filter/Filterkampung";
import { Dialog, Transition, Combobox } from '@headlessui/react';
import { Fragment, useState, Component, useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { mkamdisSelector } from '../../../features/FilterSlice';
import CloseIcon from '@mui/icons-material/Close';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { useFormik } from "formik";
import * as Yup from "yup";


const ConfigUbahPassword = () => {

    const [user, setUser] = useState([]);
    //const [modaledit, setModalEdit] = useState(false);
    //const [modalhapus, setModalHapus] = useState(false);
    //const [modalstatus, setModalStatus] = useState(false);


    const getUser = async () => {
        const userdata = await axios.get('/user');
        setUser(userdata.data);
    }

    useEffect(() => {
        let e = true;
        if (e) { getUser(); e = false; }
        return () => { e = true }
    }, []
    );

    return (
        <div className="w-full">
            <div className="h-20"></div>
            <Filterkampung></Filterkampung>
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
                                        <MyModal user={user}></MyModal>
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
                                        {<DataTable user={user} />}
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-5">
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ConfigUbahPassword;


function MyModal({ user }) {
    let [isOpen, setIsOpen] = useState(false)
    function closeModal() { setIsOpen(false) }
    function openModal() { setIsOpen(true) }

    //const [nama, setNama] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [ulangpassword, setUlangpassword] = useState('');
    const [nohp, setNohp] = useState('');
    const [kd_lvl1, setKd_lvl1] = useState('');
    const [kd_lvl2, setKd_lvl2] = useState('');
    const [kd_kampung, setKd_kampung] = useState('');
    const [kd_distrik, setKd_distrik] = useState('');
    const [distrik_, setDistrik_] = useState('');
    const [kd_lvl1_key, setKd_lvl1_key] = useState('');
    const [kd_lvl2_key, setKd_lvl2_key] = useState('');

    const dispatch = useDispatch();

    const kam = useSelector(mkamdisSelector.selectAll);
    const dt = [{ id: 0, kampung: '', kd_kampung: 0, distrik: '', kd_distrik: 0 }];
    kam.map((d) => { return dt.push(d) });
    const kampung = dt;

    const formik = useFormik({
        initialValues: {
            nama: "",
            email: "",
            username: "",
            password: "",
            ulangpassword: "",
            nohp: "",
            kd_lvl1: "",
            kd_lvl2: "",
            kd_kampung: kampung[0]
        },
        validationSchema: Yup.object({
            nama: Yup.string()
                .min(2, "Nama Minimal 2 Karakter")
                .required("Nama Wajib di isi")
                .matches('...', 'isi dengan betul'),
            email: Yup.string()
                .email("Format Email Salah")
                .required("Email Wajib di isi"),
            password: Yup.string()
                .min(4, "Password Minimal 4 Karakter")
                .required("Password Wajib di isi"),
            ulangpassword: Yup.string()
                .oneOf([Yup.ref("password")], "Password dan Ulangpassword tidak Cocok")
                .required("Password Wajib di isi"),
            nohp: Yup.number()
                .min(8, "Minimal 8 Karakter")
                .required("No Hp Wajib di Isi")

        }),
        onSubmit: values => {
            setKd_kampung(kd_kampung);
            setKd_distrik(kd_distrik);
            // alert(JSON.stringify(values, null, 2));
            console.log(values);
            setIsOpen(false);

            clearinput();
            formik.resetForm({
                nama: "",
                email: "",
                username: "",
                password: "",
                ulangpassword: "",
                nohp: "",
                kd_lvl1: "",
                kd_lvl2: ""
            })
        },
    });


    const simpanPengguna = () => {
        // dispatch(tambahPengguna({ nama, username, password, email, nohp, kd_lvl1, kd_lvl2, kd_kampung, kd_distrik }))
        console.log(username, password, email, kd_lvl1, kd_lvl2, kd_kampung, kd_distrik, nohp)
        setIsOpen(false);
    }

    const [selected, setSelected] = useState(kampung[0]);
    const [query, setQuery] = useState('');
    const [closeicon, setCloseicon] = useState(false);
    const [dinas, setDinas] = useState(true);

    const filteredKampung =
        query === '' ? kampung : kampung.filter((dis) =>
            dis.kampung.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, '')));

    const clearinput = () => {
        setSelected(kampung[0]);
        setDistrik_('');
        setCloseicon(false);
    }

    useEffect(() => {
        setSelected(formik.values.kd_kampung);
        console.log('userrrr', user);
    }, [])

    const optionDinas = () => {
        setDinas(true);
    }


    return (
        <div>
            <div className="">
                <button
                    type="button"
                    onClick={openModal}
                    className=" font-semibold text-white rounded-md bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md p-2" >
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
                                {formik.errors.nama && formik.touched.nama && (<p>{formik.errors.nama}</p>)}
                                {formik.errors.username && formik.touched.username && (<p>{formik.errors.username}</p>)}
                                {formik.errors.password && formik.touched.password && (<p>{formik.errors.password}</p>)}
                                {formik.errors.ulangpassword && formik.touched.ulangpassword && (<p>{formik.errors.ulangpassword}</p>)}
                                {formik.errors.nohp && formik.touched.nohp && (<p>{formik.errors.nohp}</p>)}
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
                                                </div>
                                                <div className="relative z-0 mb-6 w-full group">
                                                    <input type="username" name="username" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                                                        value={formik.values.username}
                                                        onChange={formik.handleChange}
                                                    />
                                                    <label htmlFor="username" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">username</label>
                                                </div>
                                                <div className="relative z-0 mb-6 w-full group">
                                                    <input type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                                                        value={formik.values.password}
                                                        onChange={formik.handleChange}
                                                    />
                                                    <label htmlFor="password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                                                </div>
                                                <div className="relative z-0 mb-6 w-full group">
                                                    <input type="password" name="ulangpassword" id="ulangpassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                                                        value={formik.values.ulangpassword}
                                                        onChange={formik.handleChange}
                                                    />
                                                    <label htmlFor="ulangpassword" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ulang password</label>
                                                </div>
                                                <div className="relative z-0 mb-6 w-full group">
                                                    <input type="email" name="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                        value={formik.values.email}
                                                        onChange={formik.handleChange}
                                                    />
                                                    <label htmlFor="email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                                                </div>
                                                <div className="relative z-0 mb-6 w-full group">
                                                    <select name="kd_lvl1" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=""
                                                        value={formik.values.kd_lvl1}
                                                        onChange={(e) => {
                                                            formik.handleChange(e); console.log(e.target.value); if (e.target.value === '1') {
                                                                setDinas(false)
                                                            } else { setDinas(true) }
                                                        }}
                                                    >
                                                        <option value="0">...</option>
                                                        <option onClick={(e) => { setKd_lvl1_key(e.target.value); setDinas(false); }} value="1">Dinas DPMK</option>
                                                        <option onClick={(e) => { setKd_lvl1_key(e.target.value); setDinas(true); }} value="2">Kampung</option>
                                                    </select>
                                                    <label htmlFor="kd_lvl1" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Instansi</label>
                                                </div>
                                                <div className="relative z-0 mb-6 w-full group">
                                                    <select name="kd_lvl2" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " key={kd_lvl2_key}
                                                        value={formik.values.kd_lvl2}
                                                        onChange={(e) => { formik.handleChange(e); }}
                                                    >
                                                        <option >...</option>
                                                        <option onClick={(e) => { setKd_lvl2_key(e.target.value) }} value="1">Admin</option>
                                                        <option onClick={(e) => { setKd_lvl2_key(e.target.value) }} value="2">Operator</option>
                                                    </select>
                                                    <label htmlFor="kd_lvl2" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Level Pengguna</label>
                                                </div>
                                                {dinas ? <div>
                                                    <div className="relative z-0 mb-6 w-full group">
                                                        <Combobox value={selected} onChange={//formik.handleChange
                                                            (e) => {
                                                                setSelected(e); setKd_kampung(e.kd_kampung);
                                                                setKd_distrik(e.kd_distrik); setDistrik_(e.distrik); formik.setFieldValue('kd_kampung', e.kd_kampung); formik.setFieldValue('kd_distrik', e.kd_distrik);
                                                            }
                                                        } >
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
                                                                        <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                                                        >
                                                                            {filteredKampung.length === 0 && query !== '' ? (<div className="cursor-default select-none py-2 px-4 text-gray-700 w-full bg-red-200">Tidak di temukan.</div>)
                                                                                : (
                                                                                    filteredKampung.map((dis) => (
                                                                                        <div className="relative">
                                                                                            <div className="bg-white">
                                                                                                <Combobox.Option
                                                                                                    key={dis.id}
                                                                                                    className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'text-white bg-slate-600' : 'text-gray-900'}`}
                                                                                                    value={dis}
                                                                                                >
                                                                                                    {({ selected, active }) => (
                                                                                                        <>
                                                                                                            <div className='' >
                                                                                                                <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}
                                                                                                                    selected={(e) => { setKd_distrik(dis.distrik); }}
                                                                                                                > {dis.kampung}</span>
                                                                                                                {selected ? (
                                                                                                                    <span className={`bg-red-200 inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-slate-600'}`}
                                                                                                                    >
                                                                                                                        <span > {dis.distrik === '' ? null : <CheckIcon className={`absolute w-5 h-5 left-3 -mt-5 ${active ? '' : 'h-0'} `} aria-hidden="true" />} </span>
                                                                                                                    </span>
                                                                                                                ) : null}
                                                                                                            </div>
                                                                                                        </>
                                                                                                    )}
                                                                                                </Combobox.Option>
                                                                                            </div>
                                                                                        </div>
                                                                                    ))
                                                                                )}
                                                                        </Combobox.Options>
                                                                    </div>
                                                                </Transition>
                                                            </div>
                                                        </Combobox>
                                                    </div>

                                                    <div className="relative z-0 mb-6 w-full group">
                                                        <input type="email" name="floating_kd_distrik" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                            value={distrik_} onChange={(e) => { setKd_distrik(e.target.value) }} disabled
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
                                                    <input type="tel" name="nohp" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                                                        value={formik.values.nohp}
                                                        onChange={formik.handleChange}
                                                    />
                                                    <label htmlFor="nohp" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 w-full">No Handphone 081100000000</label>
                                                </div>
                                                <div className='space-x-1'>
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
                </Dialog>
            </Transition>
        </div>
    )
}

function DataTable({ user }) {
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
                        <div className="space-x-1 bg-red-100 mr-4">
                            <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                            <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                        </div>
                    </td>
                </tr>
            ))}
        </>
    )
}