// auth context
"use client";  // This is a client component
import { createContext, useContext, useState, useEffect, useReducer } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import Loading from "@/app/components/ui/Loading";
import firebase_app from "@/app/firebase/config";
import getUserData from "@/app/firebase/firestore/getUserData";
import { authReducer, initialState } from "./reducer/auth.reducer";

const auth = getAuth(firebase_app);

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children
}) => {
	const [state, dispatch] = useReducer(authReducer, initialState);
	const [user, setUser] = useState(null);
	const [userInfo, setUserInfo] = useState(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				getUserData("users", user.uid).then((result) => {
					setUserInfo({...result, uid: user.uid});
					updateUserRequests(result.requests);
				});
				setUser(user);
			} else {
				setUser(null);
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	const onSignOut = async () => {
		setLoading(true);

		try {
			await signOut(auth);
			setLoading(false);
			setUserInfo(null);
			setUser(null);

			return router.push("/");
		} catch(error) {
			setLoading(false);
		}
	};

	const addARequestToUser = (request) => {
    const updatedRequestList = state.user.requests.concat(request);

    dispatch({
      type: "ADD_A_REQUEST_TO_USER",
      payload: {
        user: {
					requests: updatedRequestList
				}
      }
    });
  };

	const updateUserRequests = (requests) => {
		dispatch({
			type: "UPDATE_USER_REQUESTS",
			payload: {
				requests
			}
		})
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				userInfo,
				requests: state.user.requests,
				onSignOut,
				addARequestToUser,
			}}
		>
			{loading ? <Loading /> : children}
		</AuthContext.Provider>
	);
};
