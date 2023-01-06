import { render } from "preact";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faUser,
    faUsers,
    faSearch,
    faTimes,
    faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import "./index.scss";
import App from "./App";
import "./extensions/Date";

if (import.meta.env.MODE === "development") {
    import("preact/debug");
}

library.add({
    faUser,
    faUsers,
    faSearch,
    faTimes,
    faPaperPlane,
});

render(<App />, document.body);
