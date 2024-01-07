"use client";
import { useState } from "react";

import * as fa from "react-icons/fa";

const Result = ({ dimension, solution, iterationsData, floor }) => {
    const id = Array.from({ length: parseInt(dimension.panjang) }, (_, index) => 'A'.charCodeAt(0) + index)

    const [showDetails, setShowDetails] = useState([]);

    return (
        <div className="relative overflow-x-auto shadow-md rounded-lg m-4">
            <table className="w-full text-sm">
                <caption className="p-5 text-lg font-semibold tracking-widest bg-superDark-400">
                    Hasil Perhitungan
                </caption>
                <thead className="text-xs text-superDark-900 tracking-widest uppercase bg-superDark-300">
                    <tr>
                        <th scope="col" className="px-2 py-3">
                            Iterasi
                        </th>
                        {id.map((value, index) => (
                            <th scope="col" className="px-2 py-3">
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
                    {iterationsData.map((iteration, index) => (
                        <>
                            <tr className={`${index !== iterationsData.length - 1 ? "border-b border-superDark-300 bg-superDark-200" : "bg-superDark-300"}`}>
                                <td scope="row" className="px-2 py-4">
                                    {iteration.iteration}
                                </td>
                                {iteration.x_baru.map((value, index) => (
                                    <td scope="row" className="px-2 py-4">
                                        {value.toFixed(floor)}
                                    </td>
                                ))}
                                <td scope="row" className="px-2 py-4">
                                    {parseFloat(iteration.error.error).toFixed(floor)}
                                </td>
                                <td scope="row" className="px-2 py-4">
                                    <button
                                        className="p-1 rounded bg-superDark-100 hover:bg-superDark-900 hover:text-black"
                                        onClick={() => {
                                            const newShowDetails = [...showDetails];
                                            newShowDetails[index] = !newShowDetails[index];
                                            setShowDetails(newShowDetails);
                                        }}
                                    >
                                        <fa.FaEye />
                                    </button>
                                </td>
                            </tr>

                            {/* SHOW HIDE THIS DIV */}
                            {showDetails[index] && (
                                <tr className={`${index !== iterationsData.length - 1 ? "border-b border-superDark-300 bg-superDark-300" : "bg-superDark-300"}`}>
                                    <td scope="row" colSpan={id.length + 3} className="px-2 py-4">
                                        <div className="grid grid-cols-2 items-center justify-between mx-4">
                                            <div className="flex flex-col gap-2">
                                                <p>Koefisien</p>
                                                <p className={`grid grid-cols-${id.length}`}>
                                                    {id.map((value, index) => (
                                                        <span>
                                                            {String.fromCharCode(value)} = {iteration.x_baru[index].toFixed(floor)}
                                                        </span>
                                                    ))}
                                                </p>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <p>Error</p>
                                                <p className={`grid grid-cols-${id.length}`}>
                                                    {id.map((value, index) => (
                                                        <span>
                                                            {String.fromCharCode(value)} : {parseFloat(iteration.error.allError[index]).toFixed(floor)}
                                                        </span>
                                                    ))}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Result