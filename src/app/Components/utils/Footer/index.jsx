import Link from "next/link"

import * as fa from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="mx-auto max-w-[1300px] py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
            <div className="flex justify-center space-x-6 md:order-2">
                <Link href={"https://github.com/AvuxDemons"} className="text-superDark-600 hover:text-white" target="_blank">
                    <fa.FaGithub className="h-6 w-6" />
                </Link>
            </div>
            <div className="mt-8 md:order-1 md:mt-0">
                <p className="text-xs text-center text-superDark-600">
                    Made With ❤️ By Davin Tistama
                </p>
            </div>
        </footer>
    )
}

export default Footer