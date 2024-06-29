import { useRef, useEffect } from 'react';
import p5 from 'p5';
import axios from 'axios';


/**
 * Functional component representing a canvas drawing area using p5.js.
 * Handles drawing actions and posting them to a server.
 * 
 * @param {Object} props - Props object containing actions and color.
 */
function Canvas({ actions, color }) {
  const containerRef = useRef(null);
  const p5InstanceRef = useRef(null);

  /**
   * p5.js sketch function defining setup and draw behavior.
   * 
   * @param {p5} p - p5.js instance passed by p5.js library.
   */
  const sketch = (p) => {
    p.setup = () => {
      p.createCanvas(700, 410);
    };

    p.draw = () => {
      if (p.mouseIsPressed) {
        const action = { type: 'draw', x: p.mouseX, y: p.mouseY, color };
        axios.post('http://localhost:8080/mouse-movements', action)
          .then(response => {
            console.log('Action posted:', response.data);
          })
          .catch(error => {
            console.error('Error posting action:', error);
          });
        drawAction(p, action);
      }
    };
  };

  /**
   * Draws an action (ellipse) on the canvas using p5.js functions.
   * 
   * @param {p5} p - p5.js instance passed by p5.js library.
   * @param {Object} action - Action object containing coordinates and color.
   */
  const drawAction = (p, action) => {
    p.fill(action.color);
    p.ellipse(action.x, action.y, 20, 20);
  };

  /**
   * Effect hook to initialize and cleanup p5.js instance.
   */
  useEffect(() => {
    if (containerRef.current) {
      p5InstanceRef.current = new p5(sketch, containerRef.current);
    }
    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
      }
    };
  }, [containerRef]);

  /**
   * Effect hook to redraw canvas when actions array changes.
   */
  useEffect(() => {
    if (p5InstanceRef.current) {
      p5InstanceRef.current.clear();
      actions.forEach(action => drawAction(p5InstanceRef.current, action));
    }
  }, [actions]);

  return <div ref={containerRef} id="container"></div>;
}

export default Canvas;
