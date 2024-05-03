"use client"
import axios from "axios";
import Cookies from 'js-cookie';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function userProfile() {
    const router = useRouter()
    const [data, setData] = useState('nothing')
    const logout = async () => {
        try {
            const res = await axios.get('http://localhost:8000/logout')
            const value = await res
            Cookies.set('token', '');
            console.log('Logout Success', value)
            router.push('/login')
        } catch (error: any) {
            console.log(error)
        }
    }
    const getUserDetails = async () => {
        axios.defaults.withCredentials = true;
        const res = await axios.get('http://localhost:8000/userProfile', {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        console.log(res.data);
        setData(res.data.data._id)
    }

    return (
        <div>
            <p>userprofile</p>
            <button onClick={logout} className="bg-black text-white px-5">Logout</button>
            <div>
                <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/userProfile/${data}`}>{data}
                </Link>}</h2>
                <button onClick={getUserDetails} className="bg-black text-white px-5">getUSerDetails</button>
            </div>
        </div>
    );
}