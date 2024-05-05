"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const verifyUserEmail = async () => {
        try {
            await axios.post('https://authentication-4599.onrender.com/verifyEmail', { token })
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.log(error.reponse.data);
        }
    }
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, [])
    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            {verified && (
                <div className=" flex justify-center flex-col">
                    <h2 className="text-2xl">Email Verified</h2>
                    <button className="bg-black text-white px-3 py-1 rounded-lg mt-5"><Link href="/login">Login</Link></button>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                </div>
            )}
        </div>
    )
}