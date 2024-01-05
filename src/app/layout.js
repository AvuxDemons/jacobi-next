import { Poppins } from 'next/font/google'
import './globals.css'

import Navbar from './Components/utils/Navbar'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata = {
  title: 'Jacobi',
  description: 'Davin Tistama Brilliant Samudra - 06.2022.1.07536',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
