import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import auth from "../../firebase/firebase.init";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const createUser = ({ email, password, name, image }, callback = null) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
      updateProfile(user, {
        displayName: name,
        photoURL: image,
      }).then(() => {
        axios.post("http://localhost:5000/jwt", { email }).then(({ data }) => {
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
        axios.post("http://localhost:5000/jwt", { email }).then(({ data }) => {
          if (data.success) {
            callback && callback(user);
          }
        });
      })
      .catch(() => {
        toast.error("Invalid email or password");
      });
  };
  const logOut = () => {
    setIsLoading(true);
    try {
      auth.signOut().then(() => {
        axios.post("http://localhost:5000/logout").then(() => {
          toast.success("logout successfully");
        });
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
        axios
          .post("http://localhost:5000/jwt", { email: user.email })
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
      setIsLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);
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
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AuthProvider;
