


export const Loading = () => {


    return (
        <div className='fixed top-0 left-0 h-screen w-screen bg-slate-800 z-20 opacity-80 flex justify-center items-center'>
            
            <div className="w-8 h-8 z-30 absolute">
                <div className="spinner-border inline-block w-16 h-16 animate-spin border-rose-600 border-8 rounded-full text-blue-600" role="status">
                    <div className="visually-hidden bg-slate-800 -mt-3 ml-1 m-auto rounded-null h-full w-8 absolute z-40"></div>
                </div>
            </div>
        </div>
    )
}