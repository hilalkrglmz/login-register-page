// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, sendEmailVerification, updatePassword} from "firebase/auth"
import toast from "react-hot-toast";
import store from "../store";
import {login as loginHandle, logout as logoutHandle} from "../store/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0YJ4mXddujY0sOJ45x7Vhb6i6HWx1kEY",
  authDomain: "new-assignment-1961c.firebaseapp.com",
  projectId: "new-assignment-1961c",
  storageBucket: "new-assignment-1961c.appspot.com",
  messagingSenderId: "930444053482",
  appId: "1:930444053482:web:e5912090431f1581c2c093"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth= getAuth();

export const register = async (email, password) => {
   try {
   const {user} = await createUserWithEmailAndPassword(auth, email, password) 
   return user
    
   } catch (error) {
   toast.error(error.message) 
   }
}
export const login = async (email, password) => {
   try {
    const {user} = await signInWithEmailAndPassword(auth, email, password)    
    return user;
} catch (error) {
   toast.error(error.message) 
   }
}
export const logout = async () => {
   try {
    await signOut(auth)    
    return true;
} catch (error) {
   toast.error(error.message) 
   }
}

export const update = async data => {
   try {
      await updateProfile(auth.currentUser, data)
      toast.success('Profil başarıyla güncellendi.')
      return true;
   } catch (error) {
      toast.error(error.message)
      
   }
}
export const resetPassword = async password => {
   try {
      await updatePassword(auth.currentUser, password)
      toast.success('Parola güncellendi.')
      return true;
   } catch (error) {
      toast.error(error.message)
      
   }
}

export const emailVerification = async () => {
   try {
      await sendEmailVerification(auth.currentUser)
      toast.success(`Doğrulama linki başarıyla ${auth.currentUser.email} adresinize gönderildi`)
   } catch (error) {
      toast.error(error.message)
   }
}

onAuthStateChanged(auth, (user)=> {
   if(user) {
      store.dispatch(loginHandle({
         displayName: user.displayName,
         email:user.email,
         emailVerified: user.emailVerified,
         photoURL : user.photoURL,
         uid: user.uid
      }))
   }else{
      store.dispatch(logoutHandle())
   }
})


