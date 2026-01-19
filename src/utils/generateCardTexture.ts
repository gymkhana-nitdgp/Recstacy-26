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
  gl: THREE.WebGLRenderer
): Promise<THREE.CanvasTexture> => {
  const width = 512;
  const height = 800;
  
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Could not get 2d context');
  }

  // 1. SOLID WHITE BACKGROUND (High Contrast)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  // 2. PROFILE IMAGE
  try {
    const profileImg = await loadProfileImage(imageUrl);
    
    // Draw in top half
    const imgX = 56;
    const imgY = 60;
    const imgSize = 400;

    // Save context for clipping
    ctx.save();
    
    // Create Rounded Square path
    ctx.beginPath();
    const radius = 20;
    ctx.roundRect(imgX, imgY, imgSize, imgSize, radius);
    ctx.closePath();
    ctx.clip();

    // Draw Image (Object Cover)
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

    // Draw Border
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(imgX, imgY, imgSize, imgSize, radius);
    ctx.stroke();

  } catch (err) {
    // Fallback grey box
    ctx.fillStyle = '#cccccc';
    ctx.fillRect(56, 60, 400, 400);
  }

  // 3. TEXT (Bold and Large)
  // Name
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 60px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(name, width / 2, 530);

  // Role
  ctx.fillStyle = '#555555';
  ctx.font = 'bold 35px Arial';
  ctx.fillText(role.toUpperCase(), width / 2, 590);

  // 4. EMAIL PILL
  const emailY = 660;
  const pillW = 460;
  const pillH = 70;
  const pillX = (width - pillW) / 2;

  // Grey background for email
  ctx.fillStyle = '#eeeeee';
  ctx.beginPath();
  ctx.roundRect(pillX, emailY, pillW, pillH, 35);
  ctx.fill();

  // Email Text
  ctx.fillStyle = '#222222';
  ctx.font = '28px Arial';
  ctx.fillText(email, width / 2, emailY + 45); // Vertically centered

  // 5. TEXTURE CREATION
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.flipY = false; // Important for GLTF models usually
  texture.anisotropy = gl.capabilities.getMaxAnisotropy();
  
  return texture;
};