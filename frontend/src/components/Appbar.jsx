import axios from "axios";
import { useEffect, useState } from "react"
import { Button } from "./Button";


export const Appbar = () => {
    const [ user, setUser ] = useState("");

    useEffect( () => {
        axios.get('http://localhost:3000/api/v1/user/me', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            setUser(response.data.firstName)
        })
    }, [])


    return <div className=" border-b shadow h-14 flex justify-between px-12">
        <div className="flex flex-col justify-center h-full font-bold">
            Basic Payment Wallet
        </div>
        <div className="flex gap-4">
            <div className="flex flex-col justify-center h-full">
                Hello {user}
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user ? user[0].toUpperCase() : ""}
                </div>
            </div>
            <div className=" flex justify-center items-center">
            <Button onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                window.location.href = '/signin';
            }} label={"Log out"} />
            </div>
        </div>
    </div>
}