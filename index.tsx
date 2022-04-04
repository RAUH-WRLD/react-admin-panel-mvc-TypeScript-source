import {StrictMode} from "react";
import {render} from "react-dom";
import Router from "./routes/Router";
import "./assets/styles/main.scss";
render(
    <StrictMode>
        <Router />
    </StrictMode>,
    document.getElementById("root"),
);
