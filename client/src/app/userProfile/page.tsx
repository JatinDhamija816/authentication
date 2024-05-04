"use client"
import axios from "axios";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function userProfile() {
    const router = useRouter()
    const [data, setData] = useState(null)
    const [msg, setMsg] = useState('')
    const logout = async () => {
        try {
            const res = await axios.get('http://localhost:8000/logout')
            Cookies.set('token', '');
            router.push('/login')
        } catch (error: any) {
            console.log(error)
        }
    }
    const getUserDetails = async () => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.get('http://localhost:8000/userProfile', {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            if (res.data.data.isVerfied === false) {
                setMsg('Please Verify your Email')
            }
            setData(res.data.data.username)
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    }
    useEffect(() => {
        getUserDetails()
    })

    return (
        <div>
            <div>
                <nav className='bg-gray-700 flex justify-between py-3 text-white px-5'>
                    {
                        data ? <div><h2 className="uppercase">{data}</h2></div> : <div>Demo</div>
                    }
                    <div>
                        <button onClick={logout} className="text-white hover:bg-slate-400 rounded-2xl px-5 py-1">Logout</button>
                    </div>
                </nav>
            </div>
            <div>
                {
                    msg &&
                    <div className="flex justify-center">
                        <h2 className="text-red-500">{msg}</h2>
                    </div>
                }
            </div>
        </div >
    );
}