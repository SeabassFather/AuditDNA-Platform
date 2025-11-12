export default function SuperDashboard() {
  return (
    <div className="grid grid-cols-2 gap-8 p-8">
      <div><MarketModule /></div>
      <div><GrowersModule /></div>
      <div><TraceabilityDashboard /></div>
      {/* etc */}
    </div>
  );
}
