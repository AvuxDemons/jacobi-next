import { Poppins } from 'next/font/google'
import './globals.css'

import Navbar from './Components/utils/Navbar'
import Footer from './Components/utils/Footer'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata = {
  title: 'Jacobi',
  description: 'PLATFORM YANG MENGGUNAKAN METODE ITERATIF JACOBI UNTUK MEMUDAHKAN PENYELESAIAN SISTEM PERSAMAAN LINEAR. PENGGUNA DAPAT MASUKKAN DATA DAN PLATFORM MENGHITUNG SOLUSI DENGAN CEPAT, YANG BERGUNA UNTUK KOMPUTASI NUMERIK TANPA KOMPLEKSITAS.',
  icons: {
    icon: '/assets/images/icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
