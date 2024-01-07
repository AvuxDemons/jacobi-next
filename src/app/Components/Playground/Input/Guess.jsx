const Guess = ({ tebakanAwal, handleTebakanAwal }) => {
    return (
        <div className="flex flex-row">
            {
                tebakanAwal.map((value, index) => (
                    <input
                        key={index}
                        type="number"
                        value={value}
                        onChange={(e) => handleTebakanAwal(e, index)}
                        className="w-12 text-white dark:text-black text-center"
                    />
                ))
            }
        </div>
    )
};

export default Guess