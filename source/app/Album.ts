import "../style/album.css";

export class Album {

    private _initLink() {

        const linkList = this.querySelectorAll("a.js-link");

        const register = (link: HTMLLinkElement, href: Url) => {
            link.addEventListener('click', (event: Event) => {
                event.preventDefault();
                this.goToUrl(href);
            }, false);
        }

        for (let i = 0; i < linkList.length; i++) {
            const link = <HTMLLinkElement>linkList[i];
            const href: Url = link.getAttribute("href") || "";
            register(link, href);
        }
    }

    constructor() {
        console.log("> Klasa bazowa 'Album'");
        this._initLink();
    }

    public querySelectorAll(selector: string): NodeListOf<Element> {
        return window.document.querySelectorAll(selector);
    }

    public goToUrl(url: Url) {
        let ext: string;

        // @if MIN=2
        ext = ".min.html";
        // @endif

        // @if MIN!=2
        ext = ".html";
        // @endif

        const origin: Url = window.location.origin;
        window.location.href = `${origin}/${url}${ext}`;
    }
}