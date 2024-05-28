import axios from "axios"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useState } from "react"
import { toast } from 'sonner'

export const Signin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignin = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                username,
                password,
            })
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId);
            toast.success('User signed in successfully.');
            window.location.href = '/dashboard';
        } catch (error) {
            console.error(error);
            toast.error("Error signing in. Try again later")
        }
    }

    return <div className="bg-slate-300 min-h-screen h-auto flex justify-center py-12">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-96 text-center p-2 h-max px-4 flex flex-col gap-4">

                <Heading label={"Sign in"} />

                <SubHeading label={"Enter your credentials to access your account"} />

                <InputBox onChange={(e) => {
                    setUsername(e.target.value);
                }} placeholder="harshit@gmail.com" label={"Email"} />

                <InputBox onChange={(e) => {
                    setPassword(e.target.value);
                }} placeholder="123456" label={"Password"} />

                <div className="pt-4">
                    <Button onClick={handleSignin} label={"Sign in"} />
                </div>

                <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
            </div>
        </div>
    </div>
}