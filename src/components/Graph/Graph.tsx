import {
  P5CanvasInstance,
  ReactP5Wrapper,
  SketchProps,
} from "react-p5-wrapper";
import "./Graph.scss";
import { Dimension, GraphInfo, IncomingSketchProps } from "./types";

export const RESULT_TO_TEXT = [
  "N/A",
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree",
];
export const OUTCOME_DIM = 20;

function sketch(p5: P5CanvasInstance<SketchProps & IncomingSketchProps>) {
  const LINES = 21;
  const LABEL_SHIFT = 6;
  const LABEL_SIZE = 20;
  const PAD = 50;
  const CONTROL_POINT_DIAMETER = 12;
  let CELL_SIZE: number;
  let CENTER: number;
  let LEFT: number;
  let RIGHT: number;
  let TOP: number;
  let BOTTOM: number;
  let dimX: Dimension;
  let dimY: Dimension;
  let onAdjust: ((graphInfo: GraphInfo) => void) | undefined;
  let cP: "from" | "to" | undefined;
  let onSelectOutcome: ((grid: OutcomeGrid) => void) | undefined;
  let outcomeGrid: OutcomeGrid | undefined;
  let selectedOutcomeId: OutcomeId | undefined;
  let selecting: boolean;
  let dark: boolean;

  p5.setup = () => {
    const canvas = p5.createCanvas(300, 300);
    (canvas.elt as HTMLCanvasElement).onselectstart = function (e) {
      // stop not-allowed cursor from showing up on drag
      return false;
    };
    LEFT = PAD;
    RIGHT = p5.width - PAD;
    TOP = PAD;
    BOTTOM = p5.height - PAD;
    CENTER = p5.width / 2;
    CELL_SIZE = (p5.width - PAD * 2) / OUTCOME_DIM;
    p5.textFont("Josefin Sans");
    p5.frameRate(24);
  };

  p5.updateWithProps = (props: SketchProps & IncomingSketchProps) => {
    if (props.info) {
      dimX = props.info.dimX;
      dimY = props.info.dimY;
    }
    onAdjust = props.onAdjust;
    dark = props.dark ?? false;
    onSelectOutcome = props.onSelectOutcome;
    outcomeGrid = props.outcomeGrid;
    selectedOutcomeId = props.selectedOutcomeId;
  };

  function getControlPointFrom() {
    return {
      x: p5.map(dimX.from.value, -1, 1, LEFT, RIGHT),
      y: p5.map(dimY.from.value, -1, 1, BOTTOM, TOP),
    };
  }

  function getControlPointTo() {
    return {
      x: p5.map(dimX.to.value, -1, 1, LEFT, RIGHT),
      y: p5.map(dimY.to.value, -1, 1, BOTTOM, TOP),
    };
  }

  p5.draw = () => {
    // @ts-ignore clear is expecting 4 args, but it doesn't need them
    p5.clear();

    /**
     * Axes
     */
    p5.strokeCap(p5.SQUARE);
    p5.stroke(!dark ? "#ffffff44" : "#222222");
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

    if (onAdjust && dimX && dimY) {
      // In control point adjustment mode
      const cPFrom = getControlPointFrom();
      const cPTo = getControlPointTo();

      for (let r = 1; r <= 5; r++) {
        // draw point
        const x = p5.map(r, 1, 5, cPFrom.x, cPTo.x);
        const y = p5.map(r, 1, 5, cPFrom.y, cPTo.y);
        const d =
          r === 1 || r === 5
            ? CONTROL_POINT_DIAMETER
            : CONTROL_POINT_DIAMETER * 0.5;

        if (r === 1 || r === 5) {
          p5.noStroke();
          p5.fill(!dark ? "ffffff" : "#000000");
        } else {
          p5.noFill();
          p5.strokeWeight(2);
          p5.stroke(!dark ? "ffffff" : "#000000");
        }
        p5.circle(x, y, d);

        // draw label
        p5.textSize(12);
        p5.noStroke();
        if (x > p5.width / 2) {
          if (dark) {
            const textWidth = p5.textWidth(RESULT_TO_TEXT[r]);
            p5.fill("#ffffff");
            p5.rect(x - textWidth - 10 - 2, y - 7, textWidth + 4, 13);
          }
          p5.fill(!dark ? "#ffffff" : "#000000");
          p5.textAlign(p5.RIGHT, p5.CENTER);
          p5.text(RESULT_TO_TEXT[r], x - 10, y);
        } else {
          if (dark) {
            const textWidth = p5.textWidth(RESULT_TO_TEXT[r]);
            p5.fill("#ffffff");
            p5.rect(x + 10 - 2, y - 7, textWidth + 4, 13);
          }
          p5.fill(!dark ? "#ffffff" : "#000000");
          p5.textAlign(p5.LEFT, p5.CENTER);
          p5.text(RESULT_TO_TEXT[r], x + 10, y);
        }
      }
    } else if (onSelectOutcome && outcomeGrid) {
      for (let r = 0; r < OUTCOME_DIM; r++) {
        for (let c = 0; c < OUTCOME_DIM; c++) {
          const outcomeId = outcomeGrid[r][c];
          p5.noStroke();
          if (outcomeId === selectedOutcomeId) {
            p5.fill(dark ? "black" : "white");
            const x = LEFT + c * CELL_SIZE;
            const y = TOP + r * CELL_SIZE;
            p5.rect(x, y, CELL_SIZE, CELL_SIZE);
          }
        }
      }
    } else if (!onAdjust && dimX && dimY) {
      // User result point
      if (typeof dimX.value === "number" && typeof dimY.value === "number") {
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
        p5.fill(!dark ? "#ffffff" : "#000000");
        p5.circle(x, y, 12);
      }
    }

    /**
     * Labels around the sides
     */
    p5.noStroke();
    p5.fill(!dark ? "#ffffff" : "#000000");
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
  };

  function selectOutcomeAtPoint(x: number, y: number) {
    if (onSelectOutcome && outcomeGrid && selectedOutcomeId) {
      if (x >= LEFT && x <= RIGHT && y >= TOP && y <= BOTTOM) {
        const r = p5.floor(p5.map(y, TOP, BOTTOM, 0, OUTCOME_DIM));
        const c = p5.floor(p5.map(x, LEFT, RIGHT, 0, OUTCOME_DIM));
        const selected = selectedOutcomeId;
        onSelectOutcome(
          outcomeGrid.map((row, ri) => {
            return row.map((alreadySelectedId, ci) => {
              if (r === ri && c === ci) {
                return selected;
              }
              return alreadySelectedId;
            });
          })
        );
      }
    }
  }

  p5.mousePressed = () => {
    if (onAdjust && dimX && dimY) {
      const cPFrom = getControlPointFrom();
      const dFrom = p5.dist(cPFrom.x, cPFrom.y, p5.mouseX, p5.mouseY);
      if (dFrom < CONTROL_POINT_DIAMETER / 2) {
        cP = "from";
        return;
      }
      const cPTo = getControlPointTo();
      const dTo = p5.dist(cPTo.x, cPTo.y, p5.mouseX, p5.mouseY);
      if (dTo < CONTROL_POINT_DIAMETER / 2) {
        cP = "to";
        return;
      }
    } else if (onSelectOutcome && outcomeGrid && selectedOutcomeId) {
      selectOutcomeAtPoint(p5.mouseX, p5.mouseY);
      selecting = true;
    }
  };

  p5.mouseDragged = () => {
    if (onAdjust && dimX && dimY && (cP === "from" || cP === "to")) {
      const nextCP = {
        x: p5.map(p5.mouseX, LEFT, RIGHT, -1, 1, true),
        y: p5.map(p5.mouseY, BOTTOM, TOP, -1, 1, true),
      };
      onAdjust({
        dimX: {
          from: {
            label: dimX.from.label,
            value: cP === "from" ? nextCP.x : dimX.from.value,
          },
          to: {
            label: dimX.to.label,
            value: cP === "to" ? nextCP.x : dimX.to.value,
          },
        },
        dimY: {
          from: {
            label: dimY.from.label,
            value: cP === "from" ? nextCP.y : dimY.from.value,
          },
          to: {
            label: dimY.to.label,
            value: cP === "to" ? nextCP.y : dimY.to.value,
          },
        },
      });
    } else if (selecting) {
      selectOutcomeAtPoint(p5.mouseX, p5.mouseY);
    }
  };

  p5.mouseReleased = () => {
    cP = undefined;
    selecting = false;
  };
}

export default function Graph({ ...rest }: IncomingSketchProps) {
  return <ReactP5Wrapper sketch={sketch} {...rest} />;
}
