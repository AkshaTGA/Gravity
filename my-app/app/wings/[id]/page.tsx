type PageProps = {
	params: { id: string }
}

export default function WingDetailPage({ params }: PageProps) {
	const { id } = params
	return (
		<div className="max-w-3xl mx-auto px-6 py-12">
			<h1 className="text-3xl font-bold">Wing: {id}</h1>
			<p className="mt-4 text-gray-600">
				This dynamic page is under construction.
			</p>
		</div>
	)
}

