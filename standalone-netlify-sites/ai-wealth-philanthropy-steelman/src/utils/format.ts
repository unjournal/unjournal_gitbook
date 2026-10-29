export function formatBillions(value: number): string {
  if (value < 0.01) {
    return `$${Math.round(value * 1000)}M`;
  }
  if (value < 1) {
    const needsThreeDecimals = Math.abs(value * 100 - Math.round(value * 100)) > Number.EPSILON;
    return `$${value.toFixed(needsThreeDecimals ? 3 : 2)}B`;
  }
  return `$${value.toFixed(1)}B`;
}

export function formatInputValue(value: number, suffix: "B" | "%" | "x"): string {
  if (suffix === "B") {
    return `$${value.toLocaleString(undefined, { maximumFractionDigits: 1 })}B`;
  }
  if (suffix === "%") {
    return `${value.toLocaleString(undefined, { maximumFractionDigits: 1 })}%`;
  }
  return `${value.toLocaleString(undefined, { maximumFractionDigits: 1 })}x`;
}

export function formatPercent(probability: number): string {
  return `${Math.round(probability * 100)}%`;
}
