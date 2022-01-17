<main class="flex flex-col">
    <slot />
</main>

<style lang="scss">
body {
    min-width: 15rem;
    min-height: 100vh;
    text-rendering: optimizeSpeed;
    background: black;
}

#app-layout {
    background: black;
}

.homepage {
    max-width: 100vw;
}
</style>