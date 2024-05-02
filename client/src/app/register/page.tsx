"use client"
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Register() {
    const [user, setUser] = useState({ username: '', email: '', password: '' })
    const router = useRouter()
    const onSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            if (!user.username || !user.email || !user.password) return alert('Please Provide all details')
            const res = axios.post('http://localhost:8000/register', user)
            console.log('Signup Success', res)
            router.push('/login')
        } catch (error: any) {
            console.log("Signup failed ", error.message)
        }
    }
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div>
                <h1 className="font-bold text-3xl my-5">Sign Up</h1>
            </div>
            <div>
                <form action="" onSubmit={onSignup}>
                    <div className="m-2">
                        <label className="ml-1">Username</label><br />
                        <input type="text" required placeholder="Enter Username" value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            className="border p-1 my-1 rounded-lg outline-none" />
                    </div>
                    <div className="m-2">
                        <label className="ml-1">Email</label><br />
                        <input type="email" required placeholder="Enter Email" value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            className="border p-1 my-1 rounded-lg outline-none" />
                    </div>
                    <div className="m-2">
                        <label className="ml-1">Password</label><br />
                        <input type="password" required placeholder="Enter Password" value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            className="border p-1 my-1 rounded-lg outline-none" />
                    </div>
                    <div className="m-2 my-5 flex justify-center">
                        <button className="bg-black text-white w-2/3 rounded-lg py-1">Signup</button>
                    </div>
                    <div className="m-2">
                        <Link href='/login'><h1 className="text-center hover:bg-slate-300 rounded-lg py-1">For Login, click here</h1></Link>
                    </div>
                </form>
            </div >
        </div >
    );
}