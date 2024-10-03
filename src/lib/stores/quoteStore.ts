import { writable } from 'svelte/store';

export interface Quote {
  id: number;
  text: string;
  author: string;
}

// Create an in-memory database of quotes for now (will fetch from api later or use db directly)
const initialQuotes: Quote[] = [
  { id: 1, text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
  { id: 2, text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
];

const quoteStore = writable<Quote[]>(initialQuotes);


export default quoteStore;
