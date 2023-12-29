import { useState } from "react";
import { login } from "../firebase/config";
import { useNavigate } from "react-router-dom";


export default function Login() {
    
    const navigate= useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = await login(email, password)
        if(newUser) {
        navigate('/', {
            replace:true
        })
        }
    }
    return (
    <form 
    className="max-w-xl mx-auto grid gap-y-2"
    onSubmit={handleSubmit}>
        <div className="m-5">
        <label 
        className=" block text-sm font-medium text-gray-700">Email</label>
        <input
            className=" p-2 m-1 shadow-sm focus:ring-indigo-500 block w-full sm:text-sm border-gray-900 rounded-md"
            type="text"
            placeholder="Email adresi"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
 
        </div>

        <div className="m-5">
        <label className="block text-sm font-medium text-gray-700">Şifre</label>
        <input
            className="p-2 m-1 shadow-sm focus:ring-indigo-500 block w-full sm:text-sm border-gray-900 rounded-md"
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
        <button 
        className="bg-blue-400 rounded flex disabled:opacity-15 cursor-pointer hover:bg-blue-700 m-auto p-3"
        disabled={!email || !password} type="submit">Giriş Yap</button>
        </div>
    </form>
    )

}