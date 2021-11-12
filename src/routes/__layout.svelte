<script>
	import '../app.css';
</script>

<svelte:head>
	<title>DBR</title>
</svelte:head>

<main class="h-full bg-gray-200">
	<header class="bg-wolves-blue">
		<nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
			<div
				class="w-full py-2 flex items-center justify-between border-b border-wolves-blue lg:border-none"
			>
				<div class="flex items-center">
					<a href="/">
						<span class="text-white text-2xl">DBR</span>
					</a>
					<div class="hidden ml-10 space-x-8 lg:block" />
				</div>
				<div class="ml-10 space-x-4" />
			</div>
		</nav>
	</header>

	<slot />
</main>
