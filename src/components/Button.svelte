<script>
    export let label = "Simple Button";
    export let color = 'bg-sky-600'
    export let hoverColor = 'bg-fuchsia-400'
</script>
<button class="{color} hover:bg-sky-400 {`hover:${hoverColor}`} p-2 rounded" >{label}</button>
