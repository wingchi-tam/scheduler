import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDeY-KCix2iA0v5E0rLE6MfZLrKGgGIOQU",
    authDomain: "garphy-firebase-hosting-demo.firebaseapp.com",
    databaseURL: "https://garphy-firebase-hosting-demo-default-rtdb.firebaseio.com",
    projectId: "garphy-firebase-hosting-demo",
    storageBucket: "garphy-firebase-hosting-demo.appspot.com",
    messagingSenderId: "329411425495",
    appId: "1:329411425495:web:739064bc89455d0e4cec92",
    measurementId: "G-5QJVNT0NZF"
  };

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };