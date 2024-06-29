import { useState } from 'react';
import Canvas from './Canvas';
import ActionFetcher from './ActionFetcher';

/**
 * Functional component representing the main application.
 * Manages state for actions and color using React hooks.
 */
function App() {
  // State hooks for managing actions and color
  const [actions, setActions] = useState([]);
  const [color, setColor] = useState(getRandomColor());

  return (
    <div>
      <ActionFetcher setActions={setActions} />
      <Canvas actions={actions} color={color} />
    </div>
  );
}

// Function to generate a random color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default App;
