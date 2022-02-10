<script>
    import {onMount} from 'svelte';

    onMount(() => {

        const frame = new Frame(FIT, 1024, 768, light, dark);
        frame.on('ready', () => {
            const stage = frame.stage;
            let stageW = frame.width;
            let stageH = frame.height;
    
            // put your code here
            // new Circle(100, blue).center().drag();
            new Tile(new Poly(36,6), 12,12).center().drag()
            stage.update(); // needed to view changes
        });
    })
</script>

<svelte:head>
	<script src="https://zimjs.org/cdn/nft/01/zim.js"></script>
</svelte:head>

<h1>ZIM</h1>
