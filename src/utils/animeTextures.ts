import * as THREE from 'three';

// Procedural Anime & Realistic Texture Generator
class AnimeTextureGenerator {
  private cache: { [key: string]: THREE.Texture } = {};

  // 1. Three.js Cel-Shading Toon Gradient Map (3-Tone & 4-Tone Anime Shading)
  public getToonGradientMap(): THREE.DataTexture {
    if (this.cache['toonGradient']) return this.cache['toonGradient'] as THREE.DataTexture;

    // 4 discrete stepped brightness bands for classic Makoto Shinkai / Ghibli anime shading
    const format = THREE.RedFormat;
    const colors = new Uint8Array([50, 120, 200, 255]);
    const gradientMap = new THREE.DataTexture(colors, colors.length, 1, format);
    gradientMap.minFilter = THREE.NearestFilter;
    gradientMap.magFilter = THREE.NearestFilter;
    gradientMap.generateMipmaps = false;
    gradientMap.needsUpdate = true;

    this.cache['toonGradient'] = gradientMap;
    return gradientMap;
  }

  // 2. High-Detail Banana Leaf Texture (Fine Parallel Veins + Subtle Torn Edges)
  public getBananaLeafTexture(): THREE.CanvasTexture {
    if (this.cache['bananaLeaf']) return this.cache['bananaLeaf'] as THREE.CanvasTexture;

    const width = 256;
    const height = 1024;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;

    // Rich anime botanical green gradient
    const grad = ctx.createLinearGradient(0, 0, width, 0);
    grad.addColorStop(0, '#2d6a4f');
    grad.addColorStop(0.45, '#52b788');
    grad.addColorStop(0.5, '#d8f3dc'); // Pale center midrib
    grad.addColorStop(0.55, '#52b788');
    grad.addColorStop(1, '#2d6a4f');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Lateral parallel veins
    ctx.strokeStyle = 'rgba(216, 243, 220, 0.25)';
    ctx.lineWidth = 1.5;
    for (let y = 0; y < height; y += 8) {
      // Left side veins angled slightly upward
      ctx.beginPath();
      ctx.moveTo(width / 2, y);
      ctx.lineTo(0, y + 25);
      ctx.stroke();

      // Right side veins
      ctx.beginPath();
      ctx.moveTo(width / 2, y);
      ctx.lineTo(width, y + 25);
      ctx.stroke();
    }

    // Occasional wind-cut slits (natural leaf splits)
    ctx.fillStyle = 'rgba(20, 40, 15, 0.4)';
    for (let i = 0; i < 15; i++) {
      const splitY = 80 + Math.random() * (height - 160);
      const isLeft = Math.random() > 0.5;
      const startX = isLeft ? 0 : width;
      const endX = isLeft ? 45 + Math.random() * 40 : width - (45 + Math.random() * 40);
      ctx.beginPath();
      ctx.moveTo(startX, splitY);
      ctx.lineTo(endX, splitY + 4);
      ctx.lineTo(startX, splitY + 8);
      ctx.fill();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    this.cache['bananaLeaf'] = tex;
    return tex;
  }

  // 3. Banana Trunk / Pseudostem Fibrous Bark Texture
  public getBananaTrunkTexture(): THREE.CanvasTexture {
    if (this.cache['bananaTrunk']) return this.cache['bananaTrunk'] as THREE.CanvasTexture;

    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    // Greenish-brown fibrous sheath base
    ctx.fillStyle = '#405335';
    ctx.fillRect(0, 0, size, size);

    // Overlapping leaf base sheaths
    for (let y = 0; y < size; y += 45) {
      ctx.fillStyle = y % 90 === 0 ? '#314427' : '#526941';
      ctx.fillRect(0, y, size, 42);

      // Fibrous vertical striations
      ctx.strokeStyle = 'rgba(23, 33, 17, 0.35)';
      ctx.lineWidth = 1;
      for (let x = 0; x < size; x += 6) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + (Math.random() - 0.5) * 4, y + 42);
        ctx.stroke();
      }

      // Dried brown sheath peeling edges
      ctx.strokeStyle = '#8d6e63';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, y + 42);
      ctx.lineTo(size, y + 42);
      ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 2);
    this.cache['bananaTrunk'] = tex;
    return tex;
  }

  // 4. Anime Saffron Saree with Gold Brocade Zari & Crimson Pallu
  public getAnimeSareeTexture(): THREE.CanvasTexture {
    if (this.cache['animeSaree']) return this.cache['animeSaree'] as THREE.CanvasTexture;

    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    // Saturated Anime Saffron Body
    ctx.fillStyle = '#f77f00';
    ctx.fillRect(0, 0, size, size);

    // Delicate golden floral booti print
    ctx.fillStyle = '#ffdd00';
    for (let y = 30; y < size - 30; y += 48) {
      for (let x = 30; x < size - 30; x += 48) {
        // Small 4-petal lotus booti
        ctx.beginPath();
        ctx.arc(x, y - 4, 3, 0, Math.PI * 2);
        ctx.arc(x, y + 4, 3, 0, Math.PI * 2);
        ctx.arc(x - 4, y, 3, 0, Math.PI * 2);
        ctx.arc(x + 4, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Bold Crimson Borders with Gold Zari
    const bH = 75;
    ctx.fillStyle = '#9e0059';
    ctx.fillRect(0, 0, size, bH);
    ctx.fillRect(0, size - bH, size, bH);

    ctx.strokeStyle = '#ffe45e';
    ctx.lineWidth = 4;
    for (let x = 0; x < size; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 10);
      ctx.lineTo(x + 16, bH - 12);
      ctx.lineTo(x + 32, 10);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x, size - bH + 12);
      ctx.lineTo(x + 16, size - 10);
      ctx.lineTo(x + 32, size - bH + 12);
      ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(1, 2);
    this.cache['animeSaree'] = tex;
    return tex;
  }

  // 5. Anime Skybox Background Texture (Makoto Shinkai Golden Hour Sunset / Dawn Mist)
  public getAnimeSkyTexture(day: string): THREE.CanvasTexture {
    const key = `sky_${day}`;
    if (this.cache[key]) return this.cache[key] as THREE.CanvasTexture;

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    if (day === 'sandhya-arghya') {
      // Golden Hour Sunset (Makoto Shinkai style)
      grad.addColorStop(0, '#10002b'); // Deep twilight purple zenith
      grad.addColorStop(0.3, '#3c096c'); // Rich magenta
      grad.addColorStop(0.65, '#f72585'); // Rose pink
      grad.addColorStop(0.85, '#ff7b00'); // Saffron sunset
      grad.addColorStop(1, '#ffdd00'); // Blazing horizon gold
    } else if (day === 'usha-arghya') {
      // Misty Dawn Brahma Muhurta
      grad.addColorStop(0, '#03045e');
      grad.addColorStop(0.4, '#0077b6');
      grad.addColorStop(0.7, '#90e0ef');
      grad.addColorStop(0.9, '#f77f00');
      grad.addColorStop(1, '#ffe49e');
    } else if (day === 'kharna') {
      // Starry night with deep indigo
      grad.addColorStop(0, '#02040f');
      grad.addColorStop(0.6, '#0b132b');
      grad.addColorStop(1, '#1c2541');
    } else {
      // Bright Nahay-Khay Noon
      grad.addColorStop(0, '#0096c7');
      grad.addColorStop(0.6, '#48cae4');
      grad.addColorStop(1, '#ade8f4');
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    // Fluffy anime cumulus clouds painted at horizon
    ctx.fillStyle = day === 'sandhya-arghya' ? 'rgba(255, 183, 3, 0.45)' : 'rgba(255, 255, 255, 0.35)';
    for (let i = 0; i < 8; i++) {
      const cx = 40 + i * 65;
      const cy = 340 + Math.sin(i) * 30;
      ctx.beginPath();
      ctx.arc(cx, cy, 55, 0, Math.PI * 2);
      ctx.arc(cx + 35, cy - 15, 45, 0, Math.PI * 2);
      ctx.arc(cx - 35, cy + 10, 40, 0, Math.PI * 2);
      ctx.fill();
    }

    const tex = new THREE.CanvasTexture(canvas);
    this.cache[key] = tex;
    return tex;
  }
}

export const animeTexGen = new AnimeTextureGenerator();
