<script context="module">
	// import * as PIXI from 'pixi.js';
	// const app = new PIXI.Application({ transparent: true });
	// const graphics = new PIXI.Graphics();

	import { defineGrid, extendHex } from 'honeycomb-grid';

	// document.body.appendChild(app.view);
	// set a line style of 1px wide and color #999
	// graphics.lineStyle(1, 0x999999);
	const hex = extendHex({ size: 50 });
	const Grid = defineGrid(hex);
	Grid.rectangle({ width: 12, height: 12 }).forEach((hex) => {
        console.log(`🚀 ~ file: grid.svelte ~ line 14 ~ Grid.rectangle ~ hex`, hex)
		// const point = hex.toPoint();
		// // add the hex's position to each of its corner points
		// const corners = hex.corners().map((corner) => corner.add(point));
		// // separate the first from the other corners
		// const [firstCorner, ...otherCorners] = corners;

		// // move the "pen" to the first corner
		// graphics.moveTo(firstCorner.x, firstCorner.y);
		// // draw lines to the other corners
		// otherCorners.forEach(({ x, y }) => graphics.lineTo(x, y));
		// // finish at the first corner
		// graphics.lineTo(firstCorner.x, firstCorner.y);

		// app.stage.addChild(graphics);
	});
</script>
