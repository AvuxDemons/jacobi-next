const Matrix = ({ matriks, hasil, handleKoefisien, handleHasil }) => {
    return (
        <div className="flex flex-col items-center gap-2">
            <p className="font-bold tracking-wide uppercase">Matriks</p>
            <div className="flex flex-row gap-1 font-bold">
                <div className="flex flex-col gap-1">
                    {matriks.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex">
                            <div className="flex flex-row items-center gap-1">
                                {row.map((cell, colIndex) => (
                                    <input
                                        key={colIndex}
                                        type="number"
                                        value={cell}
                                        onChange={(e) => handleKoefisien(e, rowIndex, colIndex)}
                                        className="w-12 text-white dark:text-black text-center rounded"
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    {matriks.map((value, index) => (
                        <p key={index}>=</p>
                    ))}
                </div>
                <div className="flex flex-col gap-1">
                    {hasil.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex">
                            <input
                                key={rowIndex}
                                type="number"
                                value={row}
                                onChange={(e) => handleHasil(e, rowIndex)}
                                className="w-12 text-white dark:text-black text-center rounded"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Matrix