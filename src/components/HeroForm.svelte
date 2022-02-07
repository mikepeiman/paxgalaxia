<script >
	async function handleSubmit(event) {
		const form = new FormData(event.target);
		// const data = form.getAll();
		const formData = Object.fromEntries(form.entries());
        console.log(`🚀 ~ file: HeroForm.svelte ~ line 6 ~ handleSubmit ~ formData`, formData)
        let jsonData = JSON.stringify(formData);
        console.log(`🚀 ~ file: HeroForm.svelte ~ line 8 ~ handleSubmit ~ jsonData`, jsonData)
        const res = await fetch('/api/heroes.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const json = await res.json();
        console.log(`🚀 ~ file: HeroForm.svelte ~ line 15 ~ handleSubmit ~ json`, json)
	}
</script>

<form action="" on:submit|preventDefault|stopPropagation={handleSubmit}>
	<input type="text" name="name" />
	<input type="text" name="attribute" />
	<input type="text" name="hitpoints" />
    <button type="submit">SUBMIT</button>
</form>

<style lang="scss">
input {
    color: black;
}
</style>
