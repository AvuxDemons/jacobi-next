import Image from "next/image"

const Navbar = () => {
    return (
        <nav className="bg-superDark-200 shadow">
            <div className="max-w-screen-2xl flex flex-wrap items-center justify-center md:justify-between mx-20 p-4">
                <Image
                    src="/assets/images/itats.png"
                    width={140}
                    height={100}
                    className="h-10"
                    alt="Logo ITATS"
                />
                <Image
                    src="/assets/images/informatika.png"
                    width={180}
                    height={100}
                    className="h-8  hidden md:block"
                    alt="Logo Informatika"
                />
            </div>
        </nav>
    )
}

export default Navbar