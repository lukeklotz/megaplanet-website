import './App.css';
import { createRoot } from 'react-dom/client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { artists } from './links.js'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ArtistsPage } from './artistsPage.js';
import { AboutPage } from './aboutPage.js';
import { MixPage } from './mixPage.js'
import { Header } from './components.js'

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
  let radius = Math.max(.001, window.innerWidth / 600);
  
  if (radius < .9) {    //hacky way to check if we're on an iPhone....
    radius = Math.max(.001, window.innerWidth / 100);
  }

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[radius, 8, 8]} />
      <meshStandardMaterial color="black" wireframe />
    </mesh>
  );
}

// Big Header Text Component
function BigText() {
  return (
    <header className="mega-planet">
      <h1>MEGAPLANET.WORLD</h1>
    </header>
  );
}

// Links to band pages
function Names({artists}) {
  return(
    <div className="names-container">
      {artists.map((artist, index) => (
        <a key={index} href={artist.url}>
          <h3>{artist.name}</h3>
        </a>
    ))}
</div>
  );
}

function Home() {
  return (
    <div className="canvas-container">
      <Header />
      <BigText />
      <Names artists={artists} />
      <Canvas>
        <ambientLight intensity={1.0} />
        <pointLight position={[2, 5, 5]} />
        <RotatingSphere />
      </Canvas>
    </div>
  )
}

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/mega-planet-site" element={<Home />} />
          <Route path="/artists" element={<ArtistsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/mixes" element={<MixPage />} />
        </Routes>
    </Router>
  );
}

createRoot(document.getElementById('root')).render(<App />);

export default App;
