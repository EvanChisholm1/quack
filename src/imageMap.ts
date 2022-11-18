const imageMap: { [key: string]: HTMLImageElement } = {
  "black-king": new Image(),
  "black-bishop": new Image(),
  "black-knight": new Image(),
  "black-pawn": new Image(),
  "black-queen": new Image(),
  "black-rook": new Image(),
  "white-bishop": new Image(),
  "white-king": new Image(),
  "white-knight": new Image(),
  "white-pawn": new Image(),
  "white-queen": new Image(),
  "white-rook": new Image(),
};

Object.keys(imageMap).forEach(key => {
  imageMap[key].src = `/${key}.png`;
});

export default imageMap;
