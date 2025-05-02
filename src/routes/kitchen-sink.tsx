import { Link, createFileRoute } from "@tanstack/react-router";

interface Props {}

const KitchenSink = ({}: Props) => {
	return (
		<div className="space-y-8">
			<h1 className="mb-8 text-4xl font-bold">Kitchen Sink</h1>

			<div className="space-y-8">
				{/* Typography Section */}
				<section>
					<h2 className="mb-4 text-2xl font-semibold">Typography</h2>
					<div className="space-y-2">
						<h1 className="text-4xl">Heading 1</h1>
						<h2 className="text-3xl">Heading 2</h2>
						<h3 className="text-2xl">Heading 3</h3>
						<h4 className="text-xl">Heading 4</h4>
						<p className="text-base">Regular paragraph text</p>
						<p className="text-sm">Small text</p>
						<p className="text-xs">Extra small text</p>
					</div>
				</section>

				{/* Buttons Section */}
				<section>
					<h2 className="mb-4 text-2xl font-semibold">Buttons</h2>
					<div className="flex flex-wrap gap-4">
						<button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
							Primary Button
						</button>
						<button className="rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300">
							Secondary Button
						</button>
						<button className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-100">
							Outline Button
						</button>
						<button className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
							Danger Button
						</button>
					</div>
				</section>

				{/* Form Elements Section */}
				<section>
					<h2 className="mb-4 text-2xl font-semibold">Form Elements</h2>
					<div className="max-w-md space-y-4">
						<div>
							<label className="mb-1 block text-sm font-medium">
								Text Input
							</label>
							<input
								type="text"
								className="w-full rounded border px-3 py-2"
								placeholder="Enter text"
							/>
						</div>
						<div>
							<label className="mb-1 block text-sm font-medium">Select</label>
							<select className="w-full rounded border px-3 py-2">
								<option>Option 1</option>
								<option>Option 2</option>
								<option>Option 3</option>
							</select>
						</div>
						<div>
							<label className="flex items-center space-x-2">
								<input type="checkbox" className="rounded" />
								<span>Checkbox</span>
							</label>
						</div>
						<div>
							<label className="flex items-center space-x-2">
								<input type="radio" name="radio" className="rounded-full" />
								<span>Radio Button</span>
							</label>
						</div>
					</div>
				</section>

				{/* Cards Section */}
				<section>
					<h2 className="mb-4 text-2xl font-semibold">Cards</h2>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
						<div className="rounded-lg border p-4 shadow-sm">
							<h3 className="mb-2 text-xl font-semibold">Card Title</h3>
							<p className="text-gray-600">
								This is a basic card with some content.
							</p>
						</div>
						<div className="rounded-lg border p-4 shadow-sm">
							<h3 className="mb-2 text-xl font-semibold">Card Title</h3>
							<p className="text-gray-600">
								This is a basic card with some content.
							</p>
						</div>
						<div className="rounded-lg border p-4 shadow-sm">
							<h3 className="mb-2 text-xl font-semibold">Card Title</h3>
							<p className="text-gray-600">
								This is a basic card with some content.
							</p>
						</div>
					</div>
				</section>

				{/* Navigation */}
				<section>
					<h2 className="mb-4 text-2xl font-semibold">Navigation</h2>
					<div className="flex space-x-4">
						<Link to="/" className="text-blue-500 hover:text-blue-600">
							Home
						</Link>
						<Link
							to="/kitchen-sink"
							className="text-blue-500 hover:text-blue-600"
						>
							Kitchen Sink
						</Link>
					</div>
				</section>
			</div>
		</div>
	);
};

export default KitchenSink;

export const Route = createFileRoute("/kitchen-sink")({
	component: () => <KitchenSink />,
});
