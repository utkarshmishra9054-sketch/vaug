/**
 * A soft round glow as a radial gradient. Used instead of large `blur()` filters on big blobs, which
 * are costly to paint on phones and which WebKit can fail to paint at all (the hero went blank).
 */
export const glow = (color: string) => ({ background: `radial-gradient(closest-side, ${color}, transparent)` });
