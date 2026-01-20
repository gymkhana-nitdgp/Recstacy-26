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
  _gl: THREE.WebGLRenderer
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

  // 1. CLEAR BACKGROUND (Transparent or specific color)
  // We use white so the text is readable, but you can make it transparent if you want the card material to show through
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  // 2. SMALLER PROFILE IMAGE (On Top)
  try {
    const profileImg = await loadProfileImage(imageUrl);
    
    // Config: Smaller image, centered top
    const imgSize = 300; // Reduced from 400
    const imgX = (width - imgSize) / 2; // Centered
    const imgY = 60; // Margin from top
    const radius = 25; // Rounded corners

    // Save context for clipping
    ctx.save();
    
    // Create Rounded Square path
    ctx.beginPath();
    ctx.roundRect(imgX, imgY, imgSize, imgSize, radius);
    ctx.closePath();
    ctx.clip();

    // Draw Image (Object Cover logic)
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
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.roundRect(imgX, imgY, imgSize, imgSize, radius);
    ctx.stroke();

  } catch (err) {
    // Fallback grey box
    ctx.fillStyle = '#cccccc';
    ctx.fillRect((width - 300) / 2, 60, 300, 300);
  }

  // 3. TEXT DETAILS
  // Name
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 50px Arial';
  ctx.textAlign = 'center';
  // Positioned below the image
  ctx.fillText(name, width / 2, 450);

  // Role
  ctx.fillStyle = '#666666';
  ctx.font = 'bold 35px Arial';
  ctx.fillText(role.toUpperCase(), width / 2, 510);

  // 4. EMAIL PILL (Bottom)
  const emailY = 650;
  const pillW = 460;
  const pillH = 70;
  const pillX = (width - pillW) / 2;

  // Grey background for email
  ctx.fillStyle = '#f0f0f0';
  ctx.beginPath();
  ctx.roundRect(pillX, emailY, pillW, pillH, 35);
  ctx.fill();

  // Email Text
  ctx.fillStyle = '#333333';
  ctx.font = '26px Arial';
  ctx.fillText(email, width / 2, emailY + 45);

  // 5. TEXTURE CREATION
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  // texture.flipY = false; // Usually handled in material, but safe to set here too
  
  return texture;
};