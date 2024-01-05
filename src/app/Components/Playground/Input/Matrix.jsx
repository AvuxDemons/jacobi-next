const Matrix = ({ matriks, hasil, handleKoefisien, handleHasil }) => {
    return (
        <div className="flex flex-row gap-1">
            <div className="flex flex-col">
                {matriks.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex">
                        <div className="flex flex-row items-center mr-1">
                            {row.map((cell, colIndex) => (
                                <input
                                    key={colIndex}
                                    type="number"
                                    value={cell}
                                    onChange={(e) => handleKoefisien(e, rowIndex, colIndex)}
                                    className="w-10 text-white dark:text-black text-center"
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div>
                {matriks.map(() => (
                    <p>=</p>
                ))}
            </div>
            <div>
                {hasil.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex">
                        <input
                            key={rowIndex}
                            type="number"
                            value={row}
                            onChange={(e) => handleHasil(e, rowIndex)}
                            className="w-10 text-white dark:text-black text-center"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Matrix