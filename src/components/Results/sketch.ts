import { P5CanvasInstance, SketchProps } from "react-p5-wrapper";

export type Dimension = {
  value?: number;
  from: {
    value: number;
    label: string;
  };
  to: {
    value: number;
    label: string;
  };
};
export type IncomingSketchProps = {
  info: {
    dimX: Dimension;
    dimY: Dimension;
  };
};

export default function sketch(
  p5: P5CanvasInstance<SketchProps & IncomingSketchProps>
) {
  const LINES = 21;
  const LABEL_SHIFT = 6;
  const LABEL_SIZE = 20;
  const PAD = 50;
  let CENTER: number;
  let LEFT: number;
  let RIGHT: number;
  let TOP: number;
  let BOTTOM: number;
  let dimX: Dimension;
  let dimY: Dimension;

  p5.setup = () => {
    p5.createCanvas(300, 300);
    LEFT = PAD;
    RIGHT = p5.width - PAD;
    TOP = PAD;
    BOTTOM = p5.height - PAD;
    CENTER = p5.width / 2;
    p5.textFont("Josefin Sans");
  };

  p5.updateWithProps = (props: SketchProps & IncomingSketchProps) => {
    console.log("updateWithProps", props);
    if (props.info) {
      console.log("props info", props.info);
      dimX = props.info.dimX;
      dimY = props.info.dimY;
    }
  };

  p5.draw = () => {
    // @ts-ignore clear is expecting 4 args, but it doesn't need them
    p5.clear();

    /**
     * Axes
     */
    p5.strokeCap(p5.SQUARE);
    p5.stroke("#ddd");
    // y axis
    for (let r = 0; r < LINES; r++) {
      const y = p5.map(r, 0, LINES - 1, TOP, BOTTOM);
      p5.strokeWeight(r === p5.floor(LINES / 2) ? 3 : 1);
      p5.line(LEFT, y, RIGHT, y);
    }
    // x axis
    for (let c = 0; c < LINES; c++) {
      const x = p5.map(c, 0, LINES - 1, LEFT, RIGHT);
      p5.strokeWeight(c === p5.floor(LINES / 2) ? 3 : 1);
      p5.line(x, TOP, x, BOTTOM);
    }

    // Point
    if (dimX && dimY) {
      if (dimX.value && dimY.value) {
        const x = p5.map(
          dimX.value,
          dimX.from.value,
          dimX.to.value,
          LEFT,
          RIGHT
        );
        const y = p5.map(
          dimY.value,
          dimY.from.value,
          dimY.to.value,
          BOTTOM,
          TOP
        );
        p5.noStroke();
        p5.fill("white");
        p5.circle(x, y, 12);
      }

      /**
       * Labels
       */
      p5.noStroke();
      p5.fill("white");
      p5.textSize(LABEL_SIZE);
      // Bottom label
      p5.textAlign(p5.CENTER, p5.TOP);
      p5.text(dimY.from.label, CENTER, BOTTOM + LABEL_SHIFT);
      // Top label
      p5.textAlign(p5.CENTER, p5.BOTTOM);
      p5.text(dimY.to.label, CENTER, TOP - LABEL_SHIFT);
      // Right label
      p5.push();
      p5.translate(RIGHT + LABEL_SHIFT, CENTER);
      p5.rotate(p5.HALF_PI);
      p5.text(dimX.to.label, 0, 0);
      p5.pop();
      // Left label
      p5.push();
      p5.translate(LEFT - LABEL_SHIFT, CENTER);
      p5.rotate(-p5.HALF_PI);
      p5.text(dimX.from.label, 0, 0);
      p5.pop();
    }
  };
}
