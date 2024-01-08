const Guess = ({ tebakanAwal, handleTebakanAwal }) => {
    return (
        <div className="flex flex-col items-center gap-2">
            <p className="font-bold tracking-wide uppercase">Tebakan Awal</p>
            <div className="flex flex-row gap-1 font-bold">
                {
                    tebakanAwal.map((value, index) => (
                        <input
                            key={index}
                            type="number"
                            value={value}
                            onChange={(e) => handleTebakanAwal(e, index)}
                            className="w-12 text-white dark:text-black text-center rounded"
                        />
                    ))
                }
            </div>
        </div>
    )
};

export default Guess