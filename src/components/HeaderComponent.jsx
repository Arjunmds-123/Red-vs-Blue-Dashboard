import React from "react";
import { ConnectionStatus } from "./ConnectionStatus";

export const HeaderComponent = () => { 
    return (
        <header className="hdr">
            <div className="brand">
                <div className="brandtext">
                    <strong>Red V/S Blue</strong>
                </div>
            </div>
            <ConnectionStatus />
        </header>
    );
};