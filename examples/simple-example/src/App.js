import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { subScribeToStore, unSubScribeFromStore } from 'redux-store-subscribe';
import './App.css';
import { incrementCount1, incrementCount2 } from './slice';

function App() {
  const {count1, count2} = useSelector(state => state.exampleReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const id1 = subScribeToStore("exampleReducer.count1", ({prevValue, nextValue}) => {
      alert(`count1 changed from ${prevValue} to ${nextValue}`);
    })

    const id2 = subScribeToStore("exampleReducer.count2", ({prevValue, nextValue}) => {
      alert(`count2 changed from ${prevValue} to ${nextValue}`);
    })

    return () => {
      unSubScribeFromStore(id1);
      unSubScribeFromStore(id2);
    }
  }, [])

  return (
    <div className="App">
      <button onClick={() => dispatch(incrementCount1())}>Count 1: {count1}</button>
      <button onClick={() => dispatch(incrementCount2())}>Count 2: {count2}</button>
    </div>
  );
}

export default App;
