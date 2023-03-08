import React, { useState, useEffect } from "react";
import SignedInStack, { SignedOutStack } from "./Navigation";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthNavigation = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        user ? setCurrentUser(user) : setCurrentUser(null);
      }),
    []
  );

  return <>{currentUser ? <SignedInStack /> : <SignedOutStack />}</>;
};

export default AuthNavigation;
