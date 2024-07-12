function HighlightCard() {
  return (
    <div className="rounded-xl p-4 bg-card border border-border">
      <h1> 012商业周刊MBA排名(Businessweek MBA Ranking 2012) - 国际MBA</h1>
      <h2 className="text-sm"> 012商业周刊MBA排名(Businessweek MB</h2>
    </div>
  );
}

export default function HighlightArea() {
  return (
    <>
      <p className="text-2xl font-bold mb-5">Feature</p>
      <div className="flex flex-col gap-4">
        <HighlightCard />
        <HighlightCard />
        <HighlightCard />
        <HighlightCard />
        <HighlightCard />
      </div>
    </>
  );
}
