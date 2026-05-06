const GateKeeperTerminal = ({ isLoggedIn, userData }) => {
    return (
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-1 h-full min-h-[400px] flex flex-col relative">
            {/* Terminal Header */}
            <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex justify-between items-center rounded-t-md">
                <span className="text-xs font-mono text-slate-500 uppercase">Output_Buffer</span>
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                </div>
            </div>
            
            {/* Terminal Body */}
            <div className="flex-1 p-6 font-mono text-sm overflow-auto">
                {!isLoggedIn ? (
                    <div className="flex items-center justify-center h-full text-slate-600">
                        <p>&gt; Waiting for authorized connection...</p>
                    </div>
                ) : !userData ? (
                    <div className="flex flex-col items-start gap-2 text-slate-500">
                        <p>&gt; Connection established.</p>
                        <p>&gt; Awaiting execution commands...</p>
                        <p className="animate-pulse text-cyan-700 mt-4">_</p>
                    </div>
                ) : (
                    <div className="animate-fade-in">
                        <p className="text-cyan-500 mb-4">&gt; Identity record retrieved successfully.</p>
                        
                        <div className="border border-slate-800 p-6 rounded bg-slate-900/50">
                            <div className="flex justify-between items-start mb-6 pb-6 border-b border-slate-800/80">
                                <div>
                                    <h3 className="text-white text-2xl font-light tracking-wider mb-1">{userData.username}</h3>
                                    <p className="text-cyan-600 text-xs tracking-widest uppercase">{userData.role}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-slate-500 text-xs mb-1 uppercase">Clearance Status</p>
                                    <span className={`px-2 py-1 text-xs border ${userData.isEmailVerified ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' : 'border-amber-500/30 text-amber-400 bg-amber-500/10'}`}>
                                        {userData.isEmailVerified ? 'VERIFIED' : 'UNVERIFIED'}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="space-y-4 text-sm">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-1 text-slate-500 uppercase text-xs">Entity_ID</div>
                                    <div className="col-span-2 text-slate-300 break-all">{userData._id}</div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-1 text-slate-500 uppercase text-xs">Relay_Address</div>
                                    <div className="col-span-2 text-slate-300">{userData.email}</div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-1 text-slate-500 uppercase text-xs">Auth_Method</div>
                                    <div className="col-span-2 text-slate-300">{userData.loginType}</div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-1 text-slate-500 uppercase text-xs">Created_At</div>
                                    <div className="col-span-2 text-slate-300">{new Date(userData.createdAt).toUTCString()}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GateKeeperTerminal;
