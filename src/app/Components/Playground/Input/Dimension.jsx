const Dimension = ({ handleLebar, handlePanjang }) => {
    return (
        <div className="flex flex-row gap-2">
            <div className="flex gap-2">
                <label htmlFor="lebar">Lebar</label>
                <input
                    type="number"
                    name="lebar"
                    id="lebar"
                    onChange={handleLebar}
                    className="text-white dark:text-black text-center max-w-20"
                />
            </div>
            <p>
                x
            </p>
            <div className="flex gap-2">
                <input
                    type="number"
                    name="panjang"
                    id="panjang"
                    onChange={handlePanjang}
                    className="text-white dark:text-black text-center max-w-20"
                />
                <label htmlFor="panjang">Panjang</label>
            </div>
        </div>
    )
}

export default Dimension