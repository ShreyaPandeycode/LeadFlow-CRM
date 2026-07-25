export default function DashboardSkeleton() {
  return (
    <div className="animate-pulse">

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {[1, 2, 3, 4].map((i) => (

          <div
            key={i}
            className="bg-white rounded-2xl h-36"
          />

        ))}

      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-8">

        <div className="bg-white rounded-2xl h-96" />

        <div className="bg-white rounded-2xl h-96" />

      </div>

    </div>
  );
}