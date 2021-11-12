<script context="module">
	import { fetchBoxscores } from '$lib/supabase';

	export async function load({ page }) {
		const stats = await fetchBoxscores(page.params.gameId);
		return {
			props: {
				currentIdx: Number.parseInt(page.query.get('time') ?? '0'),
				gameId: page.params.gameId,
				stats
			}
		};
	}
</script>

<script>
	import Header from '$lib/Header.svelte';
	import Progress from '$lib/Progress.svelte';
	import TeamBox from '$lib/TeamBox.svelte';
	import FloatingActions from '$lib/FloatingActions.svelte';

	export let currentIdx;
	export let gameId;
	export let stats;

	$: sorted = stats.sort(compareGameTime);
	$: currentData = sorted[currentIdx]?.data;
	$: hasNext = currentIdx < sorted.length - 1;
	$: nextIdx = Math.min(currentIdx + 1, sorted.length - 1);
	$: hasPrevious = currentIdx > 0;
	$: previousIdx = Math.max(currentIdx - 1, 0);

	function compareGameTime(a, b) {
		if (a.data.gameStatusText === 'Final') return 1;

		if (b.data.gameStatusText === 'Final') return -1;

		const periodCompare = `${a.data.period}`.localeCompare(`${b.data.period}`);
		if (periodCompare !== 0) return periodCompare;

		const minuteCompare = a.data.gameClock.slice(2, 4).localeCompare(b.data.gameClock.slice(2, 4));
		if (minuteCompare !== 0) return -1 * minuteCompare;

		const secondCompare = a.data.gameClock.slice(5, 7).localeCompare(b.data.gameClock.slice(5, 7));
		if (secondCompare !== 0) return -1 * secondCompare;

		const subSecondCompare = a.data.gameClock.slice(8).localeCompare(b.data.gameClock.slice(8));

		return -1 * subSecondCompare;
	}
</script>

<div class="container">
	{#if currentData}
		<Header data={currentData} />
		<Progress times={sorted} {currentIdx} />
		<div class="stats">
			<table>
				<TeamBox team={currentData.awayTeam} />
				<TeamBox team={currentData.homeTeam} />
			</table>
		</div>
		<FloatingActions
			gameStatus={currentData.gameStatusText}
			nextLink={hasNext ? `/${gameId}?time=${nextIdx}` : '#'}
			prevLink={hasPrevious ? `/${gameId}?time=${previousIdx}` : '#'}
		/>
	{:else}
		<h2>No data</h2>
	{/if}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		font-size: 70%;
		height: 100%;
		justify-content: end;
	}
	.stats {
		flex: 1;
		overflow: scroll;
	}
</style>
