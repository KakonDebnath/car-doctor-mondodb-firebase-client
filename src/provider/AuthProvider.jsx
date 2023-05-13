import { createContext, useEffect, useState } from "react";
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";


export const AuthContext = createContext();
const auth = getAuth(app);


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [services, setServices] = useState([]);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

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
    // sign in with google 
    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }
    // sign in with Github 
    const signInWithGithub = () => {
        return signInWithPopup(auth, githubProvider);
    }
    // observer
    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setLoading(false);
                if (currentUser && currentUser.email) {
                    const userForJwt = {
                        email: currentUser.email
                    }
                    fetch("https://cars-doctor-server-chi.vercel.app/jwt", {
                        method: 'POST',
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify(userForJwt)
                    })
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem("car-doctor-access-token", data.token);
                    })
                }

            } else {
                // User is signed out
                setUser(null);
                setLoading(false);
                localStorage.removeItem("car-doctor-access-token");
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
        signInWithGoogle,
        signInWithGithub,
        services,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;