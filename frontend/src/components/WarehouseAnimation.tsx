import { useEffect, useRef } from "react";

interface Package {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  status: 'in-truck' | 'unloaded' | 'being-carried' | 'on-shelf' | 'being-picked' | 'ready-for-shipment';
  carrierId?: number;
  shelfX?: number;
  shelfY?: number;
  unloadOrder: number;
  pickOrder?: number;
}

interface Worker {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  speed: number;
  carrying: boolean;
  carriedPackage?: Package;
  task: 'idle' | 'walking-to-package' | 'picking-up' | 'walking-to-shelf' | 'placing' | 'walking-to-shelf-for-pickup' | 'picking-from-shelf' | 'walking-to-dispatch';
  walkCycle: number;
  assignedPackageId?: number;
}

interface Truck {
  x: number;
  y: number;
  width: number;
  height: number;
  status: 'approaching' | 'arrived' | 'unloading' | 'finished' | 'departed';
  unloadingProgress: number;
}

interface Order {
  id: number;
  packages: number[];
  status: 'pending' | 'processing' | 'completed';
}

const WarehouseAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // İnisial vəziyyət
    let packageIdCounter = 1;
    let processPhase = 'incoming'; // 'incoming' | 'storing' | 'picking' | 'shipping' | 'completed'
    
    // Tək maşın
    const truck: Truck = {
      x: -200,
      y: 420,
      width: 180,
      height: 60,
      status: 'approaching',
      unloadingProgress: 0
    };

    // Paketlər (FIFO üsulu üçün ardıcıllıq) - 6 paket
    const packages: Package[] = [];
    const packageColors = ['#8B4513', '#CD853F', '#D2691E', '#DEB887', '#F4A460', '#BC8F8F'];
    
    // 6 paket yaradırıq
    for (let i = 0; i < 6; i++) {
      packages.push({
        id: packageIdCounter++,
        x: truck.x + 40 + (i % 3) * 30,
        y: truck.y - 20 - Math.floor(i / 3) * 25,
        width: 25,
        height: 20,
        color: packageColors[i],
        status: 'in-truck',
        unloadOrder: i + 1
      });
    }

    // Sifariş (2 paket götürülməsi)
    const orders: Order[] = [
      {
        id: 1,
        packages: [2, 4], // 2-ci və 4-cü paketlər götürüləcək
        status: 'pending'
      }
    ];

    // 2 işçi
    const workers: Worker[] = [
      {
        id: 1,
        x: 120,
        y: 520,
        targetX: 120,
        targetY: 520,
        speed: 1.3,
        carrying: false,
        task: 'idle',
        walkCycle: 0
      },
      {
        id: 2,
        x: 180,
        y: 520,
        targetX: 180,
        targetY: 520,
        speed: 1.1,
        carrying: false,
        task: 'idle',
        walkCycle: 0
      }
    ];

    // Rəflər
    const shelves = [
      { x: 600, y: 150, width: 120, height: 250, currentPackages: 0, maxPackages: 6 }
    ];

    // Göndəriş sahəsi
    const dispatchArea = {
      x: 450,
      y: 480,
      width: 120,
      height: 60
    };

    let nextShelfPosition = 0;
    let packagesOnShelf = 0;
    let currentOrder: Order | null = null;
    let orderStartTime = 0;
    let cycleComplete = false;
    let restartTimer = 0;

    // Maşını çəkmək
    const drawTruck = () => {
      if (truck.status === 'departed') return;
      
      ctx.save();
      
      // Kölgə
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.fillRect(truck.x + 5, truck.y + truck.height + 5, truck.width, 8);
      
      // Maşın gövdəsi
      ctx.fillStyle = '#2C3E50';
      ctx.fillRect(truck.x, truck.y, truck.width, truck.height);
      
      // Kabin
      ctx.fillStyle = '#34495E';
      ctx.fillRect(truck.x, truck.y - 25, 60, 35);
      
      // Pəncərə
      ctx.fillStyle = '#87CEEB';
      ctx.fillRect(truck.x + 5, truck.y - 20, 45, 25);
      
      // Təkərlər
      ctx.fillStyle = '#1C1C1C';
      [truck.x + 30, truck.x + truck.width - 30].forEach(wheelX => {
        ctx.beginPath();
        ctx.arc(wheelX, truck.y + truck.height + 8, 15, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#666666';
        ctx.beginPath();
        ctx.arc(wheelX, truck.y + truck.height + 8, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#1C1C1C';
      });
      
      // Yük qapısı
      if (truck.status === 'unloading' || truck.status === 'finished') {
        ctx.fillStyle = '#2C3E50';
        ctx.fillRect(truck.x + truck.width - 5, truck.y, 10, truck.height);
        ctx.strokeStyle = '#34495E';
        ctx.lineWidth = 2;
        ctx.strokeRect(truck.x + truck.width - 5, truck.y, 10, truck.height);
      }
      
      ctx.restore();
    };

    // İşçini çəkmək
    const drawWorker = (worker: Worker) => {
      ctx.save();
      ctx.translate(worker.x, worker.y);
      
      const walkOffset = Math.sin(worker.walkCycle) * 3;
      
      // Kölgə
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.ellipse(0, 8, 12, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Baş
      ctx.fillStyle = '#FFDBAC';
      ctx.beginPath();
      ctx.arc(0, -40, 10, 0, Math.PI * 2);
      ctx.fill();
      
      // Saç
      ctx.fillStyle = '#8B4513';
      ctx.beginPath();
      ctx.arc(0, -43, 10, 0, Math.PI);
      ctx.fill();
      
      // Bədən
      ctx.fillStyle = worker.carrying ? '#FF6B35' : '#4A90E2';
      ctx.fillRect(-8, -30, 16, 25);
      
      // Qollar
      ctx.strokeStyle = '#FFDBAC';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      
      if (worker.carrying) {
        ctx.beginPath();
        ctx.moveTo(-8, -20);
        ctx.lineTo(-12, -30);
        ctx.moveTo(8, -20);
        ctx.lineTo(12, -30);
      } else if (worker.task.includes('walking')) {
        ctx.beginPath();
        ctx.moveTo(-8, -18);
        ctx.lineTo(-10, -8 + walkOffset);
        ctx.moveTo(8, -18);
        ctx.lineTo(10, -8 - walkOffset);
      } else {
        ctx.beginPath();
        ctx.moveTo(-8, -18);
        ctx.lineTo(-9, -8);
        ctx.moveTo(8, -18);
        ctx.lineTo(9, -8);
      }
      ctx.stroke();
      
      // Ayaqlar
      if (worker.task.includes('walking')) {
        ctx.beginPath();
        ctx.moveTo(-4, -5);
        ctx.lineTo(-5, 5 + walkOffset);
        ctx.moveTo(4, -5);
        ctx.lineTo(5, 5 - walkOffset);
      } else {
        ctx.beginPath();
        ctx.moveTo(-4, -5);
        ctx.lineTo(-4, 5);
        ctx.moveTo(4, -5);
        ctx.lineTo(4, 5);
      }
      ctx.stroke();
      
      // Ayaqqabılar
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(-6, 3, 5, 7);
      ctx.fillRect(1, 3, 5, 7);
      
      // Daşınan paket
      if (worker.carrying && worker.carriedPackage) {
        ctx.fillStyle = worker.carriedPackage.color;
        ctx.fillRect(-12, -35, worker.carriedPackage.width, worker.carriedPackage.height);
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 1;
        ctx.strokeRect(-12, -35, worker.carriedPackage.width, worker.carriedPackage.height);
      }
      
      ctx.restore();
    };

    // Paketi çəkmək
    const drawPackage = (pkg: Package) => {
      if (pkg.status === 'being-carried' || pkg.status === 'being-picked') return;
      
      ctx.save();
      
      // Kölgə
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.fillRect(pkg.x + 2, pkg.y + pkg.height + 2, pkg.width, 3);
      
      // Paket
      ctx.fillStyle = pkg.color;
      ctx.fillRect(pkg.x, pkg.y, pkg.width, pkg.height);
      
      // Kənarlar
      ctx.strokeStyle = '#654321';
      ctx.lineWidth = 1;
      ctx.strokeRect(pkg.x, pkg.y, pkg.width, pkg.height);
      
      // Nömrə
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(pkg.unloadOrder.toString(), pkg.x + pkg.width/2, pkg.y + pkg.height/2 + 4);
      
      // Sifariş işarəsi
      if (pkg.status === 'on-shelf' && currentOrder?.packages.includes(pkg.unloadOrder)) {
        ctx.strokeStyle = '#FF0000';
        ctx.lineWidth = 3;
        ctx.strokeRect(pkg.x - 3, pkg.y - 3, pkg.width + 6, pkg.height + 6);
      }
      
      ctx.restore();
    };

    // Rəfləri çəkmək
    const drawShelves = () => {
      shelves.forEach(shelf => {
        ctx.save();
        
        // Kölgə - daha böyük və realistik
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        ctx.fillRect(shelf.x + 8, shelf.y + shelf.height + 8, shelf.width + 10, 12);
        
        // Arxa panel
        ctx.fillStyle = '#4A4A4A';
        ctx.fillRect(shelf.x, shelf.y, shelf.width, shelf.height);
        
        // Metal çərçivə - sol tərəf
        ctx.fillStyle = '#696969';
        ctx.fillRect(shelf.x, shelf.y, 12, shelf.height);
        
        // Metal çərçivə - sağ tərəf
        ctx.fillStyle = '#696969';
        ctx.fillRect(shelf.x + shelf.width - 12, shelf.y, 12, shelf.height);
        
        // 3D effekt üçün işıqlı kənarlar
        ctx.fillStyle = '#8C8C8C';
        ctx.fillRect(shelf.x + 2, shelf.y + 2, 8, shelf.height - 4);
        ctx.fillRect(shelf.x + shelf.width - 10, shelf.y + 2, 8, shelf.height - 4);
        
        // Üfüqi rəf səviyyələri - daha detallı
        for (let level = 0; level <= 3; level++) {
          const y = shelf.y + level * (shelf.height / 3);
          
          // Əsas rəf lövhəsi
          ctx.fillStyle = '#D4A574';
          ctx.fillRect(shelf.x + 5, y - 4, shelf.width - 10, 12);
          
          // Rəfin üst işıqlı hissəsi
          ctx.fillStyle = '#E6C08A';
          ctx.fillRect(shelf.x + 5, y - 4, shelf.width - 10, 3);
          
          // Rəfin kölgəli alt hissəsi
          ctx.fillStyle = '#B8956A';
          ctx.fillRect(shelf.x + 5, y + 5, shelf.width - 10, 3);
          
          // Metal dəstək braketləri
          ctx.fillStyle = '#505050';
          // Sol braket
          ctx.fillRect(shelf.x + 8, y - 6, 6, 16);
          // Sağ braket
          ctx.fillRect(shelf.x + shelf.width - 14, y - 6, 6, 16);
          
          // Braketlərin işıqlı hissəsi
          ctx.fillStyle = '#707070';
          ctx.fillRect(shelf.x + 9, y - 5, 2, 14);
          ctx.fillRect(shelf.x + shelf.width - 13, y - 5, 2, 14);
          
          // Rəfin ön kənarı
          ctx.fillStyle = '#C19660';
          ctx.fillRect(shelf.x + 5, y + 8, shelf.width - 10, 2);
        }
        
        // Rəfin ümumi çərçivəsi
        ctx.strokeStyle = '#2F2F2F';
        ctx.lineWidth = 2;
        ctx.strokeRect(shelf.x, shelf.y, shelf.width, shelf.height);
        
        // Metal parıltı effekti
        ctx.fillStyle = 'rgba(255,255,255,0.1)';
        ctx.fillRect(shelf.x + 1, shelf.y + 1, 2, shelf.height - 2);
        ctx.fillRect(shelf.x + shelf.width - 3, shelf.y + 1, 2, shelf.height - 2);
        
        // Alt dayaq ayaqları
        ctx.fillStyle = '#404040';
        // Sol ayaq
        ctx.fillRect(shelf.x + 15, shelf.y + shelf.height, 8, 15);
        // Sağ ayaq
        ctx.fillRect(shelf.x + shelf.width - 23, shelf.y + shelf.height, 8, 15);
        
        // Ayaqların kölgəsi
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.fillRect(shelf.x + 17, shelf.y + shelf.height + 15, 4, 3);
        ctx.fillRect(shelf.x + shelf.width - 21, shelf.y + shelf.height + 15, 4, 3);
        
        ctx.restore();
      });
    };

    // Göndəriş sahəsini çəkmək
    const drawDispatchArea = () => {
      ctx.save();
      
      ctx.fillStyle = '#FF6B35';
      ctx.fillRect(dispatchArea.x, dispatchArea.y, dispatchArea.width, dispatchArea.height);
      
      ctx.strokeStyle = '#E55A2B';
      ctx.lineWidth = 3;
      ctx.strokeRect(dispatchArea.x, dispatchArea.y, dispatchArea.width, dispatchArea.height);
      
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('GÖNDƏRİŞ', dispatchArea.x + dispatchArea.width/2, dispatchArea.y + dispatchArea.height/2 + 5);
      
      ctx.restore();
    };

    // Döşəmə və fon
    const drawBackground = () => {
      const canvasWidth = canvas.offsetWidth;
      const canvasHeight = canvas.offsetHeight;
      
      // Səma
      const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
      gradient.addColorStop(0, '#E6F3FF');
      gradient.addColorStop(0.6, '#B8E0FF');
      gradient.addColorStop(1, '#87CEEB');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      
      // Döşəmə
      ctx.fillStyle = '#D3D3D3';
      ctx.fillRect(0, 540, canvasWidth, canvasHeight - 540);
      
      // Yükləmə platforması
      ctx.fillStyle = '#FFD700';
      ctx.fillRect(50, 480, 350, 60);
      ctx.strokeStyle = '#FF8C00';
      ctx.lineWidth = 3;
      ctx.strokeRect(50, 480, 350, 60);
    };

    // Düzəldilmiş işçi tapşırıqlarını idarə etmək
    const manageWorkerTasks = () => {
      workers.forEach(worker => {
        const dx = worker.targetX - worker.x;
        const dy = worker.targetY - worker.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Hərəkət
        if (distance > 3) {
          worker.x += (dx / distance) * worker.speed;
          worker.y += (dy / distance) * worker.speed;
          worker.walkCycle += 0.15;
        }
        
        // Tapşırıq mərhələləri
        switch (worker.task) {
          case 'idle':
            // Anbar mərhələsində - bütün paketləri rəfə aparma
            if (processPhase === 'storing' && packagesOnShelf < 6) {
              // Mövcud boşaldılmış paketləri tap və işçi tapşırığı olmayan paketləri seç
              const availablePackages = packages.filter(p => 
                p.status === 'unloaded' && 
                !workers.some(w => w.assignedPackageId === p.id && w.task !== 'idle')
              ).sort((a, b) => a.unloadOrder - b.unloadOrder);
              
              const nextPackage = availablePackages[0];
              
              if (nextPackage) {
                worker.task = 'walking-to-package';
                worker.targetX = nextPackage.x;
                worker.targetY = nextPackage.y + 30;
                worker.assignedPackageId = nextPackage.id;
                console.log(`İşçi ${worker.id}: ${nextPackage.unloadOrder} nömrəli paket üçün gedir`);
              }
            }
            // Sifariş mərhələsində - rəfdən paket götürmə
            else if (processPhase === 'picking' && currentOrder) {
              const orderPackage = packages.find(p => 
                p.status === 'on-shelf' && 
                currentOrder!.packages.includes(p.unloadOrder) &&
                !workers.some(w => w.assignedPackageId === p.id && w.task !== 'idle')
              );
              
              if (orderPackage) {
                worker.task = 'walking-to-shelf-for-pickup';
                worker.targetX = orderPackage.x + 30;
                worker.targetY = orderPackage.y + 30;
                worker.assignedPackageId = orderPackage.id;
                console.log(`İşçi ${worker.id}: Sifariş üçün ${orderPackage.unloadOrder} nömrəli paketi götürməyə gedir`);
              }
            }
            break;
            
          case 'walking-to-package':
            if (distance < 5 && worker.assignedPackageId) {
              const targetPackage = packages.find(p => p.id === worker.assignedPackageId);
              
              if (targetPackage && targetPackage.status === 'unloaded') {
                targetPackage.status = 'being-carried';
                targetPackage.carrierId = worker.id;
                worker.carrying = true;
                worker.carriedPackage = targetPackage;
                worker.task = 'walking-to-shelf';
                
                // Rəf mövqeyini hesabla
                const shelfX = shelves[0].x + 20 + (nextShelfPosition % 3) * 30;
                const shelfLevel = Math.floor(nextShelfPosition / 3);
                const shelfY = shelves[0].y + shelves[0].height - 50 - (shelfLevel * 70);
                
                worker.targetX = shelfX - 30;
                worker.targetY = shelfY + 30;
                
                targetPackage.shelfX = shelfX;
                targetPackage.shelfY = shelfY;
                nextShelfPosition++;
                
                console.log(`İşçi ${worker.id}: ${targetPackage.unloadOrder} nömrəli paketi götürdü, rəfə aparır`);
              }
            }
            break;
            
          case 'walking-to-shelf':
            if (distance < 10 && worker.carriedPackage) {
              // Paketi rəfə yerləşdir
              worker.carriedPackage.status = 'on-shelf';
              worker.carriedPackage.x = worker.carriedPackage.shelfX || worker.carriedPackage.x;
              worker.carriedPackage.y = worker.carriedPackage.shelfY || worker.carriedPackage.y;
              worker.carriedPackage.carrierId = undefined;
              
              console.log(`İşçi ${worker.id}: ${worker.carriedPackage.unloadOrder} nömrəli paketi rəfə yerləşdirdi`);
              
              // İşçini sərbəst burax
              worker.carrying = false;
              worker.carriedPackage = undefined;
              worker.assignedPackageId = undefined;
              worker.task = 'idle';
              worker.targetX = 120 + (worker.id - 1) * 60;
              worker.targetY = 520;
              
              packagesOnShelf++;
              
              console.log(`Rəfdə paket sayı: ${packagesOnShelf}/6`);
            }
            break;

          case 'walking-to-shelf-for-pickup':
            if (distance < 15 && worker.assignedPackageId) {
              const targetPackage = packages.find(p => p.id === worker.assignedPackageId);
              
              if (targetPackage && targetPackage.status === 'on-shelf') {
                targetPackage.status = 'being-picked';
                targetPackage.carrierId = worker.id;
                worker.carrying = true;
                worker.carriedPackage = targetPackage;
                worker.task = 'walking-to-dispatch';
                worker.targetX = dispatchArea.x + 30;
                worker.targetY = dispatchArea.y + 30;
                
                console.log(`İşçi ${worker.id}: ${targetPackage.unloadOrder} nömrəli paketi rəfdən götürdü`);
              }
            }
            break;

          case 'walking-to-dispatch':
            if (distance < 15 && worker.carriedPackage) {
              // Paketi göndəriş üçün hazırla
              worker.carriedPackage.status = 'ready-for-shipment';
              worker.carriedPackage.x = dispatchArea.x + 15 + (Math.random() * 70);
              worker.carriedPackage.y = dispatchArea.y - 25;
              worker.carriedPackage.carrierId = undefined;
              
              console.log(`İşçi ${worker.id}: ${worker.carriedPackage.unloadOrder} nömrəli paketi göndərişə hazırladı`);
              
              // İşçini sərbəst burax
              worker.carrying = false;
              worker.carriedPackage = undefined;
              worker.assignedPackageId = undefined;
              worker.task = 'idle';
              worker.targetX = 120 + (worker.id - 1) * 60;
              worker.targetY = 520;
            }
            break;
        }
      });
    };

    // Döngü yenidənbaşlama funksiyası
    const restartCycle = () => {
      console.log("Yeni döngü başlayır...");
      
      // Bütün elementləri sıfırlayırıq
      packages.forEach((pkg, i) => {
        pkg.status = 'in-truck';
        pkg.x = truck.x + 40 + (i % 3) * 30;
        pkg.y = truck.y - 20 - Math.floor(i / 3) * 25;
        pkg.carrierId = undefined;
        pkg.shelfX = undefined;
        pkg.shelfY = undefined;
      });
      
      workers.forEach((worker, i) => {
        worker.x = 120 + i * 60;
        worker.y = 520;
        worker.targetX = worker.x;
        worker.targetY = worker.y;
        worker.carrying = false;
        worker.carriedPackage = undefined;
        worker.task = 'idle';
        worker.walkCycle = 0;
        worker.assignedPackageId = undefined;
      });
      
      truck.x = -200;
      truck.status = 'approaching';
      truck.unloadingProgress = 0;
      
      processPhase = 'incoming';
      nextShelfPosition = 0;
      packagesOnShelf = 0;
      currentOrder = null;
      cycleComplete = false;
      restartTimer = 0;
      
      // Yeni sifariş yaradırıq
      orders[0] = {
        id: 1,
        packages: [Math.floor(Math.random() * 3) + 1, Math.floor(Math.random() * 3) + 4], // Təsadüfi 2 paket
        status: 'pending'
      };
    };

    // Maşın və proses idarəetməsi
    const manageTruckAndProcess = () => {
      // Tam döngü tamamlandıqdan sonra yenidənbaşlama
      if (cycleComplete) {
        restartTimer++;
        if (restartTimer > 180) { // 3 saniyə gözlə
          restartCycle();
          return;
        }
      }

      switch (truck.status) {
        case 'approaching':
          truck.x += 0.8;
          if (truck.x >= 70) {
            truck.status = 'arrived';
            console.log("Maşın gəldi");
            setTimeout(() => {
              truck.status = 'unloading';
              processPhase = 'storing';
              console.log("Boşaltma başladı");
            }, 1000);
          }
          break;
          
        case 'unloading':
          truck.unloadingProgress += 0.015; // Daha yavaş boşaltma
          
          const unloadedCount = Math.floor(truck.unloadingProgress * 6);
          packages.forEach(pkg => {
            if (pkg.status === 'in-truck' && pkg.unloadOrder <= unloadedCount) {
              pkg.status = 'unloaded';
              pkg.x = truck.x + truck.width + 20 + ((pkg.unloadOrder - 1) % 3) * 30;
              pkg.y = 460;
              console.log(`${pkg.unloadOrder} nömrəli paket boşaldıldı`);
            }
          });
          
          if (truck.unloadingProgress >= 1) {
            truck.status = 'finished';
            console.log("Bütün paketlər boşaldıldı");
          }
          break;

        case 'finished':
          // Bütün paketlər rəfə yerləşdirildikdən sonra sifariş prosesini başlat
          if (packagesOnShelf >= 6 && !currentOrder) {
            console.log("Bütün paketlər rəfə yerləşdirildi, sifariş prosesi başlayır");
            currentOrder = orders[0];
            currentOrder.status = 'processing';
            processPhase = 'picking';
            orderStartTime = Date.now();
          }
          break;
      }
      
      // Paket mövqeyini yenilə
      packages.forEach(pkg => {
        if (pkg.status === 'in-truck') {
          pkg.x = truck.x + 40 + ((pkg.unloadOrder - 1) % 3) * 30;
          pkg.y = truck.y - 20 - Math.floor((pkg.unloadOrder - 1) / 3) * 25;
        }
        
        if ((pkg.status === 'being-carried' || pkg.status === 'being-picked') && pkg.carrierId) {
          const carrier = workers.find(w => w.id === pkg.carrierId);
          if (carrier) {
            pkg.x = carrier.x - 12;
            pkg.y = carrier.y - 35;
          }
        }
      });

      // Sifarişi tamamla və döngünü başa çatdır
      if (currentOrder && currentOrder.status === 'processing') {
        const completedPackages = packages.filter(p => 
          p.status === 'ready-for-shipment' && 
          currentOrder!.packages.includes(p.unloadOrder)
        );
        
        if (completedPackages.length >= currentOrder.packages.length) {
          console.log("Sifariş tamamlandı");
          currentOrder.status = 'completed';
          processPhase = 'completed';
          
          // Maşını yola sal
          setTimeout(() => {
            truck.status = 'departed';
            truck.x = -300;
            cycleComplete = true;
            console.log("Maşın getdi, döngü tamamlandı");
          }, 2000);
        }
      }
    };

    // Əsas animasiya döngüsü
    const animate = () => {
      const canvasWidth = canvas.offsetWidth;
      const canvasHeight = canvas.offsetHeight;
      
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      
      drawBackground();
      drawShelves();
      drawDispatchArea();
      drawTruck();
      
      packages.forEach(pkg => {
        drawPackage(pkg);
      });
      
      workers.forEach(worker => {
        drawWorker(worker);
      });
      
      manageTruckAndProcess();
      manageWorkerTasks();
      
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="relative w-full h-[600px] overflow-hidden rounded-lg shadow-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ imageRendering: "auto" }}
      />
      
      {/* İnformasiya paneli */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-blue-200">
        <h3 className="font-bold text-lg text-gray-800 mb-2 flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          Tam Anbar Prosesi
        </h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• 1. Mərhələ: 6 paket rəfə yerləşdirilir</p>
          <p>• 2. Mərhələ: Sifariş üzrə 2 paket götürülür</p>
          <p>• 3. Mərhələ: Paketlər göndəriş üçün hazırlanır</p>
          <p>• Proses davamlı təkrarlanır</p>
        </div>
      </div>

      {/* Real vaxt statusu */}
      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-blue-200">
        <h4 className="font-semibold text-base text-gray-800 mb-3">Canlı Status</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">İşçilər:</span>
            <span className="font-bold text-blue-600">2 nəfər aktiv</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Rəfdə paket:</span>
            <span className="font-bold text-green-600">6/6</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Sifariş:</span>
            <span className="font-bold text-orange-600">2 paket</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Status:</span>
            <span className="font-bold text-purple-600">Davamlı proses</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarehouseAnimation;
