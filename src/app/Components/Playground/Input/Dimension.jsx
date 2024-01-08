const Dimension = ({ dimension, handleLebar, handlePanjang }) => {
    return (
        <div className="flex flex-col items-center gap-2">
            <p className="font-bold tracking-wide uppercase">
                Dimensi Matriks
            </p>
            <div className="flex flex-row gap-2 font-bold tracking-widest">
                <div className="flex flex-row gap-4 items-center uppercase">
                    <input
                        type="number"
                        name="panjang"
                        id="panjang"
                        onChange={handlePanjang}
                        className="text-white dark:text-black text-center max-w-24 rounded"
                    />
                    <label htmlFor="panjang">P</label>
                </div>
                <p>
                    x
                </p>
                <div className="flex flex-row gap-4 items-center uppercase">
                    <label htmlFor="lebar">L</label>
                    <input
                        type="number"
                        name="lebar"
                        id="lebar"
                        onChange={handleLebar}
                        className="text-white dark:text-black text-center max-w-24 rounded"
                    />
                </div>
            </div>
        </div>
    )
}

export default Dimension