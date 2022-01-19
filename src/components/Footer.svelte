<script>
    export let bgColor = 'bg-[#222222]'
    export let textColor = 'text-gray-300'
    import Icon from '@iconify/svelte';
    let icons =       {
            github: 'carbon:logo-github',
    }
    

</script>

<div class="footer flex bg-black/60 {textColor} w-full self-end font-display text-base flex align-middle items-center justify-between h-20 relative z-20">
    <!-- <button class="logo btn btn-outline place-content-center mx-5 p-5 rounded-lg bg-blue-700">Footer</button> -->
    <nav class="social w-full flex items-end m-0 justify-center xl:pl-24">
        <a href="https://www.mikepeiman.dev" target="_blank" class="pointer font-mono text-base  text-winterblues-700 hover:text-winterblues-400 hover:font-bold">
            <div class="">Made with <span class="text-rose-500 text-lg px-1.5">♥</span> by Mike Peiman.</div>
        </a>
        <a href="https://github.com/mikepeiman/metabrain" target="_blank" class="w-8 h-8  text-winterblues-700 hover:text-winterblues-400 transition m-0 "><Icon icon={icons.github} class="w-8 h-8 ml-2 -mt-1" /></a>
        <!-- <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/creative">Creative</a> -->
    </nav>
</div>

<style lang="scss">
    // :global(.footer) {
    //     // grid-area: footer;
    //     display: grid;
    //     grid-template-areas:
    //     'logo social end';
    //     grid-template-columns: 1fr 10fr 1fr;
    //     min-height: 80px;
    // }

    .logo {
        grid-area: logo;
    }
    nav {
        grid-area: social;
        a {
            text-decoration: none;
            font-weight: 500;
        }
    }

    h1 {
        font-size: 3rem;
        font-weight: 800;
        background: -webkit-linear-gradient(0deg, rgba(72,0,36,1) 0%,rgba(9,121,121,1) 25%, rgba(121,121,155,1) 50%, rgba(121,9,121,1) 75%, rgba(2,0,76,1) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

</style>