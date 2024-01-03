"use client"

import { useState, useEffect } from "react"

import JacobiSolver from "../libs/Jacobi";

const Playground = () => {
    const [dimensions, setDimensions] = useState({ lebar: 2, panjang: 2 });
    const [matrix, setMatrix] = useState([]);
    const [hasil, setHasil] = useState([]);
    const [tebakanAwal, setTebakanAwal] = useState([]);
    const [maxIterasi, setMaxIterasi] = useState(0);
    const [error, setError] = useState(0.1);

    useEffect(() => {
        const { lebar, panjang } = dimensions;

        const newMatrix = Array.from({ length: lebar }, () =>
            Array.from({ length: panjang }, () => 0)
        );
        setMatrix(newMatrix);

        const newHasil = Array.from({ length: lebar }, () => 0);
        setHasil(newHasil);

        const newTebakanAwal = Array.from({ length: panjang }, () => 0);
        setTebakanAwal(newTebakanAwal);
    }, [dimensions]);

    const handleLebarChange = (e) => {
        setDimensions((prevDimensions) => ({
            ...prevDimensions,
            lebar: e.target.value,
        }));
    };

    const handlePanjangChange = (e) => {
        setDimensions((prevDimensions) => ({
            ...prevDimensions,
            panjang: e.target.value,
        }));
    };

    const handleMatrixChange = (e, rowIndex, colIndex) => {
        const newMatrix = [...matrix];
        newMatrix[rowIndex][colIndex] = e.target.value;
        setMatrix(newMatrix);
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


    const handleSolveClick = () => {
        const koefisien = matrix.map(row => row.map(cell => parseFloat(cell)));
        const konstan = hasil.map(value => parseFloat(value));
        const tebakanAwal = Array.from({ length: dimensions.lebar }, () => 0);

        const solver = new JacobiSolver(koefisien, konstan, tebakanAwal, maxIterasi, error);
        const { solution, iterationsData } = solver.solve();

        console.log('Solution:', solution);
        console.log('Iterations Data:', iterationsData);
    };

    return (
        <div className="flex flex-col">
            <div className="flex flex-row gap-2">
                <div>
                    <p>Lebar</p>
                    <input
                        type="number"
                        onChange={handleLebarChange}
                        className="w-10 text-white dark:text-black"
                    />
                </div>
                <div>
                    <p>Panjang</p>
                    <input
                        type="number"
                        onChange={handlePanjangChange}
                        className="w-10 text-white dark:text-black"
                    />
                </div>
            </div>
            <div className="flex flex-row">
                <div>
                    {matrix.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex">
                            {row.map((cell, colIndex) => (
                                <input
                                    key={colIndex}
                                    type="number"
                                    value={cell}
                                    onChange={(e) => handleMatrixChange(e, rowIndex, colIndex)}
                                    className="w-10 text-white dark:text-black m-1"
                                />
                            ))}
                        </div>
                    ))}
                </div>
                <div>
                    {hasil.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex">
                            <div className="flex flex-row items-center">
                                <p>=</p>
                                <input
                                    key={rowIndex}
                                    type="number"
                                    value={row}
                                    onChange={(e) => handleHasilChange(e, rowIndex)}
                                    className="w-10 text-white dark:text-black m-1"
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <p>Initial Guess</p>
                    {tebakanAwal.map((value, index) => (
                        <input
                            key={index}
                            type="number"
                            value={value}
                            onChange={(e) => handleTebakanAwalChange(e, index)}
                            className="w-10 text-white dark:text-black m-1"
                        />
                    ))}
                </div>
            </div>
            <div className="flex flex-row gap-2">
                <div>
                    <p>Max Iterasi</p>
                    <input
                        type="number"
                        onChange={(e) => setMaxIterasi(e.target.value)}
                        className="w-10 text-white dark:text-black"
                    />
                </div>
                <div>
                    <p>Tolerasi Error</p>
                    <input
                        type="number"
                        onChange={(e) => setError(e.target.value)}
                        className="w-20 text-white dark:text-black"
                    />
                </div>
            </div>
            <button onClick={() => handleSolveClick()}>SOLVE</button>
        </div>
    );
};

export default Playground;