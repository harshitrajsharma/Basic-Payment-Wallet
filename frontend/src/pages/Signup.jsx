import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from 'axios'
import { toast } from 'sonner'

export const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    const handleSignup = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                username: email,
                firstName,
                lastName,
                password,
            })
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId);
            toast.success('User signed up successfully.');
            window.location.href = '/dashboard';
        } catch (error) {
            console.error(error);
            toast.error("Error singing up. Try again Later");
        }
    }

    return (
        <div className="bg-slate-300 h-auto min-h-screen flex justify-center py-12">

            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-96 text-center p-2 h-max px-4 flex flex-col gap-4">
                    <Heading label={"Sign up"} />
                    <SubHeading label={"Enter your infromation to create an account"} />

                    <InputBox onChange={(e) => {
                        const value = e.target.value;
                        const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
                        setFirstName(capitalizedValue);
                    }} placeholder="Harshit" label={"First Name"} />

                    <InputBox onChange={(e) => {
                        const value = e.target.value;
                        const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
                        setLastName(capitalizedValue);
                    }} placeholder="Sharma" label={"Last Name"} />

                    <InputBox onChange={(e) => {
                        setEmail(e.target.value)
                    }} placeholder="harshit@gmail.com" label={"Email"} />

                    <InputBox onChange={(e) => {
                        const value = e.target.value;
                        const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
                        setPassword(capitalizedValue);
                    }} placeholder="123456" label={"Password"} />

                    <div className="pt-4">
                        <Button onClick={handleSignup} label={"Sign up"} />
                    </div>

                    <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
                </div>
            </div>
        </div>
    )
}