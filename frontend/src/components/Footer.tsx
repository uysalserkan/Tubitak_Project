import React from "react";

function Footer() {
    const mySecret = <>0cb25f4eaea0190c98fe23736d8ea405cda2f78d15a0f1db15e4662ec45b27f8</>;
    return (
        <footer className="text-center bg-dark text-white border-bottom-0">
            <div className="text-center p-3">
                <i>© 2525 Copyright </i>
                <a className="text-white" href="https://github.com/uysalserkan" target="_blank" rel="noreferrer">Serkan UYSAL</a>
                <p style={{fontSize: "small", margin:"14px"} }>{mySecret}</p>
            </div>
        </footer>
    );
}

export default Footer