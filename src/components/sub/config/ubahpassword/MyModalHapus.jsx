
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function MyModalHapus({ idhapus, setgetInfoEdit, trigerHapusUser, hpsUser }) {
    const navLink = useNavigate();
    let [isOpen, setIsOpen] = useState(false)
    function closeModal() { setIsOpen(false) }
    function openModal() { setIsOpen(true) }

    const hapusUser_ = () => { hpsUser() }

    const hapusUser = () => {
        trigerHapusUser();
    }

    return (
        <div key="modalhapus">
            <div >
                <button
                    type="button"
                    onClick={() => { openModal(); hapusUser() }}
                    className=" font-medium text-red-600 dark:text-red-500 hover:underline" >
                    Hapus
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
                                    Hapus Pengguna
                                </Dialog.Title>
                                <div className="mt-2">
                                    <div className='border border-slate-100 rounded-md  mx-auto'>
                                        <div className='p-4'>
                                            <div className="pb-5">
                                                <p className="text-red-400">
                                                    Anda Yakin Menghapus Pengguna ini ... ?
                                                </p>
                                            </div>
                                            <div className='space-x-2'>
                                                <button onClick={() => { setIsOpen(false); navLink('/home/config/ubahpassword/') }} type="button" className="text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Cancel</button>
                                                <button type="button" onClick={hapusUser_} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Hapus</button>
                                            </div>
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