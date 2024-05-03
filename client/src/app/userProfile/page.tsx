"use client"
import axios from "axios";
import Link from "next/link";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

export default function userProfile() {
    const router = useRouter()
    const logout = async () => {
        try {
            const res = axios.get('http://localhost:8000/logout')
            Cookies.set('token', '');
            const value = await res
            console.log('Logout Success', value)
            router.push('/login')
        } catch (error: any) {
            console.log(error)
        }
    }
    return (
        <div>
            <p>userprofile</p>
            <button onClick={logout} className="bg-black text-white px-5">Logout</button>
        </div>
    );
}