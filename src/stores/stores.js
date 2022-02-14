import { writable } from "svelte/store"

const settingsChange = writable({})

export const storedSettingsChange = {
    subscribe: settingsChange.subscribe,
    set: val => {
    console.log(`🚀 ~ file: stores.js ~ line 8 ~ val`, val)
        settingsChange.set(val);
        localStorage.setItem("settingsChange", JSON.stringify(val));
    }
};

