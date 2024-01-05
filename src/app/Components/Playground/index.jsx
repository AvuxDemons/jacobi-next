"use client"

import { useState, useEffect } from "react"
import debounce from 'debounce';

import Dimension from "./Input/Dimension";

import JacobiSolver from "../../libs/Jacobi";
import Matrix from "./Input/Matrix";
import TebakanAwal from "./Input/Tebakan";

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

    const handleLebar = debounce((e) => {
        setDimensions((prevDimensions) => ({
            ...prevDimensions,
            lebar: e.target.value,
        }));

        validateDimensions(dimensions.panjang, e.target.value);
    }, 500);

    const handlePanjang = debounce((e) => {
        setDimensions((prevDimensions) => ({
            ...prevDimensions,
            panjang: e.target.value,
        }));

        validateDimensions(dimensions.lebar, e.target.value);
    }, 500);

    const validateDimensions = (panjang, lebar) => {
        if (panjang < 2 || lebar < 2) {
            setDimensionError("Ukuran matriks minimal 2x2.");
        } else {
            setDimensionError(null);
        }
    };

    const handleKoefisien = (e, rowIndex, colIndex) => {
        const newKoefisien = [...matriks];
        newKoefisien[rowIndex][colIndex] = e.target.value;
        setMatriks(newKoefisien);
    };

    const handleHasil = (e, rowIndex) => {
        const newHasil = [...hasil];
        newHasil[rowIndex] = e.target.value;
        setHasil(newHasil);
    };

    const handleTebakanAwal = (e, index) => {
        const newTebakanAwal = [...tebakanAwal];
        newTebakanAwal[index] = parseFloat(e.target.value) || 0;
        setTebakanAwal(newTebakanAwal);
    };

    const handleMaxIterasi = (e) => {
        setMaxIterasi(e.target.value);
    };

    const handleError = (e) => {
        setToleransiError(e.target.value);
    }

    const handleSolveClick = () => {
        const koefisien = matriks.map(row => row.map(cell => parseFloat(cell)));
        const konstan = hasil.map(value => parseFloat(value));
        const tebakanAwal = Array.from({ length: dimensions.lebar }, () => 0);

        const solver = new JacobiSolver(koefisien, konstan, tebakanAwal, maxIterasi, toleransiError);
        const { solution, iterationsData } = solver.solve();
        console.log(solution, iterationsData);
    };

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 max-w-[1300px] mx-auto">
            <div className="flex flex-col gap-5">
                {dimensionError &&
                    <div className="bg-red-500 text-white text-center font-bold">{dimensionError}</div>
                }

                <Dimension handleLebar={handleLebar} handlePanjang={handlePanjang} />

                {!dimensionError && (
                    <>
                        <Matrix matriks={matriks} hasil={hasil} handleKoefisien={handleKoefisien} handleHasil={handleHasil} />
                        <TebakanAwal tebakanAwal={tebakanAwal} handleTebakanAwal={handleTebakanAwal} />
                        
                        <div className="flex flex-row gap-2">
                            <div>
                                <p>Max Iterasi</p>
                                <input
                                    type="number"
                                    value={maxIterasi}
                                    onChange={handleMaxIterasi}
                                    className="w-10 text-white dark:text-black text-center"
                                />
                            </div>
                            <div>
                                <p>Tolerasi Error</p>
                                <input
                                    type="number"
                                    value={toleransiError}
                                    onChange={handleError}
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