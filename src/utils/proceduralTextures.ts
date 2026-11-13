import * as THREE from 'three';

// Procedural Photorealistic Canvas Texture Generator for Chhath Ghat
class TextureGenerator {
  private cache: { [key: string]: THREE.CanvasTexture } = {};

  // 1. Woven Bamboo Texture (For Bamboo Soop & Daura)
  public getBambooWovenTexture(): THREE.CanvasTexture {
    if (this.cache['bamboo']) return this.cache['bamboo'];

    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    // Base bamboo warm honey color
    ctx.fillStyle = '#caa066';
    ctx.fillRect(0, 0, size, size);

    const stripSize = 32;
    // Criss-cross woven bamboo strips
    for (let y = 0; y < size; y += stripSize) {
      for (let x = 0; x < size; x += stripSize) {
        const isHorizontal = ((x / stripSize) + (y / stripSize)) % 2 === 0;

        // Gradient for 3D curved weave effect
        const grad = isHorizontal
          ? ctx.createLinearGradient(x, y, x, y + stripSize)
          : ctx.createLinearGradient(x, y, x + stripSize, y);

        if (isHorizontal) {
          grad.addColorStop(0, '#8c6239');
          grad.addColorStop(0.3, '#d4a373');
          grad.addColorStop(0.7, '#e6ccb2');
          grad.addColorStop(1, '#6f4e37');
        } else {
          grad.addColorStop(0, '#6f4e37');
          grad.addColorStop(0.3, '#c59b27');
          grad.addColorStop(0.7, '#deb887');
          grad.addColorStop(1, '#8c6239');
        }

        ctx.fillStyle = grad;
        ctx.fillRect(x + 1, y + 1, stripSize - 2, stripSize - 2);

        // Bamboo fiber micro-stripes
        ctx.fillStyle = 'rgba(74, 44, 23, 0.15)';
        for (let f = 0; f < stripSize; f += 4) {
          if (isHorizontal) {
            ctx.fillRect(x, y + f, stripSize, 1);
          } else {
            ctx.fillRect(x + f, y, 1, stripSize);
          }
        }
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 2);
    this.cache['bamboo'] = tex;
    return tex;
  }

  // 2. Chiseled Red Sandstone Texture (For Varanasi/Patna Ghat Steps)
  public getGhatSandstoneTexture(): THREE.CanvasTexture {
    if (this.cache['sandstone']) return this.cache['sandstone'];

    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    // Rich terracotta-red sandstone base
    ctx.fillStyle = '#8f4f34';
    ctx.fillRect(0, 0, size, size);

    // Stone grain noise
    const imgData = ctx.getImageData(0, 0, size, size);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 35;
      data[i] = Math.min(255, Math.max(0, data[i] + noise + 10)); // R
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise * 0.7)); // G
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise * 0.5)); // B
    }
    ctx.putImageData(imgData, 0, 0);

    // Weathered stone block grout lines
    ctx.strokeStyle = '#4a2818';
    ctx.lineWidth = 4;
    const blockH = 64;
    const blockW = 128;
    for (let y = 0; y < size; y += blockH) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(size, y);
      ctx.stroke();

      const offset = (y / blockH) % 2 === 0 ? 0 : blockW / 2;
      for (let x = offset; x < size; x += blockW) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + blockH);
        ctx.stroke();
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 2);
    this.cache['sandstone'] = tex;
    return tex;
  }

  // 3. Terracotta Clay Texture with Traditional White Aipan Swirls
  public getTerracottaAipanTexture(): THREE.CanvasTexture {
    if (this.cache['terracotta']) return this.cache['terracotta'];

    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    // Earthy river-clay gradient
    const grad = ctx.createRadialGradient(256, 256, 40, 256, 256, 256);
    grad.addColorStop(0, '#b85433');
    grad.addColorStop(0.7, '#963f24');
    grad.addColorStop(1, '#6e2b17');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // White Rice-Paste (Aipan / Aripan) Folk Motifs
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.lineWidth = 4;

    // Lotus & Sun medallion at center
    ctx.beginPath();
    ctx.arc(256, 256, 70, 0, Math.PI * 2);
    ctx.stroke();

    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const x1 = 256 + Math.cos(angle) * 70;
      const y1 = 256 + Math.sin(angle) * 70;
      const x2 = 256 + Math.cos(angle) * 95;
      const y2 = 256 + Math.sin(angle) * 95;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // Traditional fish & peacock folk lines
    ctx.beginPath();
    ctx.arc(256, 256, 140, 0, Math.PI * 2);
    ctx.setLineDash([8, 12]);
    ctx.stroke();
    ctx.setLineDash([]);

    const tex = new THREE.CanvasTexture(canvas);
    this.cache['terracotta'] = tex;
    return tex;
  }

  // 4. Photorealistic Saffron Cotton Saree Fabric Texture with Red-Gold Zari Border
  public getSareeFabricTexture(): THREE.CanvasTexture {
    if (this.cache['saree']) return this.cache['saree'];

    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    // Rich sacred saffron body
    ctx.fillStyle = '#f58220';
    ctx.fillRect(0, 0, size, size);

    // Micro cotton threads
    ctx.fillStyle = 'rgba(254, 217, 107, 0.2)';
    for (let i = 0; i < size; i += 3) {
      ctx.fillRect(0, i, size, 1);
      ctx.fillRect(i, 0, 1, size);
    }

    // Iconic Red Zari Border
    const borderWidth = 80;
    ctx.fillStyle = '#b7094c';
    ctx.fillRect(0, 0, size, borderWidth);
    ctx.fillRect(0, size - borderWidth, size, borderWidth);

    // Gold zari patterns in border
    ctx.strokeStyle = '#ffd166';
    ctx.lineWidth = 3;
    for (let x = 0; x < size; x += 30) {
      // Chevron zari embroidery
      ctx.beginPath();
      ctx.moveTo(x, 10);
      ctx.lineTo(x + 15, 70);
      ctx.lineTo(x + 30, 10);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x, size - 70);
      ctx.lineTo(x + 15, size - 10);
      ctx.lineTo(x + 30, size - 70);
      ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(1, 2);
    this.cache['saree'] = tex;
    return tex;
  }

  // 5. Authentic Golden-Brown Thekua Texture with Floral Sun Carvings
  public getThekuaTexture(): THREE.CanvasTexture {
    if (this.cache['thekua']) return this.cache['thekua'];

    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    // Ghee-fried golden mahogany gradient
    const grad = ctx.createRadialGradient(128, 128, 20, 128, 128, 128);
    grad.addColorStop(0, '#d48b38');
    grad.addColorStop(0.6, '#a85d22');
    grad.addColorStop(1, '#6b320d');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // Saancha floral/sun imprint
    ctx.strokeStyle = '#4a1e05';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(128, 128, 60, 0, Math.PI * 2);
    ctx.stroke();

    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(128, 128);
      ctx.lineTo(128 + Math.cos(angle) * 75, 128 + Math.sin(angle) * 75);
      ctx.stroke();
    }

    // Saunf (fennel) & cardamom specks
    ctx.fillStyle = '#2d5016';
    for (let i = 0; i < 25; i++) {
      const rx = 40 + Math.random() * 176;
      const ry = 40 + Math.random() * 176;
      ctx.fillRect(rx, ry, 3, 2);
    }

    const tex = new THREE.CanvasTexture(canvas);
    this.cache['thekua'] = tex;
    return tex;
  }

  // 6. Water Ripple Normal Map for Realistic River Reflection
  public getWaterNormalTexture(): THREE.CanvasTexture {
    if (this.cache['waterNormal']) return this.cache['waterNormal'];

    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    // Base normal map blue: [128, 128, 255]
    ctx.fillStyle = '#8080ff';
    ctx.fillRect(0, 0, size, size);

    // Render smooth wave perturbations
    for (let y = 0; y < size; y += 4) {
      for (let x = 0; x < size; x += 4) {
        const nx = Math.sin(x * 0.1) * 20;
        const ny = Math.cos(y * 0.08 + x * 0.05) * 20;
        ctx.fillStyle = `rgb(${128 + nx}, ${128 + ny}, 245)`;
        ctx.fillRect(x, y, 4, 4);
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(8, 8);
    this.cache['waterNormal'] = tex;
    return tex;
  }
}

export const textureGen = new TextureGenerator();
