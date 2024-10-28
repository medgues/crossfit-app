import { useEffect } from "react";
import "./App.css";
import AppRouter from "./components/Router";
import { db } from "./firebase";
import { addDoc, collection, getDocs } from "firebase/firestore/lite";

interface User {
  id: string;
  name: string;
  age: number;
  // Add other fields as necessary
}

const App = () => {
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as User[];
        console.log("userData", userData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  console.log("App");

  return <AppRouter />;
};

export default App;
