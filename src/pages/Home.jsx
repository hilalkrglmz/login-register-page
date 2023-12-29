import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { emailVerification, logout } from "../firebase/config"
import { logout as logoutHandle } from "../store/auth"
import UpdateProfile from "../components/updateProfile"



const Home = () => {
const navigate = useNavigate()

const dispatch = useDispatch()

const {user} = useSelector( state => state.auth)

const handleLogout  =async () => {
  await logout()
  dispatch(logoutHandle())
  navigate('/login', {
    replace: true
  })
}

const handleVerification = async () => {
  await emailVerification()
}

if(user) {
  return(
    <div className="max-w-xl mx-auto py-5">
      <h1 className="flex gap-x-4 items-center"> 
      Hoşgeldiniz
      {user.photoURL &&  <img src={user.photoURL} className="w-10 h-10 rounded-full"/>}
      <span>{user.email} ile oturumunuz açık</span>
      
      <br />

      <button 
      onClick={handleLogout}
      className="bg-red-700 m-2 p-2 rounded-md">Oturumu kapat</button>
      {!user.emailVerified && 
      <button 
      className="bg-green-700 m-2 p-2 rounded-md"
      onClick={handleVerification}>Email onayla</button>}
      </h1>
      <UpdateProfile/>
    </div>
    
  )
}

  return (
    <div className="flex justify-center items-center  gap-2">
    <Link className="bg-blue-500 p-2 rounded-md mt-20" to={"/register"}>Kayıt Ol</Link> 
       
    <Link className="bg-green-500 p-2 rounded-md mt-20" to={"/login"}>Giriş Yap</Link>        
    </div>
  )
}

export default Home