import React, {createContext, useReducer} from 'react';
import reducer, {initialState} from "../reducer/reducer";
export const ShopContext = createContext();
const ShopProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {carts, account} = state;
    return (
        <ShopContext.Provider value={{carts, account, dispatch}}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopProvider;