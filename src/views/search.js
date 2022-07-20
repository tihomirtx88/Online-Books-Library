import { searchBooks } from "../api/data.js";
import { html } from "../lib.js";
import {bookCardTemplate} from "./common.js"

const searchTemplate = (books, onSearch,params = ``) => html`
   <section id="search-page" class="dashboard">
        <form @submit=${onSearch} class="d-flex">
            <input class="form-control me-2" type="search" name="search" placeholder="Search" aria-label="Search" .value=${params}>
            <button class="btn btn-outline-success" type="submit">Search</button>
     </form>
     ${books.length == 0 
              ? html`<p class="no-books">No results!</p>`
              : html`<ul class="other-books-list">
                ${books.map(bookCardTemplate)}
            </ul>`
              }
   </section>  
`;

/*<section id="search-page" class="dashboard">
            <h1>Search</h1>
            <form @submit=${onSearch}>
                <input type="text" name="search" .value=${params}>
                <input type="submit" value="Search">
            </form>
            ${books.length == 0 
              ? html`<p class="no-books">No results!</p>`
              : html`<ul class="other-books-list">
                ${books.map(bookCardTemplate)}
            </ul>`
              }
        </section> */


export async function searchPage(ctx){
    //Second step 
    const params = ctx.querystring.split(`=`)[1];
    //Tirth step
    let books = [];
    if (params) {
        books = await searchBooks(decodeURIComponent(params));
    }
    
    ctx.render(searchTemplate(books,onSearch,params));

    function onSearch(ev){
        //First step 
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const search = formData.get(`search`);

        if (search) {
            ctx.page.redirect(`/search?query=` + encodeURIComponent(search));
        }
    }
}