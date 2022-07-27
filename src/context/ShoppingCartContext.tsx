import { createContext, ReactNode, useContext, useState } from "react";

type ShoppingCartProviderProps = {
  children: ReactNode
}

type ShoppingCartContext = {
  getItemQuantity: (id: number) => number
  increaseCartQuantity: (id: number) => void
  decreaseCartQuantity: (id: number) => void
  removeQuantity: (id: number) => void
}

type CartItem = {
  id: number
  quantity: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  function getItemQuantity(id: number) {
    return cartItems.find(item => item.id === id)?.quantity || 0
  }

  function increaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if(currItems.find(item => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }]
      }
    })
  }
  return (
    <ShoppingCartContext.Provider value={{ getItemQuantity }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}
