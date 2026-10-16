import { neuralUnits } from "@/app/content/technical-preview";

export function NeuralChart({
  unit = "t1c1",
  start = 0,
  end = 20,
  rate = false,
  compact = false,
}: {
  unit?: string;
  start?: number;
  end?: number;
  rate?: boolean;
  compact?: boolean;
}) {
  const selected =
    neuralUnits.find((item) => item.id === unit) ?? neuralUnits[0];
  const span = end - start;
  const points = selected.rates.slice(start, end);
  const maximum = Math.max(...points, 5);
  const x = (t: number) => 64 + ((t - start) / span) * 570;
  return (
    <svg
      viewBox="0 0 670 318"
      role="img"
      aria-label={
        rate
          ? `Firing rate for ${unit}, ${start} to ${end} seconds, in hertz`
          : `Spike raster for eight recorded units, ${start} to ${end} seconds. Selected unit ${unit}.`
      }
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <line
            x1={64 + i * 142.5}
            x2={64 + i * 142.5}
            y1="22"
            y2="272"
            stroke="#d7e5e2"
            strokeDasharray="3 5"
          />
          <text
            x={64 + i * 142.5}
            y="297"
            textAnchor="middle"
            fill="#506a67"
            fontSize="12"
          >
            {start + (span * i) / 4}
          </text>
        </g>
      ))}
      {rate ? (
        <>
          <text x="10" y="25" fill="#506a67" fontSize="12">
            Hz
          </text>
          {[0, 1, 2].map((i) => (
            <text
              key={i}
              x="52"
              y={274 - i * 120}
              textAnchor="end"
              fill="#506a67"
              fontSize="12"
            >
              {(maximum * i) / 2}
            </text>
          ))}
          <polyline
            points={points
              .map(
                (v, i) => `${x(start + i + 0.5)},${272 - (v / maximum) * 240}`,
              )
              .join(" ")}
            fill="none"
            stroke="#147a73"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {points.map((value, i) => (
            <circle
              key={i}
              cx={x(start + i + 0.5)}
              cy={272 - (value / maximum) * 240}
              r="3.2"
              fill="#147a73"
            />
          ))}
        </>
      ) : (
        neuralUnits.map((row, i) => (
          <g key={row.id}>
            {row.id === unit && (
              <rect
                x="0"
                y={19 + i * 31}
                width="660"
                height="29"
                rx="3"
                fill="#dfeee9"
              />
            )}
            <text
              x="50"
              y={38 + i * 31}
              textAnchor="end"
              fill="#345651"
              fontSize="12"
              fontWeight={row.id === unit ? 700 : 400}
            >
              {row.id}
            </text>
            {row.spikes
              .filter((t) => t >= start && t < end)
              .map((t) => (
                <line
                  key={t}
                  x1={x(t)}
                  x2={x(t)}
                  y1={26 + i * 31}
                  y2={41 + i * 31}
                  stroke={
                    row.id === unit ? "#176b60" : i % 2 ? "#487da0" : "#4c9a90"
                  }
                  strokeWidth={compact ? 2.3 : 1.7}
                />
              ))}
          </g>
        ))
      )}
      <text x="650" y="297" fill="#506a67" fontSize="12">
        s
      </text>
    </svg>
  );
}
