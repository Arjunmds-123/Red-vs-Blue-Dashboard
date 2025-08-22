import React, { useEffect, useMemo, useRef } from "react";
import { useStore } from "../store/state";
// import { createPortal } from "react-dom";

export const DrillDown = () => { 
    const { state, dispatch } = useStore();
    const userId = state.selectedUserId;
    const user = useMemo(() => {
        return state.users.find(u => u.id === userId);
    }, [state.users, userId]);
    const items = state.activity[userId ?? ''] ?? [];

    const closeDrillDown = () => {
        dispatch({ type: 'SET_SELECTED_USER', userId: null });
    }

    const firstBtn = useRef(null);

    useEffect(() => {
        if (userId && firstBtn.current) {
            firstBtn.current.focus();
        }
    }, [userId])
    
    if (!userId || !user) return null;

    return (
        <aside className="drill" role="dialog" aria-label={`Drill down for ${user.name}`} aria-modal="true">
            <div className="drillHead">
                <h2 id="drill-title">{user.name}</h2>
                <button
                    className="close"
                    onClick={closeDrillDown}
                    aria-label="Close Drill Down">X</button>
            </div>
            <div className="drillMeta">
                <div><strong>Team:</strong>{user.team === 'red' ? "Red" : "Blue"}</div>
                <div><strong>Role:</strong>{user.role}</div>
                <div><strong>Score Contribution:</strong>{user.scoreContribution}</div>
            </div>
            <div className="drillList">
                {items.length === 0 ? (
                    <div className="empty">No activity recorded</div>)
                    : items.slice().reverse().map((item) => (
                        <div
                            key={item.id}
                            className="activity"
                            aria-label={`Reset activity for ${user.name}`}
                        >
                            <div className="when">{new Date(item.at).toLocaleDateString()}</div>
                            <div className="summary">{item.summary}</div>
                            <div className={`delta ${item.delta >= 0 ? "pos" : "neg"}`}>{item.delta >= 0 ? `+${item.delta}` : `-${item.delta}`}</div>
                        </div>
                    ))}
            </div>
            <div className="drillActions">
                <button ref={firstBtn} onClick={() => dispatch({ type: 'RESET_ACTIVITIES', userId: user.id })}>Clear history</button>
                <button onClick={closeDrillDown}>Close</button>
            </div>
        </aside>
    );
};