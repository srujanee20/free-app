import { useState, useEffect } from "react";
import { registerUser, loginUser, logoutUser, getCurrentUser } from "../../clients/freeApiUserClient.js";

import GateKeeperTerminal from "../common/GateKeeperTerminal.jsx";

const GateKeeper = () => {
    const [view, setView] = useState("login"); // 'login' | 'register'
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "ADMIN"
    });

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMsg(null);
        try {
            const res = await registerUser(formData);
            if (res.success) {
                setSuccessMsg("System initialized. Identity registered. Please proceed to Authorization.");
                setView("login");
            } else {
                setError(res.message || "Registration failed. Identity unverified.");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Identity unverified.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMsg(null);
        try {
            const res = await loginUser({
                username: formData.username,
                password: formData.password
            });
            if (res.success) {
                setIsLoggedIn(true);
                setSuccessMsg("Authorization accepted. Access granted.");
            } else {
                setError(res.message || "Authorization rejected.");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Authorization rejected.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        setError(null);
        setSuccessMsg(null);
        try {
            await logoutUser();
        } catch (err) {
            console.error("Logout error", err);
        } finally {
            localStorage.removeItem("accessToken");
            setIsLoggedIn(false);
            setUserData(null);
            setSuccessMsg("Session terminated. Connection closed.");
            setLoading(false);
        }
    };

    const handleGetCurrentUser = async () => {
        setLoading(true);
        setError(null);
        setSuccessMsg(null);
        try {
            const res = await getCurrentUser();
            if (res.success && res.data) {
                setUserData(res.data);
                setSuccessMsg("Identity data retrieved successfully.");
            } else {
                setError(res.message || "Retrieval failed. Authorization may be expired.");
                if (res.statusCode === 401) {
                    setIsLoggedIn(false);
                    localStorage.removeItem("accessToken");
                }
            }
        } catch (err) {
            setError(err.response?.data?.message || "Retrieval failed. Target unreachable.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-grow w-full bg-[#0a0f18] min-h-screen text-slate-300 font-sans relative overflow-hidden">
            {/* Cyber Grid Background */}
            <div className="absolute inset-0 pointer-events-none" 
                 style={{
                     backgroundImage: `linear-gradient(rgba(30, 41, 59, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(30, 41, 59, 0.5) 1px, transparent 1px)`,
                     backgroundSize: '40px 40px',
                     opacity: 0.3
                 }}>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-12 lg:px-8 relative z-10">
                
                {/* Header Section */}
                <div className="mb-14 border-b border-slate-800 pb-6">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-3 h-3 bg-cyan-500 rounded-sm animate-pulse"></div>
                        <h1 className="text-4xl font-bold text-white tracking-widest uppercase">
                            Gate<span className="text-cyan-500 font-light">Keeper</span>
                        </h1>
                    </div>
                    <p className="text-slate-400 text-sm font-mono tracking-wide">
                        // SECURE IDENTITY CONTROL CENTER v1.0
                    </p>
                </div>

                {/* Alerts */}
                {error && (
                    <div className="mb-8 p-4 bg-red-950/40 border-l-4 border-red-500 text-red-400 font-mono text-sm flex items-start gap-3 shadow-lg">
                        <span>[ERR]</span>
                        <p>{error}</p>
                    </div>
                )}
                {successMsg && (
                    <div className="mb-8 p-4 bg-emerald-950/40 border-l-4 border-emerald-500 text-emerald-400 font-mono text-sm flex items-start gap-3 shadow-lg">
                        <span>[SYS]</span>
                        <p>{successMsg}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Main Control Panel */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        
                        {!isLoggedIn ? (
                            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-lg p-1 shadow-2xl">
                                <div className="flex p-1 gap-1 border-b border-slate-800/50 mb-4 bg-slate-950/50 rounded-t-md">
                                    <button
                                        onClick={() => setView("login")}
                                        className={`flex-1 py-2.5 text-xs font-mono uppercase tracking-wider transition-all rounded-sm ${view === "login" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30" : "text-slate-500 hover:text-slate-300"}`}
                                    >
                                        Auth_Login
                                    </button>
                                    <button
                                        onClick={() => setView("register")}
                                        className={`flex-1 py-2.5 text-xs font-mono uppercase tracking-wider transition-all rounded-sm ${view === "register" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30" : "text-slate-500 hover:text-slate-300"}`}
                                    >
                                        Initialize_ID
                                    </button>
                                </div>

                                <div className="p-6 pt-2">
                                    {view === "login" ? (
                                        <form onSubmit={handleLogin} className="space-y-5">
                                            <div>
                                                <label className="block text-xs font-mono text-slate-400 mb-2 uppercase">Username_</label>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    required
                                                    value={formData.username}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-slate-950 border border-slate-700 text-slate-200 px-4 py-2.5 rounded focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all font-mono text-sm"
                                                    placeholder="Enter designation"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-mono text-slate-400 mb-2 uppercase">Passkey_</label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    required
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-slate-950 border border-slate-700 text-slate-200 px-4 py-2.5 rounded focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all font-mono text-sm"
                                                    placeholder="••••••••"
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full mt-4 py-3 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold uppercase tracking-widest text-xs rounded transition-colors disabled:opacity-50"
                                            >
                                                {loading ? "Processing..." : "Initiate Connection"}
                                            </button>
                                        </form>
                                    ) : (
                                        <form onSubmit={handleRegister} className="space-y-5">
                                            <div>
                                                <label className="block text-xs font-mono text-slate-400 mb-2 uppercase">Email_Relay_</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-slate-950 border border-slate-700 text-slate-200 px-4 py-2.5 rounded focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all font-mono text-sm"
                                                    placeholder="user@network.local"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-mono text-slate-400 mb-2 uppercase">Desired_Username_</label>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    required
                                                    value={formData.username}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-slate-950 border border-slate-700 text-slate-200 px-4 py-2.5 rounded focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all font-mono text-sm"
                                                    placeholder="Identify yourself"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-mono text-slate-400 mb-2 uppercase">Security_Key_</label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    required
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-slate-950 border border-slate-700 text-slate-200 px-4 py-2.5 rounded focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all font-mono text-sm"
                                                    placeholder="Create strong passkey"
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full mt-4 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold uppercase tracking-widest text-xs rounded transition-colors disabled:opacity-50 border border-slate-500"
                                            >
                                                {loading ? "Registering..." : "Commit Identity"}
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-slate-900/60 backdrop-blur-md border border-cyan-500/30 rounded-lg p-6 shadow-[0_0_15px_rgba(6,182,212,0.15)] relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/5 blur-2xl"></div>
                                <h2 className="text-xl text-white font-light tracking-wide mb-2 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                    Connection Active
                                </h2>
                                <p className="text-slate-400 text-sm font-mono mb-8">
                                    Terminal is ready for secure requests.
                                </p>
                                
                                <div className="flex flex-col gap-4">
                                    <button
                                        onClick={handleGetCurrentUser}
                                        disabled={loading}
                                        className="w-full py-3 bg-cyan-600/10 hover:bg-cyan-600/20 text-cyan-400 border border-cyan-500/50 font-mono uppercase tracking-widest text-xs rounded transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {loading ? "Querying Network..." : "EXEC: Get_Identity_Record"}
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        disabled={loading}
                                        className="w-full py-3 bg-transparent hover:bg-red-500/10 text-slate-400 hover:text-red-400 border border-slate-700 hover:border-red-500/50 font-mono uppercase tracking-widest text-xs rounded transition-all disabled:opacity-50"
                                    >
                                        Terminate_Session
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Output Display Panel */}
                    <div className="lg:col-span-7">
                        <GateKeeperTerminal isLoggedIn={isLoggedIn} userData={userData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GateKeeper;
