// import { createContext, useState, useEffect, useContext } from "react";
// import { auth } from "../firebase";
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
// import { addDoc, collection } from "firebase/firestore";
// import { firestore } from "../firebase";

// export const AuthContext = createContext();

// export function useAuth() {
//     return useContext(AuthContext)
// }

// export function AuthProvider({ children }) {
//     const [currentUser, setCurrentUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     function signUp(email, password) {
//         return auth.createUserWithEmailAndPassword(email, password);
//     }

//     useEffect(() => {
//         const unsubscribe = auth.onAuthStateChanged(user => {
//             setCurrentUser(user);
//             setLoading(false);
//         })

//         return unsubscribe;
//     }, [])

//     const value = {
//         currentUser,
//         signUp
//     }

//     return (
//         <AuthContext value={value}>
//             {!loading && children}
//         </AuthContext>
//     )
// }
