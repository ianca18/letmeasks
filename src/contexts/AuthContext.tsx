import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../servidor/firebase";



type User = {
  id: string;
  name: string;
  avatar: string;
}
type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>; //sem retorn
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>(); //atenticaçao do usuario

  useEffect(() => { //hook e disparado quando o authContextProvider e exibido em tela ele fica esperando
    const unsubscribe = auth.onAuthStateChanged(user => {  //vai espera dispara o evento vem se existe e vai dispara
      if (user) {
        const { displayName, photoURL, uid } = user

        if (!displayName || !photoURL) {
          throw new Error('Missing information from google Accont');
        }


        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL

        })

      }

    })
    return () => {
      unsubscribe();
    }
  }, [])

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user

      if (!displayName || !photoURL) {
        throw new Error('Missing information from google Accont');
      }


      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL

      })


    }

  }


  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}
