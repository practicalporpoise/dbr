<script context="module">
	import { fetchGames } from '$lib/supabase';

	export async function load({ page }) {
		const gameDays = await fetchGames();
		return {
			props: {
				currentDate: page.query.get('date'),
				gameDays
			}
		};
	}
</script>

<script>
	export let currentDate;
	export let gameDays;

	let selectedGameDate = currentDate ?? gameDays[0]?.date;
	$: selectedGame = gameDays.find((gameDay) => gameDay.date === selectedGameDate);
	$: sortedGames = selectedGame.data.sort((a, b) => {
		if ([a.awayTeam.teamTricode, a.homeTeam.teamTricode].includes('MIN')) return -1;
		if ([b.awayTeam.teamTricode, b.homeTeam.teamTricode].includes('MIN')) return 1;
		return a.gameId.localeCompare(b.gameId);
	});
</script>

<div class="pt-3">
	<form class="flex justify-between gap-4 h-12 px-2">
		<label class="flex items-center whitespace-nowrap" for="game">Game Date: </label>
		<select
			class="block w-full pl-3 pr-10 py-2 bg-white text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-sm"
			id="game"
			name="game"
			bind:value={selectedGameDate}
			required
		>
			{#each gameDays as gameDay}
				<option value={gameDay.date}>{gameDay.date}</option>
			{/each}
		</select>
	</form>
	{#if selectedGame}
		<ul class="grid grid-cols-1 gap-2 py-3 bg-gray-200">
			{#each sortedGames as game}
				<li
					class="relative border border-gray-300 bg-white shadow-sm flex items-center space-x-3 hover:border-gray-500 hover:shadow-md focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
				>
					<a href={game.gameStatus === 1 ? '#' : `/${game.gameId}`} class="w-full px-2 py-5">
						<div class="grid grid-cols-3 w-full ">
							<span class="text-right text-xl">{game.awayTeam.teamName}</span>
							<span class="text-center font-light">vs.</span>
							<span class="text-xl">{game.homeTeam.teamName}</span>
						</div>
						<div class="text-center text-xs font-bold pt-1">
							{game.gameStatusText}
						</div>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>
