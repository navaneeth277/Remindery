// File: src/components/MoodHeatmap.jsx
const moodMap = {
  1: "bg-red-300",
  2: "bg-orange-300",
  3: "bg-yellow-300",
  4: "bg-green-300",
  5: "bg-emerald-400",
};

const dummyData = [
  3, 4, 5, 2, 1, 4, 3,
  2, 5, 4, 4, 3, 1, 1,
  2, 3, 2, 3, 4, 1, 2,
  4, 4, 4, 2, 2, 1, 3
];

export default function MoodHeatmap() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Mood Heatmap</h2>
      <div className="grid grid-cols-7 gap-1 text-center">
        {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
          <div className="font-bold" key={d}>{d}</div>
        ))}
        {dummyData.map((mood, i) => (
          <div
            key={i}
            className={`w-10 h-10 flex items-center justify-center text-xs font-bold rounded ${moodMap[mood]}`}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

