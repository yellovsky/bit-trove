export const addOpacityToColor = (
  color: string | undefined,
  opacity: number
): string | undefined => {
  if (!color) return undefined;

  const hexRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
  const rgbRegex = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;
  const rgbaRegex = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d*\.?\d+)\)$/;

  function hexToRgba(hex: string): string | undefined {
    const result = fullHexRegex.exec(hex);
    if (!result) return undefined;
    const [, r, g, b] = result;
    if ([r, g, b].some((c) => c === undefined)) return undefined;
    return `rgba(${parseInt(r!, 16)}, ${parseInt(g!, 16)}, ${parseInt(b!, 16)}, ${opacity})`;
  }

  let modifiedColor: string | undefined = color.trim();
  if (hexRegex.test(modifiedColor)) {
    modifiedColor = modifiedColor.replace(hexRegex, (_, r, g, b) => `${r}${r}${g}${g}${b}${b}`);
  } else if (rgbRegex.test(modifiedColor)) {
    modifiedColor = modifiedColor.replace(rgbRegex, `rgba($1, $2, $3, ${opacity})`);
  } else if (rgbaRegex.test(modifiedColor)) {
    modifiedColor = modifiedColor.replace(
      rgbaRegex,
      (_, r, g, b) => `rgba(${r}, ${g}, ${b}, ${opacity})`
    );
  } else if (fullHexRegex.test(modifiedColor)) {
    modifiedColor = hexToRgba(modifiedColor);
  } else {
    return undefined;
  }

  return modifiedColor;
};
