const getDetectedPosition = (bbox: number[], imageWidth: number) => {
  const centerX = (bbox[0] + bbox[2]) / 2;
  const xRatio = centerX / imageWidth;

  if (xRatio < 0.33) return "bên trái";
  if (xRatio > 0.66) return "bên phải";
  return "ở giữa";
};

export default getDetectedPosition;
