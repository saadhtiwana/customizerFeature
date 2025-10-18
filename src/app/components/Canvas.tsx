'use client';
import { useRef, useEffect, useState } from 'react';

interface Layer {
  id: string;
  src: string;
  visible: boolean;
  zIndex: number;
}

interface CanvasProps {
  width: number;
  height: number;
  layers: Layer[];
}

export default function Canvas({ width, height, layers }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Load and draw layers in order
    const loadPromises = layers
      .filter(layer => layer.visible)
      .sort((a, b) => a.zIndex - b.zIndex)
      .map(layer => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            ctx.drawImage(img, 0, 0, width, height);
            resolve();
          };
          img.onerror = () => resolve(); // Continue even if image fails
          img.src = layer.src;
        });
      });

    Promise.all(loadPromises).then(() => {
      setImagesLoaded(true);
    });
  }, [layers, width, height]);

  return (
    <div className="relative border border-gray-300 rounded-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="block"
      />
      {!imagesLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-gray-500">Loading layers...</div>
        </div>
      )}
    </div>
  );
}