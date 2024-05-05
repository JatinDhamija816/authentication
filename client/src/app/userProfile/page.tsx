"use client"
import axios from "axios";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

export default function userProfile() {
    const router = useRouter()
    const [data, setData] = useState(null)
    const [activityLogs, setActivityLogs] = useState([]);
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
                return
            }
            setData(res.data.data.username)
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    }
    const getActivityDetails = async () => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.get('http://localhost:8000/activity', {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            // var result = Object.entries(res.data.activity);
            setActivityLogs(res.data.activity);
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
                        <button onClick={getActivityDetails} className="text-white hover:bg-slate-400 rounded-2xl px-5 py-1">Show Activity</button>
                    </div>
                    <div>
                        <button onClick={logout} className="text-white hover:bg-slate-400 rounded-2xl px-5 py-1">Logout</button>
                    </div>
                </nav>
            </div>
            <div>
                {
                    msg
                        ?
                        <div className="flex justify-center">
                            <h2 className="text-red-500">{msg}</h2>
                        </div>
                        :
                        <div className=" flex flex-wrap justify-center">
                            {activityLogs.map((log: any) => (
                                <div key={log._id} className="w-1/3 bg-slate-300 m-5 px-3 py-3 rounded-lg drop-shadow-2xl">
                                    <div>
                                        <div className="flex justify-between mb-3">
                                            <p>{log.deviceInfo}</p>
                                            <p className="border max-h-fit px-3 py-1 rounded-lg bg-black text-white">{log.activityType}</p>
                                        </div>
                                        <hr />
                                    </div>

                                    <p className="py-1"><PermIdentityOutlinedIcon /> No Profile to show</p>
                                    <p className="py-1"><AccessTimeOutlinedIcon /> {log.time}</p>
                                </div>
                            ))}
                        </div>
                }
            </div>
        </div >
    );
}