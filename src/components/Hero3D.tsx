import { useEffect, useRef } from "react";

const Hero3D = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Animation variables
    let time = 0;
    const warehouseObjects: Array<{
      x: number;
      y: number;
      z: number;
      rotX: number;
      rotY: number;
      size: number;
      type: 'box' | 'truck' | 'worker' | 'forklift' | 'shelf';
      color: string;
      speed: number;
    }> = [];

    // Create warehouse scene objects
    // Boxes/packages
    for (let i = 0; i < 8; i++) {
      warehouseObjects.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        z: Math.random() * 100,
        rotX: Math.random() * Math.PI,
        rotY: Math.random() * Math.PI,
        size: 15 + Math.random() * 25,
        type: 'box',
        color: `hsl(${Math.random() > 0.5 ? "210" : "25"}, 70%, 60%)`,
        speed: 0.5 + Math.random() * 0.5
      });
    }

    // Trucks
    for (let i = 0; i < 3; i++) {
      warehouseObjects.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        z: Math.random() * 50,
        rotX: 0,
        rotY: Math.random() * Math.PI,
        size: 40 + Math.random() * 20,
        type: 'truck',
        color: 'hsl(0, 0%, 30%)',
        speed: 0.2 + Math.random() * 0.3
      });
    }

    // Workers
    for (let i = 0; i < 4; i++) {
      warehouseObjects.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        z: Math.random() * 30,
        rotX: 0,
        rotY: Math.random() * Math.PI,
        size: 8 + Math.random() * 6,
        type: 'worker',
        color: 'hsl(35, 80%, 50%)',
        speed: 1 + Math.random() * 1
      });
    }

    // Forklifts
    for (let i = 0; i < 2; i++) {
      warehouseObjects.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        z: Math.random() * 40,
        rotX: 0,
        rotY: Math.random() * Math.PI,
        size: 20 + Math.random() * 10,
        type: 'forklift',
        color: 'hsl(45, 100%, 50%)',
        speed: 0.8 + Math.random() * 0.4
      });
    }

    // Shelves
    for (let i = 0; i < 5; i++) {
      warehouseObjects.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        z: Math.random() * 60,
        rotX: 0,
        rotY: Math.random() * Math.PI,
        size: 30 + Math.random() * 20,
        type: 'shelf',
        color: 'hsl(210, 30%, 40%)',
        speed: 0.1 + Math.random() * 0.2
      });
    }

    // Draw warehouse objects
    const drawWarehouseObject = (obj: any) => {
      ctx.save();
      ctx.translate(obj.x, obj.y);

      const cos = Math.cos(obj.rotY);
      const sin = Math.sin(obj.rotY);

      switch (obj.type) {
        case 'box':
          // Draw 3D box
          ctx.fillStyle = obj.color;
          ctx.fillRect(-obj.size / 2, -obj.size / 2, obj.size, obj.size);
          
          // Top face (lighter)
          ctx.fillStyle = obj.color.replace("60%", "70%");
          ctx.beginPath();
          ctx.moveTo(-obj.size / 2, -obj.size / 2);
          ctx.lineTo(-obj.size / 2 + obj.size * cos * 0.3, -obj.size / 2 - obj.size * sin * 0.3);
          ctx.lineTo(obj.size / 2 + obj.size * cos * 0.3, -obj.size / 2 - obj.size * sin * 0.3);
          ctx.lineTo(obj.size / 2, -obj.size / 2);
          ctx.closePath();
          ctx.fill();
          break;

        case 'truck':
          // Draw truck body
          ctx.fillStyle = obj.color;
          ctx.fillRect(-obj.size / 2, -obj.size / 3, obj.size, obj.size / 1.5);
          
          // Truck cab
          ctx.fillStyle = 'hsl(0, 0%, 25%)';
          ctx.fillRect(-obj.size / 2, -obj.size / 4, obj.size / 3, obj.size / 2);
          
          // Wheels
          ctx.fillStyle = 'hsl(0, 0%, 10%)';
          ctx.beginPath();
          ctx.arc(-obj.size / 4, obj.size / 3, obj.size / 8, 0, Math.PI * 2);
          ctx.arc(obj.size / 4, obj.size / 3, obj.size / 8, 0, Math.PI * 2);
          ctx.fill();
          break;

        case 'worker':
          // Draw worker (simple stick figure)
          ctx.strokeStyle = obj.color;
          ctx.lineWidth = 2;
          
          // Head
          ctx.beginPath();
          ctx.arc(0, -obj.size / 2, obj.size / 4, 0, Math.PI * 2);
          ctx.stroke();
          
          // Body
          ctx.beginPath();
          ctx.moveTo(0, -obj.size / 4);
          ctx.lineTo(0, obj.size / 4);
          ctx.stroke();
          
          // Arms and legs
          ctx.beginPath();
          ctx.moveTo(-obj.size / 3, 0);
          ctx.lineTo(obj.size / 3, 0);
          ctx.moveTo(-obj.size / 4, obj.size / 2);
          ctx.lineTo(0, obj.size / 4);
          ctx.lineTo(obj.size / 4, obj.size / 2);
          ctx.stroke();
          break;

        case 'forklift':
          // Draw forklift
          ctx.fillStyle = obj.color;
          ctx.fillRect(-obj.size / 2, -obj.size / 3, obj.size, obj.size / 1.5);
          
          // Forklift mast
          ctx.fillStyle = 'hsl(0, 0%, 30%)';
          ctx.fillRect(-obj.size / 6, -obj.size, obj.size / 8, obj.size);
          
          // Forks
          ctx.fillStyle = 'hsl(0, 0%, 20%)';
          ctx.fillRect(-obj.size / 4, -obj.size / 2, obj.size / 2, obj.size / 10);
          break;

        case 'shelf':
          // Draw warehouse shelf
          ctx.fillStyle = obj.color;
          
          // Shelf levels
          for (let i = 0; i < 3; i++) {
            const levelY = -obj.size / 2 + (i * obj.size / 3);
            ctx.fillRect(-obj.size / 2, levelY, obj.size, obj.size / 12);
          }
          
          // Vertical supports
          ctx.fillRect(-obj.size / 2, -obj.size / 2, obj.size / 12, obj.size);
          ctx.fillRect(obj.size / 2 - obj.size / 12, -obj.size / 2, obj.size / 12, obj.size);
          break;
      }

      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.offsetHeight);
      gradient.addColorStop(0, "hsl(210, 20%, 98%)");
      gradient.addColorStop(1, "hsl(210, 15%, 95%)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Animate warehouse objects
      warehouseObjects.forEach((obj) => {
        obj.rotX += 0.005 * obj.speed;
        obj.rotY += 0.01 * obj.speed;
        
        // Different movement patterns for different objects
        switch (obj.type) {
          case 'box':
            obj.y += Math.sin(time * 0.001 + obj.x * 0.01) * obj.speed;
            break;
          case 'truck':
            obj.x += obj.speed * 0.5;
            if (obj.x > canvas.offsetWidth + obj.size) {
              obj.x = -obj.size;
            }
            break;
          case 'worker':
            obj.x += Math.sin(time * 0.002) * obj.speed;
            obj.y += Math.cos(time * 0.002) * obj.speed * 0.5;
            break;
          case 'forklift':
            obj.y += Math.sin(time * 0.0015 + obj.x * 0.005) * obj.speed;
            break;
          case 'shelf':
            obj.y += Math.sin(time * 0.0005 + obj.x * 0.02) * obj.speed * 0.3;
            break;
        }

        // Reset position if out of bounds
        if (obj.y > canvas.offsetHeight + obj.size) {
          obj.y = -obj.size;
          obj.x = Math.random() * canvas.offsetWidth;
        }

        drawWarehouseObject(obj);
      });

      time += 16;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-20"
      style={{ pointerEvents: "none" }}
    />
  );
};

export default Hero3D;