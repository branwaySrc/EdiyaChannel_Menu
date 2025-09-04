"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

import { ProductOptionValueType } from "@/db/types";

export interface AddToCartItem {
	slug: string;
	productName: string;
	productPrice: number;
	quantity: number;
	temperature: "hot" | "ice" | "none"; // 선택된 온도 값
	size?: ProductOptionValueType; // 단일 선택 옵션
	addOptions?: ProductOptionValueType[]; // 복수 선택 옵션
}

interface CartContextType {
	cart: AddToCartItem[];
	addToCart: (item: AddToCartItem) => void;
	removeItem: (item: AddToCartItem) => void;
	updateQuantity: (item: AddToCartItem, quantity: number) => void;
}

interface CartProviderProps {
	children: ReactNode;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: CartProviderProps) {
	const [cart, setCart] = useState<AddToCartItem[]>([]);

	useEffect(() => {
		const storedCart = localStorage.getItem("cart");
		if (storedCart) setCart(JSON.parse(storedCart));
	}, []);

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart));
	}, [cart]);

	// ✅ addToCart: 옵션까지 포함해서 중복 체크
	const addToCart = (item: AddToCartItem) => {
		setCart(prevCart => {
			const existingItem = prevCart.find(
				cartItem =>
					cartItem.slug === item.slug &&
					cartItem.temperature === item.temperature &&
					cartItem.size?.optionName === item.size?.optionName &&
					JSON.stringify(cartItem.addOptions?.map(o => o.optionName) || []) === JSON.stringify(item.addOptions?.map(o => o.optionName) || [])
			);

			if (existingItem) {
				return prevCart.map(cartItem => (cartItem === existingItem ? { ...cartItem, quantity: cartItem.quantity + item.quantity } : cartItem));
			}

			return [...prevCart, { ...item }];
		});
	};

	const removeItem = (item: AddToCartItem) => {
		setCart(prevCart =>
			prevCart.filter(
				cartItem =>
					!(
						cartItem.slug === item.slug &&
						cartItem.temperature === item.temperature &&
						cartItem.size?.optionName === item.size?.optionName &&
						JSON.stringify(cartItem.addOptions?.map(o => o.optionName) || []) === JSON.stringify(item.addOptions?.map(o => o.optionName) || [])
					)
			)
		);
	};

	// ✅ updateQuantity
	const updateQuantity = (item: AddToCartItem, quantity: number) => {
		if (quantity <= 0) {
			removeItem(item);
			return;
		}
		setCart(prevCart =>
			prevCart.map(cartItem =>
				cartItem.slug === item.slug &&
				cartItem.temperature === item.temperature &&
				cartItem.size?.optionName === item.size?.optionName &&
				JSON.stringify(cartItem.addOptions?.map(o => o.optionName) || []) === JSON.stringify(item.addOptions?.map(o => o.optionName) || [])
					? { ...cartItem, quantity }
					: cartItem
			)
		);
	};

	return <CartContext.Provider value={{ cart, addToCart, removeItem, updateQuantity }}>{children}</CartContext.Provider>;
}

// ✅ useCart Hook
export function useCart() {
	const context = useContext(CartContext);
	if (!context) throw new Error("useCart must be used within a CartProvider");
	return context;
}
