
const ServiceSkilaton = () => {
    const data = [1,2,3,4];
    return (<>
        
        {
            data.map((s)=>(<div className=" p-4 max-w-sm w-full mx-auto" key={s}>
            <div className="bg-slate-700 h-60 w-60 text-center animate-pulse"></div>
            <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                    <div className="space-y-3">
                    <div className="h-2 bg-slate-700 rounded w-[250px] mt-4"></div>
                        <div className="h-2 bg-slate-700 rounded w-[250px]"></div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                            <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>))
        }
            
        

    </>

    );
};

export default ServiceSkilaton;