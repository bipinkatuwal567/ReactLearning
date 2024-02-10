import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false,
    wrongCredential: ""
}

function reducer(state, action){
    switch(action.type){
        case 'login':
            return{
                ...state, 
                user: action.payload,
                isAuthenticated: true
            }
        case 'logout':
            return{
                ...state,
                user: null,
                isAuthenticated: false
            }
        case 'wrong':
            return{
                ...state,
                wrongCredential: "Please input your credential correctly!"
            }
        default:
            throw new Error("Unknown action type");
    }
}

function AuthProvider({children}){
    const FAKE_USER = {
        name: "Jack",
        email: "jack@example.com",
        password: "qwerty",
        avatar: "https://i.pravatar.cc/100?u=zz",
      };

    const [{user, isAuthenticated, wrongCredential}, dispatch] = useReducer(reducer, initialState);

    function login(email, password){
        if(email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({type: "login", payload: FAKE_USER})
        }else{
            dispatch({type: "wrong"})
        }
    }

    function logout(){
        dispatch({type: "logout"})
    }

    return(
        <AuthContext.Provider
        value={{
            user,
            isAuthenticated,
            wrongCredential,
            login,
            logout
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext);
    if(context === undefined) throw new Error("AuthContext was use outside AuthProvider");

    return context;
}

export {useAuth, AuthProvider}