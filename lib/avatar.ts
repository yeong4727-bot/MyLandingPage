export function createAvatarUrl(seed: string) {
  const safeSeed = encodeURIComponent(seed.trim() || "guest");

  return `https://api.dicebear.com/9.x/thumbs/svg?seed=${safeSeed}&backgroundColor=f1f4dc,e6f0ff,ffe4e6,d1fae5,ede9fe`;
}
