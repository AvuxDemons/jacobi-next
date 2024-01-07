import Link from "next/link";

const Jumbotron = () => {
    return (
        <div className="w-full h-screen bg-gradient-to-b from-superDark-100 to-black">
            <div className="p-6 flex flex-col gap-2 md:gap-4 justify-center items-center h-full max-w-screen-lg mx-auto">
                <p className="text-xs md:text-md text-superDark- font-bold tracking-widest mt-[-30%] md:mt-[-15%] uppercase">
                    KOMPUTASI NUMERIK
                </p>
                <p className="text-4xl md:text-7xl font-bold tracking-wider md:tracking-widest uppercase">
                    JACOBI SOLVER
                </p>
                <p className="text-[10px] md:text-sm text-superDark-800 text-center font-medium uppercase max-w-2xl tracking-wide">
                    PLATFORM YANG MENGGUNAKAN METODE ITERATIF JACOBI UNTUK MEMUDAHKAN PENYELESAIAN SISTEM PERSAMAAN LINEAR. PENGGUNA DAPAT MASUKKAN DATA DAN PLATFORM MENGHITUNG SOLUSI DENGAN CEPAT, YANG BERGUNA UNTUK KOMPUTASI NUMERIK TANPA KOMPLEKSITAS.
                </p>
                <Link
                    href={"https://github.com/AvuxDemons"}
                    target="_blank"
                >
                    <p className="text-xs md:text-lg text-superDark-700 font-bold tracking-widest uppercase hover:text-white">
                        Davin Tistama B.S - 06.2022.1.07536
                    </p>
                </Link>
            </div>
        </div>
    );
};

export default Jumbotron