import { useContext, createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	updateProfile
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { auth, storage, db } from '../firebase-config';

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

const defaultPhoto = 'https://firebasestorage.googleapis.com/v0/b/chat-app-47429.appspot.com/o/unknown-user.png?alt=media&token=47769aaa-233b-4de0-9c77-e7364cf1267e';


export const AuthContextProvider = ({ children }) => {
	const navigate = useNavigate();
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(true);

	const register = async (displayName, email, password, file) => {
		try {
			const res = await createUserWithEmailAndPassword(auth, email, password);
			let url = null;
			if (file){
				const storageRef = ref(storage, `images/${displayName + uuid()}.jpg`);
				const snapshot = await uploadBytes(storageRef, file);
				url = await getDownloadURL(snapshot.ref);
			}	

			await updateProfile(res.user, {
				displayName,
				photoURL: url || defaultPhoto,
			});

			await setDoc(doc(db, 'users', res.user.uid), {
				uid: res.user.uid,
				displayName, 
				email, 
				photoURL: url || defaultPhoto,
			})

			await setDoc(doc(db, 'userChats', res.user.uid),{})

			setUser(auth.currentUser);
			navigate('/', { replace: true });
		} catch (err) {
			console.log(err);
		}
	};

	const login = async (email, password) => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
			setUser(auth.currentUser);
			navigate('/', { replace: true });
		} catch (err) {
			console.log(err);
		}
	};

	const logout = async ()=>{
		await signOut(auth);
		setUser(null);
		navigate('/login', {replace: true});
	};

	useEffect(() => {
		const sub = onAuthStateChanged(auth, (currentUser) =>{
			setUser(currentUser)
			setLoading(false);
		});
		return ()=>sub();
	}, []);

	return (
		<AuthContext.Provider value={{ user, register, login, logout, loading }}>
			{children}
		</AuthContext.Provider>
	);
};
