import Header from "./Header";

const Login = () => {



    return (
        <div>
            <div className="fixed w-full">
                <Header />
                <div className="container pb-8 mx-auto">
                    <div className="container max-w-full h-[100px] sm:h-64">
                        <div className="container w-4" />
                    </div>
                    <div className="container w-[90%] rounded-lg shadow-[0_25px_35px_rgba(1,1,1,0.45)] mx-auto sm:w-[750px] md:w-[882px] lg:w-[950px] sm:h-90">
                        <h2 className="text-black text-center font-bold sm:text-left sm:ml-8 pt-2">Login DPMK</h2>
                        <hr className="border-2 border-slate-600 w-[95%] mx-auto mt-1" />
                        <div className="sm:grid sm:grid-cols-2">
                            <div className="container flex flex-col sm:my-10">
                                <div className="sm:items-start">
                                    <img src="image.ico" alt="yahukimo.kab" className="w-32 mt-1 mx-auto" />
                                    <p className="justify-center text-center mx-auto w-[80%] sm:w-72">Sistem Informasi Keuangan
                                        Kampung
                                        Pemerintah
                                        Kabupaten
                                        Yahukimo Provinsi
                                        Papua</p>
                                </div>
                            </div>
                            <div className="pb-3 sm:border-l-2 sm:border-slate-900 sm:my-10">
                                <h3 className="text-center sm:text-left sm:pl-8 font-semibold mt-1">Silahkan Masuk</h3>
                                <form className="flex flex-col items-center sm:items-start sm:pl-8 sm:-pr-14 sm:mt-2">
                                    <div className="flex sm:w-full">
                                        <input type="text" placeholder="username" className="sm:w-[80%] min-w-min outline-none border-2 border-blue-700 rounded-md sm:rounded-sm mb-2 focus:shadow-2xl placeholder:text-center sm:placeholder:text-left sm:pl-3 focus:border-blue-700 mt-1" />
                                        <img src="icons/user.png" className="h-7 w-7 mt-1 hidden sm:block ml-4" alt="" />
                                    </div>
                                    <div className="flex sm:w-full">
                                        <input type="text" placeholder="password" className="sm:w-[80%] min-w-min outline-none border-2 border-blue-700 rounded-md sm:rounded-sm mb-2 focus:shadow-2xl placeholder:text-center sm:placeholder:text-left sm:pl-3 focus:border-blue-700" />
                                        <img src="icons/login.png" className="h-7 w-7  hidden sm:block ml-4" alt="" />
                                    </div>
                                    <div className="flex sm:w-full">
                                        <select type="text" placeholder="tahun" className="sm:w-[80%] min-w-min block border-2 border-blue-700 rounded-none mb-2 focus:shadow-2xl placeholder:text-center sm:placeholder:text-left sm:pl-3 focus:border-blue-700 outline-none">
                                            <option className="rounded-none">Pilih Tahun</option>
                                            <option className="rounded-none">2022</option>
                                        </select>
                                        <img src="icons/calendar.png" className="h-7 w-7  hidden sm:block ml-4" alt="" />
                                    </div>
                                    <button id="btn-login" className="w-[50%] sm:w-[60%] min-w-min bg-blue-700 hover:bg-blue-800 active:bg-blue-900 rounded-md sm:rounded-sm sm:h-10 sm:mt-4"
                                        onClick={(btn) => {
                                            btn.preventDefault();
                                            //document.getElementsByTagName('form')[0].preventDefault();
                                            window.location = window.location + "home";
                                        }}
                                    >LOGIN</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;