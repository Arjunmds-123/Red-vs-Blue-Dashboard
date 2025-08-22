import React from "react";
import { useStore } from "../store/state";

export const Scoreboard = () => { 
    const { state } = useStore();
    return (
        <section className="scoreboard" aria-label="Team Scores">
            <div className="score red" aria-label="Red Team Score">
                <span className="team">Red</span>
                <span className="value">{state.scores.red}</span>
            </div>
            <div className="vs" aria-hidden>vs</div>
            <div className="score blue" aria-label="Blue Team Score">
                <span className="team">Blue</span>
                <span className="value">{state.scores.blue}</span>
            </div>
        </section>
    );
};