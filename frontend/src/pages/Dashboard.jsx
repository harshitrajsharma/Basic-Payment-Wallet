import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/User"
import axios from "axios"

export const Dashboard = () => {
    const [balance, setBalance] = useState(0)

    useEffect( () => {
        axios.get('http://localhost:3000/api/v1/account/balance', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then( response => {
            setBalance(response.data.balance);
        })
    }, [])

    return <div className=" flex flex-col gap-4">
        <Appbar />
        <div className="px-12 m-8 flex flex-col gap-4">
            <Balance value={balance} />
            <Users />
        </div>
    </div>
}