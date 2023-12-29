import { useState } from "react"
import { auth, resetPassword, update } from "../firebase/config"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../store/auth"


export default function UpdateProfile() {

const dispatch = useDispatch()
const { user } = useSelector( state =>  state.auth)
const [displayName, setDisplayName] = useState(user.displayName || '')
const [avatar, setAvatar] = useState(user.photoURL || '')
const [password, setPassword] = useState('')

const handleSubmit = async(e) => {
    e.preventDefault();
    await update({
        displayName, 
        photoURL: avatar
    })
   dispatch(login({
    displayName: auth.currentUser.displayName,
    email:auth.currentUser.email,
    emailVerified: auth.currentUser.emailVerified,
    photoURL : auth.currentUser.photoURL,
    uid: auth.currentUser.uid
   }))

}

const handleResetPassword = async (e) => {
    e.preventDefault()
    const result= await resetPassword(password)
    if(result) {
        setPassword('')
   
    }
}
    return (
        <div className="grid gap-y-10">
        <form
            className="grid gap-y-4"
            onSubmit={handleSubmit}>
        <h1 className="text-xl font-bold mb-4">Profili Güncelle</h1>
            <div className="m-5">
                <label
                    className=" block text-sm font-medium text-gray-700">Ad-Soyad</label>
                <input
                    className=" p-2 m-1 shadow-sm focus:ring-indigo-500 block w-full sm:text-sm border-gray-900 rounded-md"
                    type="text"
                    placeholder="Emre Sevinç"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)} />

            </div>
            <div className="m-5">
                <label
                    className=" block text-sm font-medium text-gray-700">Profil Fotoğrafı</label>
                <input
                    className=" p-2 m-1 shadow-sm focus:ring-indigo-500 block w-full sm:text-sm border-gray-900 rounded-md"
                    type="text"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)} />

            </div>
            <div>
        <button 
        className="bg-blue-400 rounded flex disabled:opacity-15 cursor-pointer hover:bg-blue-700 m-auto p-3"
        type="submit">Güncelle</button>
        </div>            
        </form>
        <form
            className="grid gap-y-4"
            onSubmit={handleResetPassword}>
            <div className="m-5">
                <label
                    className=" block text-sm font-medium text-gray-700">Şifreyi güncelle</label>
                <input
                    className=" p-2 m-1 shadow-sm focus:ring-indigo-500 block w-full sm:text-sm border-gray-900 rounded-md"
                    type="password"
                    placeholder="Değiştirmek istemiyorsanız değiştirmeyin"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />

            </div>
            <div>
        <button
        disabled= {!password} 
        className="bg-blue-400 rounded flex disabled:opacity-15 cursor-pointer hover:bg-blue-700 m-auto p-3"
        type="submit">Şifreyi Güncelle</button>
        </div>            
        </form>
        </div>
    )
}