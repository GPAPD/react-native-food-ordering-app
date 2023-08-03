import { createContext, useState } from "react";

export const CartItemsContext = createContext({
    ids:[],
    addToCart:(id) => {},
    removeItemFromCart:(id) =>{},
});

function CartItemsContextProvider({children}){
    const [cartItemIds, setCartItemIds] = useState([]);

    function addToCart(id){
        setCartItemIds((currentItemsIds)=> [...currentItemsIds,id]);
    }

    function removeItemFromCart(id){
        setCartItemIds((currentItemsIds) =>
        currentItemsIds.filter((itemId) => itemId !== id)
    );
    }

    const value = {
        ids: cartItemIds,
        addToCart:addToCart,
        removeItemFromCart:removeItemFromCart,

    };

    return(
        <CartItemsContext.Provider value={value} >
            {children}
        </CartItemsContext.Provider>
    );
}
export default CartItemsContextProvider;