import { useState } from "react";
import Input from "./Input";
import "./Outcome.scss";
export default function Outcome({
  outcome,
  selectedOutcomeId,
  canRemove,
  onMouseOver,
  onClick,
  onChange,
  onRemove,
}: {
  outcome: Outcome;
  selectedOutcomeId?: string;
  canRemove: boolean;
  onMouseOver: (id: OutcomeId) => void;
  onClick: (id: OutcomeId) => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    property: keyof Outcome,
    id: OutcomeId
  ) => void;
  onRemove: (id: OutcomeId) => void;
}) {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div
      key={outcome.id}
      data-selected={outcome.id === selectedOutcomeId}
      className="outcome"
      onClick={() => onClick(outcome.id)}
      onMouseOver={() => onMouseOver(outcome.id)}
    >
      <div className="main-row">
        <Input
          label="Text"
          direction="horizontal"
          onChange={(e) => onChange(e, "text", outcome.id)}
          value={outcome.text}
        />
        <button
          type="button"
          className="collapse"
          onClick={() => setCollapsed((prev) => !prev)}
        >
          {collapsed ? "+" : "-"}
        </button>

        <button
          type="button"
          className="remove-button"
          onClick={() => onRemove(outcome.id)}
          disabled={!canRemove}
        >
          X
        </button>
      </div>
      {!collapsed && (
        <Input
          direction="horizontal"
          label="Subtext"
          onChange={(e) => onChange(e, "subtext", outcome.id)}
          value={outcome.subtext}
        />
      )}
    </div>
  );
}
