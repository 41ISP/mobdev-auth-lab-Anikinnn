import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { api } from "../api/api"

export const useItemsStore = create(
persist((set) => ( 
    {
        items: [],
        getItems: async () => 
            { 
            try{
                const res = await api.getItems()
                set({ items: res})
                } catch (error) {
                    console.error(error)
                }
            },
            addItem: (item) => set((state) => ({ items: [...state.items, item] })),
    }), 
    {
        name: 'items-store',
        storage: createJSONStorage(() => localStorage),
    }),
)
