export const wormholeColors = {
  Alpha: "red",
  Beta: "blue",
  Delta: "green",
};

// context.fillStyle = "black";
// context.fillRect(0, 0, canvas.width, canvas.height);
export const backgroundColorsByPlayerColor = {
  red: "rgba(255, 0, 0, 1.0)",
  blue: "rgba(0, 0, 255, 1.0)",
  green: "rgba(0, 255, 0, 1.0)",
  yellow: "rgba(255, 255, 0, 1.0)",
  purple: "rgba(255, 0, 255, 1.0)",
  black: "rgba(0, 0, 0, 1.0)",
  orange: "rgba(255, 165, 0, 1.0)",
};
export const foregroundColorsByPlayerColor: {
  [key in TI4Colors | "white"]: string;
} = {
  red: "rgba(255, 150, 150, 1)",
  blue: "rgba(150, 150, 255, 1)",
  green: "rgba(150, 255, 150, 1)",
  yellow: "rgba(255, 255, 0, 1)",
  purple: "rgba(255, 150, 255, 1)",
  orange: "rgba(255, 150, 0, 1)",
  white: "white",
};

export const wormholeSymbols = {
  Alpha: "♻️",
  Beta: "🌀",
  Delta: "🔴",
  Yellow: "🟡",
};
