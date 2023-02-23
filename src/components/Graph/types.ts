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

export type GraphInfo = {
  dimX: Dimension;
  dimY: Dimension;
};

export type IncomingSketchProps = {
  info: GraphInfo;
  dark?: boolean;
  onAdjust?: (graphInfo: GraphInfo) => void;
  onSelectOutcome?: (grid: OutcomeGrid) => void;
  outcomeGrid?: OutcomeGrid;
  selectedOutcomeId?: string;
};
