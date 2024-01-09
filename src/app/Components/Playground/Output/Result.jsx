"use client";
import { useState } from "react";
import { motion } from "framer-motion";

import * as fa from "react-icons/fa";

const Result = ({ dimension, solution, iterationsData, floor }) => {
    const char = Array.from({ length: parseInt(dimension.lebar) }, (_, index) => 'A'.charCodeAt(0) + index)

    const [showDetails, setShowDetails] = useState([]);

    return (
        <div className="relative overflow-x-auto shadow-md rounded-lg m-4">
            <table className="w-full text-sm">
                <caption className="p-5 text-lg font-semibold tracking-widest bg-superDark-400">
                    Hasil Perhitungan
                    {solution ? (
                        <div className="text-sm font-medium tracking-wide mt-4 bg-superDark-300 rounded-lg p-4">
                            {solution.length !== 0 ? (
                                <div className="flex flex-col gap-5">
                                    <div>
                                        <p className="font-bold uppercase">Kesimpulan</p>
                                        <p className="font-medium">
                                            Solusi <b>Ditemukan</b> pada iterasi ke <b>{iterationsData.length}</b>
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="flex flex-col gap-1">
                                            <p className="font-bold uppercase">Solusi</p>
                                            <div className="flex flex-col">
                                                {char.map((value, index) => (
                                                    <span key={index}>{String.fromCharCode(value)} : {solution[index]}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="font-bold uppercase">Error</p>
                                            <div className="flex flex-col">
                                                {char.map((value, index) => (
                                                    <span key={index}>{String.fromCharCode(value)} : {iterationsData[iterationsData.length - 1].error.allError[index]}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p>
                                    Solusi <b>Belum Ditemukan</b> pada iterasi ke <b>{iterationsData.length}</b>
                                </p>
                            )}
                        </div>
                    ) : null}
                </caption>
                <thead className="text-xs text-superDark-900 tracking-widest uppercase bg-superDark-300">
                    <tr className="border-b border-superDark-300">
                        <th scope="col" className="px-2 py-3">
                            Iterasi
                        </th>
                        {char.map((value, index) => (
                            <th
                                key={index}
                                scope="col"
                                className="px-2 py-3">
                                {String.fromCharCode(value)}
                            </th>
                        ))}
                        <th scope="col" className="max-w-20 px-2 py-3">
                            Error
                        </th>
                        <th scope="col" className="max-w-20 px-2 py-3">
                            View
                        </th>
                    </tr>
                </thead>
                <tbody className="text-[12px] md:text-xs text-superDark-900 text-center">
                    {!solution && (
                        <tr className="bg-superDark-200">
                            <td scope="row" colSpan={char.length + 3} className="px-2 py-4">
                                <div className="flex flex-row justify-center items-center gap-2 font-bold tracking-widest">
                                    <fa.FaInfoCircle />
                                    <p className="uppercase">
                                        Belum ada Perhitungan
                                    </p>
                                </div>
                            </td>
                        </tr>
                    )}

                    {iterationsData.map((iteration, id) => (
                        <>
                            <motion.tr
                                key={`detail-${id}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.1 * id }}
                                className={`bg-superDark-200 ${id !== iterationsData.length - 1 ? "border-b border-superDark-300" : ""}`}>
                                <td scope="row" className="px-2 py-4">
                                    {iteration.iteration}
                                </td>
                                {iteration.x.baru.map((value, index) => (
                                    <td
                                        key={index}
                                        scope="row"
                                        className="px-2 py-4"
                                    >
                                        {value.toFixed(floor) === "NaN" ? "-" : value.toFixed(floor)}
                                    </td>
                                ))}
                                <td scope="row" className="px-2 py-4">
                                    {parseFloat(iteration.error.error).toFixed(floor) === "NaN" ? "-" : parseFloat(iteration.error.error).toFixed(floor)}
                                </td>
                                <td scope="row" className="px-2 py-4">
                                    <button
                                        className="p-1 rounded bg-superDark-100 hover:bg-superDark-900 hover:text-black"
                                        onClick={() => {
                                            const newShowDetails = [...showDetails];
                                            newShowDetails[id] = !newShowDetails[id];
                                            setShowDetails(newShowDetails);
                                        }}
                                    >
                                        <fa.FaEye />
                                    </button>
                                </td>
                            </motion.tr>

                            {
                                showDetails[id] && (
                                    <motion.tr
                                        key={`detail-${id}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className={`${id !== iterationsData.length - 1 ? "border-b border-superDark-300 bg-superDark-300" : "bg-superDark-300"}`}
                                    >
                                        <td scope="row" colSpan={char.length + 3} className="px-2 py-4">
                                            <div className="grid grid-cols-3 items-center justify-between mx-4 gap-4">
                                                <div className="flex flex-col gap-2">
                                                    <p>Hasil Lama</p>
                                                    <p className={`grid grid-cols-${id.length}`}>
                                                        {char.map((value, index) => (
                                                            <span
                                                                key={index}
                                                            >
                                                                {String.fromCharCode(value)} : {iteration.x.lama[index].toFixed(floor) == 'NaN' ? '-' : iteration.x.lama[index].toFixed(floor)}
                                                            </span>
                                                        ))}
                                                    </p>
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <p>Hasil Baru</p>
                                                    <p className={`grid grid-cols-${id.length}`}>
                                                        {char.map((value, index) => (
                                                            <span
                                                                key={index}
                                                            >
                                                                {String.fromCharCode(value)} : {iteration.x.baru[index].toFixed(floor) == 'NaN' ? '-' : iteration.x.baru[index].toFixed(floor)}
                                                            </span>
                                                        ))}
                                                    </p>
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <p>Error</p>
                                                    <p className={`grid grid-cols-${id.length}`}>
                                                        {char.map((value, index) => (
                                                            <span
                                                                key={index}
                                                            >
                                                                {String.fromCharCode(value)} : {parseFloat(iteration.error.allError[index]).toFixed(floor) == 'NaN' ? '-' : parseFloat(iteration.error.allError[index]).toFixed(floor)}
                                                            </span>
                                                        ))}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                    </motion.tr>
                                )
                            }
                        </>
                    ))}
                </tbody>
            </table>
        </div >
    )
}

export default Result