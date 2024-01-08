"use client"

import { useState, useEffect } from "react"
import debounce from 'debounce';

import Dimension from "./Input/Dimension";
import Matrix from "./Input/Matrix";
import TebakanAwal from "./Input/Guess";
import Result from "./Output/Result";

import JacobiSolver from "../../libs/Jacobi";
import Limit from "./Input/Limit";

const Playground = () => {
    const [dimensions, setDimensions] = useState({ lebar: 2, panjang: 2 });
    const [matriks, setMatriks] = useState([]);
    const [hasil, setHasil] = useState([]);
    const [tebakanAwal, setTebakanAwal] = useState([]);
    const [maxIterasi, setMaxIterasi] = useState();
    const [toleransiError, setToleransiError] = useState();

    const [dimensionError, setDimensionError] = useState();
    const [solution, setSolution] = useState(null);
    const [iterationsData, setIterationsData] = useState([]);
    const [floor, setFloor] = useState(2);

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

        setMaxIterasi(10);
        setToleransiError(0.0001);
        setFloor(5);
        setSolution(null);
        setIterationsData([]);
    }, [dimensions]);

    useEffect(() => {
        setSolution(null);
        setIterationsData([]);
    }, [toleransiError, maxIterasi]);

    const validateDimensions = (panjang, lebar) => {
        if (panjang < 2 || lebar < 2) {
            setDimensionError("Ukuran matriks minimal 2x2.");
        } else {
            setDimensionError(null);
        }
    };

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
        const decimalPart = e.target.value.toString().split('.')[1];
        setFloor(decimalPart ? decimalPart.length + 1 : 0);
    } 

    const handleSolveClick = () => {
        const koefisien = matriks.map(row => row.map(cell => parseFloat(cell)));
        const konstan = hasil.map(value => parseFloat(value));
        const tebakanAwal = Array.from({ length: dimensions.lebar }, () => 0);

        const solver = new JacobiSolver(koefisien, konstan, tebakanAwal, maxIterasi, toleransiError);
        const { solution, iterationsData } = solver.solve();

        console.log(solution, iterationsData);

        setSolution(solution);
        setIterationsData(iterationsData);
    };

    return (
        <section className="grid grid-cols-1 max-w-screen-xl mx-auto min-h-screen gap-16">
            <p className="font-bold text-3xl text-center">
                Playground
            </p>
            <div className="flex flex-col gap-5 items-center">
                {dimensionError &&
                    <div className="bg-red-500 text-white text-center font-bold w-full max-w-lg rounded">{dimensionError}</div>
                }

                <Dimension dimension={dimensions} handleLebar={handleLebar} handlePanjang={handlePanjang} />

                {!dimensionError && (
                    <>
                        <Matrix matriks={matriks} hasil={hasil} handleKoefisien={handleKoefisien} handleHasil={handleHasil} />
                        <TebakanAwal tebakanAwal={tebakanAwal} handleTebakanAwal={handleTebakanAwal} />

                        <Limit maxIterasi={maxIterasi} handleMaxIterasi={handleMaxIterasi} toleransiError={toleransiError} handleError={handleError} />
                        
                        <button
                            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white"
                            onClick={() => handleSolveClick()}
                        >
                            <span className="relative text-white font-bold tracking-widest px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                SOLVE
                            </span>
                        </button>
                    </>
                )}
            </div>
            <div>
                <Result
                    dimension={dimensions}
                    solution={solution}
                    iterationsData={iterationsData}
                    floor={floor}
                />
            </div>
        </section>
    );
};

export default Playground;