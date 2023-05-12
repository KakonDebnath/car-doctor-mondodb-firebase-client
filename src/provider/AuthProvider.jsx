import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";


export const AuthContext = createContext();
const auth = getAuth(app);


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('https://cars-doctor-server-chi.vercel.app/services')
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])

    // create a new user with email and password
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Sign in with email and password

    const logInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // SignOut
    const logOutUser = () => {
        return signOut(auth);
    }
    // observer
    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                console.log(currentUser);
                setLoading(false);

            } else {
                // User is signed out
                setUser(null);
                setLoading(false);
            }
        });
        return () => {
            return unsubcribe;
        }
    }, [])


    const authInfo = {
        user,
        loading,
        createUser,
        logInUser,
        logOutUser,
        services,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;