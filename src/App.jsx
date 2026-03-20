import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Prepare environment for scroll-based animations by registering ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function App() {
  const mountRef = useRef(null);

  useEffect(() => {
    // Basic Three.js setup to verify it works (Test Scene)
    const scene = new THREE.Scene();
    // Using a fixed small resolution for the test scene instead of full screen
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    // Set size to match container
    renderer.setSize(300, 300);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Add a simple wireframe cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 2.5;

    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup phase
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center pt-10 pb-20">
      {/* 
        Temporary Test page to confirm all libraries are working.
        Development of the actual UI, design, and sections will happen later.
      */}
      
      {/* Test Framer Motion */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold text-emerald-400 mb-2">Environment Preparation Complete</h1>
        <p className="text-neutral-400">React + Tailwind v4 + GSAP + Framer Motion + Three.js</p>
      </motion.div>

      {/* Test Three.js Scene */}
      <div className="mt-6 flex flex-col items-center">
        <p className="text-sm text-neutral-500 mb-4 tracking-wide uppercase">Three.js Test Scene</p>
        <div 
          ref={mountRef} 
          className="w-[300px] h-[300px] border border-neutral-700/50 rounded-xl bg-neutral-800 shadow-xl overflow-hidden"
        />
      </div>
      
    </div>
  );
}

export default App;
