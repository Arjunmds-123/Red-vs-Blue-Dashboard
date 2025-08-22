import { useSearchParams } from 'react-router-dom';
import './App.css';
import { HeaderComponent } from './components/HeaderComponent';
import { useStore } from './store/state';
import React, { useEffect } from 'react';
import { RealTimeUpdates } from './service/RealTimeUpdates';
import { Scoreboard } from './components/Scoreboard';
import { TeamFilter } from './components/TeamFilter';
import { UserList } from './components/UserList';
import { DrillDown } from './components/DrillDown';

function App() {
  const { state, dispatch } = useStore();
  const [params] = useSearchParams();

  useEffect(() => {
    const t = params.get('team') || 'all';
    if (['all', 'red', 'blue'].includes(t)) {
      dispatch({ type: 'SET_FILTER', filter: t });
    }
  }, []);// will run on first render only
  
  useEffect(() => { 
    const rt = new RealTimeUpdates({
      onTick: (payload) => {
        dispatch({ type: 'REALTIME_TICK', payload });
      }
    });
    rt.start();
    return () => {
      rt.stop();
    }
  }, [dispatch]);
  // This will set up the real-time updates and clean them up on unmount
  return (
    <div className="shell">
      <HeaderComponent />
      <main className='content'>
        <div className='topBar'>
          <Scoreboard />
          <TeamFilter />
        </div>
        <UserList />
      </main>
      {state.selectedUserId && <DrillDown />}
    </div>
  );
}

export default App;
