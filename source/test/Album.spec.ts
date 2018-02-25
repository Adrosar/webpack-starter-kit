import { Album } from "../app/Album";

if (typeof Album !== "function") {
    throw new Error();
}

const album = new Album();

if (typeof album !== "object") {
    throw new Error();
}

if (typeof album.goToUrl !== "function") {
    throw new Error();
}

if (typeof album.querySelectorAll !== "function") {
    throw new Error();
}