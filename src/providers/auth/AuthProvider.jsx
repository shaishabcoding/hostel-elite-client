import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import auth from "../../firebase/firebase.init";
import { toast } from "react-toastify";
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import usePublicClient from "../../hooks/usePublicClient";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const publicClient = usePublicClient();

  const createUser = ({ email, password, name, image }, callback = null) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
      updateProfile(user, {
        displayName: name,
        photoURL: image,
      }).then(() => {
        publicClient
          .post("/users", {
            email: user?.email,
            name: user?.displayName,
            image: user?.photoURL,
            badge: "bronze",
          })
          .then(({ data }) => {
            if (data.success) {
              callback && callback(user);
            }
          });
      });
    });
  };
  const logIn = ({ email, password }, callback = null) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        callback && callback(user);
      })
      .catch(() => {
        toast.error("Invalid email or password");
      });
  };
  const logOut = () => {
    setIsLoading(true);
    try {
      auth.signOut().then(() => {
        localStorage.removeItem("access-token");
      });
    } catch (err) {
      toast.error(err);
    }
  };

  const update = ({ name, image }) =>
    updateProfile(user, {
      displayName: name,
      photoURL: image,
    });

  const signUp = (provider, callback = null) => {
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        publicClient
          .post("/users", {
            email: user?.email,
            name: user?.displayName,
            image: user?.photoURL,
            badge: "bronze",
          })
          .then(({ data }) => {
            if (data.success) {
              callback && callback(user);
            }
          });
      })
      .catch(({ message }) => {
        toast.error(message);
      });
  };

  const googleSignUp = (callback = null) => signUp(googleProvider, callback);
  const githubSignUp = (callback = null) => signUp(githubProvider, callback);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        const userInfo = { email: user?.email };
        publicClient.post("/jwt", userInfo).then(({ data }) => {
          if (data?.token) {
            localStorage.setItem("access-token", data.token);
            setIsLoading(false);
          }
        });
      } else {
        localStorage.removeItem("access-token");
        setIsLoading(false);
      }
    });
    return () => {
      unSubscribe();
    };
  }, [publicClient]);
  const authInfo = {
    user,
    createUser,
    logOut,
    logIn,
    isLoading,
    signUp,
    googleSignUp,
    githubSignUp,
    update,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
