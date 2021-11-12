<script>
	export let data;
</script>

<div class="h-12 grid grid-cols-3 px-2">
	<div class="grid grid-cols-2">
		<div class="flex justify-end items-center text-base font-bold">{data.awayTeam.teamTricode}</div>
		<div class="flex text-3xl font-thin justify-center items-center">{data.awayTeam.score}</div>
	</div>
	<div class="text-base flex justify-center items-center">{data.gameStatusText}</div>
	<div class="grid grid-cols-2">
		<div class="flex text-3xl font-thin justify-center items-center">{data.homeTeam.score}</div>
		<div class="flex items-center text-base font-bold">{data.homeTeam.teamTricode}</div>
	</div>
</div>
