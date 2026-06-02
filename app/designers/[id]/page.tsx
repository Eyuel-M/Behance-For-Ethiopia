type Props = {
  params: Promise<{ id: string }>;
};

export default async function DesignerProfilePage({ params }: Props) {
  const { id } = await params;

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <div className="mb-8">
        <div className="w-20 h-20 rounded-full bg-gray-100 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900">Designer #{id}</h1>
        <p className="text-gray-500 mt-1">Specialty placeholder</p>
      </div>
      <div className="space-y-4">
        <p className="text-gray-600">Bio will appear here.</p>
        <p className="text-sm text-gray-400">Portfolio links will appear here.</p>
      </div>
    </section>
  );
}
