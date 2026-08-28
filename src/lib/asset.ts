export function assetPath(path: string) {
  const optimizedPath = path
    .replace(/\.(jpe?g|png)$/i, ".webp")
    .replace(/\.mp4$/i, ".web.mp4");

  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${optimizedPath}`;
}
