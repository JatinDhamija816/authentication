"use client"
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Register() {
    const [user, setUser] = useState({ username: '', email: '', password: '' })

    const onSignup = async () => {

    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div>
                <h1 className="font-bold text-3xl">Sign Up</h1>
            </div>
            <div>
                <div className="m-2">
                    <label className="ml-1">Username</label><br />
                    <input type="text" placeholder="Enter Username" value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        className="border p-1 my-1 rounded-lg outline-none" />
                </div>
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
                    <button onClick={onSignup} className="bg-black text-white w-2/3 rounded-lg py-1">Signup</button>
                </div>
                <div className="m-2">
                    <Link href='/login'><h1 className="text-center hover:bg-slate-300 rounded-lg py-1">For Login, click here</h1></Link>
                </div>
            </div>
        </div >
    );
}