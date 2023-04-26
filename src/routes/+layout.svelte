<script>
    import { npc } from '../stores/npcstore';

	let npcName = '';

	npc.subscribe(value => {
		console.log(value);
		npcName = value ?? '';
	})
</script>

<div class="container mx-auto">
	<header><span>putsch</span><span>{npcName}</span><span><a href="/">🏠</a></span></header>
	<slot />
</div>

<style>
	@font-face {
		font-family: 'Orbitron';
		font-weight: 900;
		src: url('/fonts/orbitron.ttf');
		unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
			U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
	}
	header {
		display: flex;
		justify-content: space-between;
		font-family: 'Orbitron';
		font-weight: 900;
		font-size: 30pt;
		background-color: black;
		color: white;
		padding: 0 1rem;
		border-radius: 0.5rem;
	}

	header a {
		text-decoration: none;
	}
</style>
