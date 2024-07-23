import { addDoc, collection, doc, getDoc, getDocs, updateDoc,deleteDoc } from "firebase/firestore";
import { db } from "./Firebase";
import { Videojuego } from "@/Interfaces/IVideojuegos";

// Registrar un nuevo videojuego
export const registrarVideojuego = async (videojuego: Videojuego) => {
    try {
        await addDoc(collection(db, "videojuegos"), videojuego);
        console.log("Videojuego registrado exitosamente");
    } catch (error) {
        console.error("Error al registrar el videojuego:", error);
        throw new Error("Error al registrar el videojuego");
    }
}

// Obtener todos los videojuegos
export const obtenerVideojuegos = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "videojuegos"));
        let videojuegos: Videojuego[] = [];
        querySnapshot.forEach((doc) => {
            let videojuego: Videojuego = {
                nombre: doc.data().nombre,
                compania: doc.data().compania,
                copias: doc.data().copias,
                fecha: doc.data().fecha,
                key: doc.id
            };
            videojuegos.push(videojuego);
        });
        return videojuegos;
    } catch (error) {
        console.error("Error al obtener los videojuegos:", error);
        throw new Error("Error al obtener los videojuegos");
    }
}

// Obtener un videojuego específico por su ID
export const obtenerVideojuego = async (key: string) => {
    try {
        const docRef = doc(db, "videojuegos", key);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            let videojuego: Videojuego = {
                nombre: docSnap.data().nombre,
                compania: docSnap.data().compania,
                copias: docSnap.data().copias,
                fecha: docSnap.data().fecha,
                key: docSnap.id
            };
            return videojuego;
        } else {
            console.log("No se encontró el videojuego con ID:", key);
            return undefined;
        }
    } catch (error) {
        console.error("Error al obtener el videojuego:", error);
        throw new Error("Error al obtener el videojuego");
    }
}

// Actualizar un videojuego existente
export const actualizarVideojuego = async (videojuego: Videojuego) => {
    try {
        if (!videojuego.key) {
            throw new Error("El ID del videojuego es necesario para actualizar");
        }
        const ref = doc(db, "videojuegos", videojuego.key);
        await updateDoc(ref, { ...videojuego });
        console.log("Videojuego actualizado exitosamente");
    } catch (error) {
        console.error("Error al actualizar el videojuego:", error);
        throw new Error("Error al actualizar el videojuego");
    }
}
export const eliminarVideojuego = async (key: string) => {
    const docRef = doc(db, "videojuegos", key);
    await deleteDoc(docRef);
}