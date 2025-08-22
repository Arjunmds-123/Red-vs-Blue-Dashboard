import React from 'react';
import { useStore } from '../store/state';

export const ConnectionStatus = () => {
  const { state } = useStore();
  const { status, lastHeartbeat } = state.connection;

  return (
      <div className={`conn ${status}`}>
          <span className="dot"></span>
      <span className="value">{status.toUpperCase()}</span>
      {lastHeartbeat && (
        <time className="heartbeat" dateTime={new Date(lastHeartbeat).toISOString()}>
          {new Date(lastHeartbeat).toLocaleTimeString()}
        </time>
      )}
    </div>
  );
};
