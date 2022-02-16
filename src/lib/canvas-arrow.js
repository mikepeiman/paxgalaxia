function canvas_arrow(ctx, destination, origin) {
    const dx = destination.x - origin.x;
    const dy = destination.y - origin.y;
    // const headlen = Math.sqrt( dx * dx + dy * dy ) * 0.3; // length of head in pixels, scaled by length of line
    const headlen = 30; // length of head in pixels absolute
    const angle = Math.atan2(dy, dx);
    const lineWidth = 12;
    let originOffsetByDistance = getPointOnVectorByDistance(
        destination.x,
        destination.y,
        origin.x,
        origin.y,
        destination.radius + lineWidth * 2
    );
    let originOffsetByDistanceArrowhead = getPointOnVectorByDistance(
        destination.x,
        destination.y,
        origin.x,
        origin.y,
        destination.radius + lineWidth
    );
    let destinationOffsetByDistance = getPointOnVectorByDistance(
        origin.x,
        origin.y,
        destination.x,
        destination.y,
        destination.radius + lineWidth * 2
    );

    ctx.beginPath();
    let grd = ctx.createLinearGradient(destination.x, destination.y, origin.x, origin.y);
    grd.addColorStop(0, `hsla(${origin.hue}, 50%, 50%, .75)`);
    grd.addColorStop(1, `hsla(${destination.hue}, 50%, 50%, .1)`);
    ctx.strokeStyle = grd;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.moveTo(destinationOffsetByDistance.x, destinationOffsetByDistance.y);
    ctx.lineTo(originOffsetByDistance.x, originOffsetByDistance.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.moveTo(
        originOffsetByDistanceArrowhead.x - headlen * Math.cos(angle - Math.PI / 6),
        originOffsetByDistanceArrowhead.y - headlen * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(originOffsetByDistanceArrowhead.x, originOffsetByDistanceArrowhead.y);
    ctx.lineTo(
        originOffsetByDistanceArrowhead.x - headlen * Math.cos(angle + Math.PI / 6),
        originOffsetByDistanceArrowhead.y - headlen * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fillStyle = `hsla(${origin.hue}, 50%, 50%, 1)`;
    ctx.fill();
    // context.stroke();
}

function getPositionAlongTheLine(x1, y1, x2, y2, percentage) {
    return {
        x: x1 * (1.0 - percentage) + x2 * percentage,
        y: y1 * (1.0 - percentage) + y2 * percentage
    };
}

function getPointOnVectorByDistance(x1, y1, x2, y2, distance) {
    let angle = Math.atan2(y2 - y1, x2 - x1);
    let x = x1 + Math.cos(angle) * distance;
    let y = y1 + Math.sin(angle) * distance;
    return { x, y };
}


export default canvas_arrow;