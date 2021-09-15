import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import route from "next/router";
import firebase from "../../firebase/config";
import User from "../../model/User";

interface AuthContextProps {
  user?: User;
  loading?: boolean;
  loginGoogle?: () => Promise<void>;
  login?: (email: string, senha: string) => Promise<void>;
  register?: (email: string, senha: string) => Promise<void>;
  logout?: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({});

async function normalizedUser(firebaseUser: firebase.User): Promise<User> {
  const token = await firebaseUser.getIdToken();
  return {
    uid: firebaseUser.uid,
    name: firebaseUser.displayName,
    email: firebaseUser.email,
    token,
    provider: firebaseUser.providerData[0].providerId,
    imageUrl: firebaseUser.photoURL,
  };
}

function manageCookie(logged: boolean) {
  if (logged) {
    Cookies.set("admin-template-cod3r-auth", logged, {
      expires: 7,
    });
  } else {
    Cookies.remove("admin-template-cod3r-auth");
  }
}

export function AuthProvider(props) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>(null);

  async function toSetUpSession(firebaseUser) {
    if (firebaseUser?.email) {
      const user = await normalizedUser(firebaseUser);
      setUser(user);
      manageCookie(true);
      setLoading(false);
      return user.email;
    } else {
      setUser(null);
      manageCookie(false);
      setLoading(false);
      return false;
    }
  }

  async function loginGoogle() {
    try {
      setLoading(true);
      const resp = await firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider());

      await toSetUpSession(resp.user);
      route.push("/");
    } finally {
      setLoading(false);
    }
  }

  async function login(email, password) {
    try {
      setLoading(true);
      const resp = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      await toSetUpSession(resp.user);
      route.push("/");
    } finally {
      setLoading(false);
    }
  }

  async function register(email, password) {
    try {
      setLoading(true);
      const resp = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      await toSetUpSession(resp.user);
      route.push("/");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      setLoading(true);
      await firebase.auth().signOut();
      await toSetUpSession(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (Cookies.get("admin-template-cod3r-auth")) {
      const cancel = firebase.auth().onIdTokenChanged(toSetUpSession);
      return () => cancel();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        loginGoogle,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
