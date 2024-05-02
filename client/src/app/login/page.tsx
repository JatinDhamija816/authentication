"use client"
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
    const [user, setUser] = useState({ email: '', password: '' })

    const onLogin = async () => {

    }
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div>
                <h1 className="font-bold text-3xl">Login</h1>
            </div>
            <div>
                <div className="m-2">
                    <label className="ml-1">Email</label><br />
                    <input type="email" placeholder="Enter Email" value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        className="border p-1 my-1 rounded-lg outline-none" />
                </div>
                <div className="m-2">
                    <label className="ml-1">Password</label><br />
                    <input type="password" placeholder="Enter Password" value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        className="border p-1 my-1 rounded-lg outline-none" />
                </div>
                <div className="m-2 my-5 flex justify-center">
                    <button onClick={onLogin} className="bg-black text-white w-2/3 rounded-lg py-1">Login</button>
                </div>
                <div className="m-2">
                    <Link href='/register'><h1 className="text-center hover:bg-slate-300 rounded-lg py-1">For Register, click here</h1></Link>
                </div>
            </div>
        </div >
    );
}