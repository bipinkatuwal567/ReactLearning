import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
    fullName : "",
    nationalId: "",
    createdAt: ""
}

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
        return{
            ...state,
            balance: state.balance + action.payload
        }
    case "account/withdraw":
        return{
            ...state,
            balance: state.balance - action.payload
        }
    case "account/requestLoan":
        if(state.loan > 0) return state;
        return{
            ...state,
            loan: action.payload.amount,
            loanPurpose: action.payload.purpose,
            balance: state.balance + action.payload.amount,
        } 
    case "account/payLoan":
        return{
            ...state,
            loan: 0,
            loanPurpose: "",
            balance: state.balance - state.loan
        }
    default: 
        return state;
  }
}

function customerReducer(state = initialStateCustomer, action){
    switch(action.type){
        case 'customer/createCustomer':
            return{
                ...state,
                fullName: action.payload.fullName,
                nationalId: action.payload.nationalId,
                createdAt: action.payload.createdAt
            }
        case 'customer/updateName':
            return{
                ...state,
                fullName: action.payload
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer
});
const store = createStore(rootReducer);

// store.dispatch({type: "account/deposit", payload: 500});
// console.log(store.getState());
// store.dispatch({type: "account/withdraw", payload: 200})
// console.log(store.getState());
// store.dispatch({type: "account/requestLoan", payload: {
//     amount: 1000,
//     purpose: "Buy a car"
// }})
// console.log(store.getState());
// store.dispatch({type: "account/payLoan"})
// console.log(store.getState());


/* Functions for account */
function deposit(amount){
    return{
        type: "account/deposit",
        payload: amount,
    }
}

function withdraw(amount){
    return{
        type: "account/withdraw",
        payload: amount
    }
}

function requestLoan(amount, purpose){
    return{
        type: "account/requestLoan",
        payload: {
            amount,
            purpose
        }
    }
}

function payLoan(){
    return{type: "account/payLoan"}
}

// store.dispatch(deposit(1500));
// console.log(store.getState());

// store.dispatch(withdraw(600));
// console.log(store.getState());

// store.dispatch(requestLoan(5000, "To buy a cheap car"));
// console.log(store.getState());

// store.dispatch(payLoan());
// console.log(store.getState());


/* Function for customer */
function createCustomer(fullName, nationalId){
    return{
        type: "customer/createCustomer",
        payload: {
            fullName,
            nationalId,
            createdAt: new Date().toISOString()
        },
    };
}

function updateName(fullName){
    return{
        type: "customer/updateName",
        payload: fullName
    }
}

store.dispatch(createCustomer("Bipin katuwal", "1243453"));
console.log(store.getState());






