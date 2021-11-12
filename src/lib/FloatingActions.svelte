<script>
	export let gameStatus;
	export let nextLink;
	export let prevLink;
</script>

<div class="mt-20">
	<div class="fixed bottom-0 left-0 right-0 h-20 p-2">
		<div class="absolute left-0 top-0 h-full w-full bg-gray-400 opacity-70" />
		<div class="relative flex justify-between items-center">
			<a
				class="rounded-full h-16 w-16 bg-wolves-blue text-white text-5xl flex justify-center items-center"
				href={prevLink ?? '#'}>&larr;</a
			>
			<span class="text-2xl">{gameStatus}</span>
			<a
				class="rounded-full h-16 w-16 bg-wolves-green text-white text-5xl flex justify-center items-center"
				href={nextLink ?? '#'}>&rarr;</a
			>
		</div>
	</div>
</div>
