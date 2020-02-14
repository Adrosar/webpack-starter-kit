declare var __webpack_public_path__: string;

/**
 * Funkcja ustawia ścieżkę _(lokalizację)_ dla modułów ładowanych poprzez składnię:
 *
 * ```javascript
 * import('./foo').then((_module)=>{ console.log(_module) });
 * ```
 * 
 * _( Więcej informacji tutaj → https://webpack.js.org/guides/code-splitting/ )_
 * 
 * Ścieżka jest pobierana z atrybutu **data-wpp** dla tagu o podanym **id**.
 * Najlepiej dodać atrybuty: **id** i **data-wpp** w tagu `<script>` który dołącza plik JavaScript z aplikacją, np:
 * 
 * ```html
 * <script type="text/javascript" src="app.js" id="App" data-wpp="//domain.com/js"></script>
 * ```
 * 
 * @param id - Unikalny identyfikator tagu HTML.
 */
export default function initPublicPath(id: string): void {
    if (__webpack_public_path__ === "") {
        const script: HTMLElement | null = document.getElementById(id);

        if (script) {
            const path: string | null = script.getAttribute('data-wpp');

            if (path && (typeof __webpack_public_path__ === 'string')) {
                __webpack_public_path__ = path;
            }
        }
    }
}