
const Welcome = () => {
    return (
        <div>
            <div className="container w-80 mx-auto h-96 sm:w-[720px] md:w-[920px] sm:h-[500px]    
                      rounded-xl shadow-2xl mt-10 sm:mt-24" id="child-utama">
                <img src="yhk.png" alt="Yahukimo" className="w-72 mx-auto pt-12 sm:hidden" />
                <img src="yhk.png" alt="Yahukimo" className="w-96 mx-auto pt-12 hidden sm:block" />
                <p className="justify-evenly text-center pt-4"> Selamat Datang - Aplikasi Pengeloaan Keuangan Kampung Kabupaten Yahukimo</p>
            </div>
        </div>
    )
}

export default Welcome