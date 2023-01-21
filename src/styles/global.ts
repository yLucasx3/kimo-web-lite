import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

html,
body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
        Helvetica Neue, sans-serif;
}

a {
    color: inherit;
    text-decoration: none;
}

* {
    box-sizing: border-box;
    outline: none;
    font-family: 'Raleway', sans-serif;
}

/* width */
::-webkit-scrollbar {
    height: 10px;
    width: 10px !important;
}

/* Track */
::-webkit-scrollbar-track {
    background: #f1f1f1 !important;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #888 !important;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555 !important;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type='number'] {
    -moz-appearance: textfield;
}

body {
    margin: 0;
    /* font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif; */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: 'Inter', sans-serif;
    /* background-color: black; */
}

#main-load {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 9999999999;
}

.loading {
    display: flex;
    flex-direction: row;
}

.loading-letter {
    font-size: 60px;
    font-weight: normal;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: white;
    animation-name: bounce;
    animation-duration: 2s;
    animation-iteration-count: infinite;
}

.loading-letter:nth-child(2) {
    animation-delay: 0.1s;
}
.loading-letter:nth-child(3) {
    animation-delay: 0.2s;
}
.loading-letter:nth-child(4) {
    animation-delay: 0.3s;
}
.loading-letter:nth-child(5) {
    animation-delay: 0.4s;
}
.loading-letter:nth-child(6) {
    animation-delay: 0.5s;
}
.loading-letter:nth-child(7) {
    animation-delay: 0.6s;
}

@keyframes bounce {
    0% {
        transform: translateY(0px);
    }
    40% {
        transform: translateY(-40px);
    }
    80%,
    100% {
        transform: translateY(0px);
    }
}

code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
}

/* Classes for the displayed toast */
.Toastify__toast {
    background-color: white !important;
    border: 3px solid black;
    border-radius: 0px !important;
    box-shadow: 12px 12px black !important;
}

.Toastify__toast-body div {
    letter-spacing: 2px;
    text-align: center;
    font-weight: 600;
    color: black;
}
/* Used to define container behavior: width, position: fixed etc... */
.Toastify__toast-container {
    width: 500px;
}
`;
