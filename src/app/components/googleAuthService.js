import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";

export const loginWithGoogle = async (auth) => {

  const provider = new GoogleAuthProvider();
  try {
    return await signInWithPopup(auth, provider);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
