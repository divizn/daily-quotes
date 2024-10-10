import { QUOTE_API } from '$env/static/private';

export interface Quote {
    id: number;
    text: string;
    author: string;
  }
  
const api = QUOTE_API || "http://api.quotable.io/random?tags=wisdom";

const Dquote: Quote = { 
  id: 0, 
  text: "The only limit to our realization of tomorrow is our doubts of today.", 
  author: "Franklin D. Roosevelt" }

export async function load({ fetch }) {
  let quote: Quote;
  try {
    const res = await fetch(api);
    if (!res.ok) {
      throw new Error("API request failed");
    }
    const data = await res.json();
    quote = {id: data._id, text: data.content, author: data.author};
    console.log("Quote fetched from API: ", quote);
    return quote as Quote;
  }
  catch (err) {
    console.log("Error fetching quote from API: ", err);
    quote = Dquote;
    return quote as Quote;
  }
}
