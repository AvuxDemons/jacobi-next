const Limit = ({ maxIterasi, handleMaxIterasi, toleransiError, handleError }) => {
    return (
        <div className="flex flex-col items-center gap-2">
            <p className="font-bold tracking-wide uppercase">Limit</p>
            <div className="flex flex-col md:flex-row gap-2 font-bold">
                <div className="flex flex-col items-center gap-1">
                    <p className="font-bold tracking-wide uppercase">Max Iterasi</p>
                    <input
                        type="number"
                        value={maxIterasi}
                        onChange={handleMaxIterasi}
                        className="max-w-48 text-black text-center rounded"
                    />
                </div>
                <div className="flex flex-col items-center gap-1">
                    <p className="font-bold tracking-wide uppercase">Error</p>
                    <input
                        type="number"
                        value={toleransiError}
                        onChange={handleError}
                        className="max-w-48 text-black text-center rounded"
                    />
                </div>
            </div>
        </div>
    )
}

export default Limit