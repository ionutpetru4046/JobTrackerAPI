import { STATUS_LABELS, STATUS_COLORS } from "../../utils/constants";

const colorMap = {
  blue: { background: "#dbeafe", color: "#1d4ed8" },
  yellow: { background: "#fef9c3", color: "#a16207" },
  green: { background: "#dcfce7", color: "#15803d" },
  red: { background: "#fee2e2", color: "#b91c1c" },
};

export default function StatusBadge({ status }) {
  const color = STATUS_COLORS[status] || "blue";
  const style = colorMap[color];
  return (
    <span style={{
      ...style,
      padding: "2px 10px",
      borderRadius: "999px",
      fontSize: "0.75rem",
      fontWeight: 600,
      textTransform: "capitalize",
    }}>
      {STATUS_LABELS[status] || status}
    </span>
  );
}