"use client"

import { useState, useEffect } from "react"

import JacobiSolver from "../../libs/Jacobi";

const Playground = () => {
    const [dimensions, setDimensions] = useState({ lebar: 2, panjang: 2 });
    const [matriks, setMatriks] = useState([]);
    const [hasil, setHasil] = useState([]);
    const [tebakanAwal, setTebakanAwal] = useState([]);
    const [maxIterasi, setMaxIterasi] = useState();
    const [toleransiError, setToleransiError] = useState();

    const [dimensionError, setDimensionError] = useState();

    useEffect(() => {
        const { lebar, panjang } = dimensions;

        const newKoefisien = Array.from({ length: lebar }, () =>
            Array.from({ length: panjang }, () => 0)
        );
        setMatriks(newKoefisien);

        const newHasil = Array.from({ length: lebar }, () => 0);
        setHasil(newHasil);

        const newTebakanAwal = Array.from({ length: panjang }, () => 0);
        setTebakanAwal(newTebakanAwal);

        setMaxIterasi(0);
        setToleransiError(0.0001);
    }, [dimensions]);

    const handleLebarChange = (e) => {
        setDimensions((prevDimensions) => ({
            ...prevDimensions,
            lebar: e.target.value,
        }));

        validateDimensions(dimensions.panjang, e.target.value);
    };

    const handlePanjangChange = (e) => {
        setDimensions((prevDimensions) => ({
            ...prevDimensions,
            panjang: e.target.value,
        }));

        validateDimensions(dimensions.lebar, e.target.value);
    };

    const validateDimensions = (panjang, lebar) => {
        if (panjang < 2 || lebar < 2) {
            setDimensionError("Ukuran matriks minimal 2x2.");
        } else {
            setDimensionError(null);
        }
    };

    const handleKoefisienChange = (e, rowIndex, colIndex) => {
        const newKoefisien = [...matriks];
        newKoefisien[rowIndex][colIndex] = e.target.value;
        setMatriks(newKoefisien);
    };

    const handleHasilChange = (e, rowIndex) => {
        const newHasil = [...hasil];
        newHasil[rowIndex] = e.target.value;
        setHasil(newHasil);
    };

    const handleTebakanAwalChange = (e, index) => {
        const newTebakanAwal = [...tebakanAwal];
        newTebakanAwal[index] = parseFloat(e.target.value) || 0;
        setTebakanAwal(newTebakanAwal);
    };

    const handleMaxIterasiChange = (e) => {
        setMaxIterasi(e.target.value);
    };

    const handleErrorChange = (e) => {
        setToleransiError(e.target.value);
    }

    const handleSolveClick = () => {
        const koefisien = matriks.map(row => row.map(cell => parseFloat(cell)));
        const konstan = hasil.map(value => parseFloat(value));
        const tebakanAwal = Array.from({ length: dimensions.lebar }, () => 0);

        const solver = new JacobiSolver(koefisien, konstan, tebakanAwal, maxIterasi, toleransiError);
        const { solution, iterationsData } = solver.solve();
    };

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 max-w-[1300px] mx-auto">
            <div className="flex flex-col gap-5">
                {dimensionError &&
                    <div className="bg-red-500 text-white text-center font-bold">{dimensionError}</div>
                }
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2">
                        <p>Koefisien</p>
                        <input
                            type="number"
                            placeholder="P"
                            onChange={handlePanjangChange}
                            className="w-10 text-white dark:text-black text-center"
                        />
                        <p>x</p>
                        <input
                            type="number"
                            placeholder="L"
                            onChange={handleLebarChange}
                            className="w-10 text-white dark:text-black text-center"
                        />
                    </div>
                </div>
                {!dimensionError && (
                    <>

                        <div className="flex flex-row gap-2">
                            <div className="flex flex-col">
                                <div>
                                    <p>Koefisien</p>
                                </div>
                                <div>
                                    {matriks.map((row, rowIndex) => (
                                        <div key={rowIndex} className="flex">
                                            <div className="flex flex-row items-center">
                                                {row.map((cell, colIndex) => (
                                                    <input
                                                        key={colIndex}
                                                        type="number"
                                                        value={cell}
                                                        onChange={(e) => handleKoefisienChange(e, rowIndex, colIndex)}
                                                        className="w-10 text-white dark:text-black m-1 text-center"
                                                    />
                                                ))}
                                                <p>=</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div>
                                    <p>Hasil</p>
                                </div>
                                <div>
                                    {hasil.map((row, rowIndex) => (
                                        <div key={rowIndex} className="flex">
                                            <input
                                                key={rowIndex}
                                                type="number"
                                                value={row}
                                                onChange={(e) => handleHasilChange(e, rowIndex)}
                                                className="w-10 text-white dark:text-black m-1 text-center"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div>
                            <p>Tebakan Awal</p>
                            {tebakanAwal.map((value, index) => (
                                <input
                                    key={index}
                                    type="number"
                                    value={value}
                                    onChange={(e) => handleTebakanAwalChange(e, index)}
                                    className="w-10 text-white dark:text-black m-1 text-center"
                                />
                            ))}
                        </div>
                        <div className="flex flex-row gap-2">
                            <div>
                                <p>Max Iterasi</p>
                                <input
                                    type="number"
                                    value={maxIterasi}
                                    onChange={handleMaxIterasiChange}
                                    className="w-10 text-white dark:text-black text-center"
                                />
                            </div>
                            <div>
                                <p>Tolerasi Error</p>
                                <input
                                    type="number"
                                    value={toleransiError}
                                    onChange={handleErrorChange}
                                    className="w-20 text-white dark:text-black text-center"
                                />
                            </div>
                        </div>
                        <button onClick={() => handleSolveClick()}>SOLVE</button>
                    </>
                )}
            </div>
            <div>
                tabel
            </div>
        </section>
    );
};

export default Playground;