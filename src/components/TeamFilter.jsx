import React from "react";
import { useStore } from "../store/state";
import { useSearchParams } from "react-router-dom";

const options = [
    { value: 'all', label: 'All' },
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
];

export const TeamFilter = () => {
    const { state, dispatch } = useStore();
    const [params, setParams] = useSearchParams();
    const currentFilter = state.filter || 'all';

    function setFilter(value) {
        dispatch({ type: 'SET_FILTER', filter: value.toLowerCase() });
        const p = new URLSearchParams(params);
        if (value.toLowerCase() === 'all') {
            p.delete('team');
        } else {
            p.set('team', value.toLowerCase());
        }
        setParams(p, { replace: true });
    };

    return (
        <div className="filters">
            <div className="segmented" role="radiogroup" aria-label="Team Filter">
                {options.map(option => (
                    <button
                        key={option.value}
                        className={`segBtn ${currentFilter === option.value ? 'active' : ''}`}
                        onClick={() => setFilter(option.value)}
                        role="radio"
                        aria-checked={currentFilter === option.value}
                        aria-label={`Filter by ${option.label} team`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
            <label className="dropdown">
                <span className="sr-only">Team Filter</span>
                <select
                    value={currentFilter}
                    onChange={(e) => setFilter(e.target.value)}
                    aria-label="Select Team Filter"
                >
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
};