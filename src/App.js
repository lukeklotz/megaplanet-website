import './App.css';
import { createRoot } from 'react-dom/client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useState, useEffect, useRef } from 'react';

// Rotating Sphere component with responsive size and smooth rotation
function RotatingSphere() {
  const meshRef = useRef();
  const { camera } = useThree();
  
  useEffect(() => {
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call once on mount to adjust the camera aspect ratio

    return () => window.removeEventListener('resize', handleResize);
  }, [camera]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0011; // Rotate around Y-axis
      meshRef.current.rotation.x += 0.0001; // Slight rotation around X-axis
    }
  });

  // Get dynamic radius based on window width
  let radius = Math.max(.001, window.innerWidth / 900);
  
  if (radius < .7) {    //hacky way to check if we're on an iPhone....
    radius = Math.max(.001, window.innerWidth / 300);
  }

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[radius, 8, 8]} />
      <meshStandardMaterial color="black" wireframe />
    </mesh>
  );
}

// Rotating Box component (just for additional elements in your scene)
function RotatingBoxTop() {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001; // Rotate around Y-axis
      meshRef.current.rotation.x += 0.0001; // Slight rotation around X-axis
    }
  });

  return (
    <mesh ref={meshRef} position={[-13, 8, -10]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="red" wireframe />
    </mesh>
  );
}

// Rotating Box component at the bottom
function RotatingBoxBottom() {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001; // Rotate around Y-axis
      meshRef.current.rotation.x += 0.0001; // Slight rotation around X-axis
    }
  });

  return (
    <mesh ref={meshRef} position={[25, -15, -25]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="red" wireframe />
    </mesh>
  );
}

// Big Header Text Component
function BigText() {
  return (
    <header className="mega-planet">
      <h1>MEGAPLANET.COM</h1>
    </header>
  );
}

// Links to band pages
function Names() {
  return(
    <div className="names-container">
       <a href='https://kevinnagel.bandcamp.com/album/echoes-from-tomorrow'><h3>KEVIN NAGEL</h3></a>
       <a href='https://sweb16.bandcamp.com/'><h3>MARSH CRANE</h3></a>
       <a href="https://orchid81.bandcamp.com/"><h3>ORCHID81</h3></a>
       <a href='https://universalmagic.bandcamp.com/'><h3>MAGICDJ</h3></a>
       <a href='https://chucknessa.bandcamp.com/'><h3>CHUCKNESSA</h3></a>
       <a href='https://itsmoonside.bandcamp.com/'><h3>MOONSIDE</h3></a>
       <a href='https://kokio.bandcamp.com/album/mysticism-unmastered'><h3>KOKIO</h3></a>
       <a href='https://mltzr.bandcamp.com/'><h3>MLTZR</h3></a>
    </div>
  );
}

function App() {
  return (
    <div className="canvas-container">
      <BigText />
      <Names />
      <Canvas>
        <ambientLight intensity={1.0} />
        <pointLight position={[2, 5, 5]} />
        <RotatingSphere />
      </Canvas>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);

export default App;
