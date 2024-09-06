import { Pokemon } from "@prisma/client";
import { create } from "zustand";

export type ModalType = "createModal" | "deleteModal" | "editModal";

interface ModalStore {
    type: ModalType | null;
    isOpen: boolean;
    pokemonId: string | null;
    pokemon: Pokemon | null;
    onOpen: (type: ModalType, pokemonId?: string, pokemon?: Pokemon) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    isOpen: false,
    pokemonId: null,
    pokemon: null,
    onOpen: (type, pokemonId, pokemon) => set({ type, isOpen: true, pokemonId, pokemon }),
    onClose: () => set({ type: null, isOpen: false, pokemonId: null, pokemon: null }),
}));