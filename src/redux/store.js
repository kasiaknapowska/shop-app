import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice"; //counterReducer, bo nazwa obojętna, i tak exportowaliśmy jako default
import changePriceReducer from "./changePriceSlice";
import changeCartReducer from "./changeCartSlice";
import logInReducer from "./logInSlice";
import userReducer from "./userSlice";

// import loggedInSlice from "./loggedIn";
// import favorite from "./favorite";

export const store = configureStore({
    reducer: {
        counter: counterReducer, 
        changePrice: changePriceReducer,
        changeCart: changeCartReducer,
        logIn: logInReducer,
        user: userReducer,
    }
})


//tutaj do reducerów dodajemy wszystkie reducery stworzone przez createSlice - z osobnych plików np. counter.js, logged.js


// w docelowych komponentach, które mają używać stanów globalnych robimy tak:

// import { useSelector, useDispatch } from 'react-redux';
// import { increment } from './counter';

// export default function MyComponent() {
//     const count = useSelector(state => state.counter.value);
//     const dispatch = useDispatch();
//     return (
//         <>
//         <h1>Count: {count}</h1>
//         <button onClick={() => dispatch(increment())}>Increment</button>
//         </>
//     )
// }