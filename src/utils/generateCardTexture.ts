import * as THREE from 'three';

const loadProfileImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
  });
};

export const generateCardTexture = async (
  imageUrl: string,
  name: string,
  role: string,
  email: string = "hello@example.com",
  renderer: THREE.WebGLRenderer // Renamed _gl to renderer for clarity
): Promise<THREE.CanvasTexture> => {
  
  // OPTIMIZATION 1: Reduced Resolution (256x400)
  // This uses 75% less VRAM than 512x800 but looks identical on mobile screens.
  const width = 256;
  const height = 400;
  
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Could not get 2d context');
  }

  // 1. CLEAR BACKGROUND
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  // 2. PROFILE IMAGE
  try {
    const profileImg = await loadProfileImage(imageUrl);
    
    // Config: Scaled down for 256px width
    const imgSize = 150; // Was 300
    const imgX = (width - imgSize) / 2;
    const imgY = 30; // Was 60
    const radius = 12; // Was 25

    ctx.save();
    
    // Rounded Square path
    ctx.beginPath();
    if (ctx.roundRect) {
        ctx.roundRect(imgX, imgY, imgSize, imgSize, radius);
    } else {
        // Fallback for older browsers
        ctx.rect(imgX, imgY, imgSize, imgSize); 
    }
    ctx.closePath();
    ctx.clip();

    // Object Cover Logic
    const aspect = profileImg.width / profileImg.height;
    let drawW = imgSize;
    let drawH = imgSize;
    let offsetX = 0;
    let offsetY = 0;

    if (aspect > 1) {
        drawW = imgSize * aspect;
        offsetX = -(drawW - imgSize) / 2;
    } else {
        drawH = imgSize / aspect;
        offsetY = -(drawH - imgSize) / 2;
    }

    ctx.drawImage(profileImg, imgX + offsetX, imgY + offsetY, drawW, drawH);
    ctx.restore();

    // Border
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3; // Scaled down
    ctx.beginPath();
    if (ctx.roundRect) {
        ctx.roundRect(imgX, imgY, imgSize, imgSize, radius);
    } else {
        ctx.rect(imgX, imgY, imgSize, imgSize);
    }
    ctx.stroke();

  } catch (err) {
    // Fallback grey box
    ctx.fillStyle = '#cccccc';
    ctx.fillRect((width - 150) / 2, 30, 150, 150);
  }

  // 3. TEXT DETAILS (Fonts scaled down by 50%)
  // Name
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 24px Arial'; // Was 50px
  ctx.textAlign = 'center';
  ctx.fillText(name, width / 2, 225); // Was 450

  // Role
  ctx.fillStyle = '#666666';
  ctx.font = 'bold 16px Arial'; // Was 35px
  ctx.fillText(role.toUpperCase(), width / 2, 255); // Was 510

  // 4. EMAIL PILL
  const emailY = 325; // Was 650
  const pillW = 230; // Was 460
  const pillH = 35;  // Was 70
  const pillX = (width - pillW) / 2;

  // Grey background
  ctx.fillStyle = '#f0f0f0';
  ctx.beginPath();
  if (ctx.roundRect) {
      ctx.roundRect(pillX, emailY, pillW, pillH, 17);
  } else {
      ctx.rect(pillX, emailY, pillW, pillH);
  }
  ctx.fill();

  // Email Text
  ctx.fillStyle = '#333333';
  ctx.font = '13px Arial'; // Was 26px
  ctx.fillText(email, width / 2, emailY + 23);

  // 5. TEXTURE CREATION
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  
  // OPTIMIZATION 2: Anisotropy
  // This keeps the text sharp even when the card is viewed at a steep angle.
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  
  // OPTIMIZATION 3: Linear Filter for smooth scaling
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  
  // Mark for upload
  texture.needsUpdate = true;
  
  return texture;
};