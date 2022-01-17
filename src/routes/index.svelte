<script>
	// import Time from 'svelte-time';
	import MetabrainCanvas from '$components/MetabrainCanvas.svelte';
	import { onMount } from 'svelte';
	let mounted = false;
	onMount(() => {
		mounted = true;
	});
</script>

{#if mounted}
	<div class="flex flex-col w-screen h-screen relative align-center justify-center ">
		<div class="flex flex-col z-10 w-full h-full align-center justify-center text-center">
			<h1 class="text-6xl md:text-[5rem] lg:text-[7rem] xl:text-[10rem] font-display">MetaBrain</h1>
			<div
				class="flex flex-col py-8 my-4 w-full bg-black bg-opacity-25 text-xl md:text-2xl lg:text-3xl xl:text-4xl font-montserrat"
			>
				<h2 class="p-2">One app to rule them all, one app to unite them;</h2>
				<h2 class="p-2">One app to knowledge graph, to learn and track a lifetime.</h2>
			</div>
			<!-- Begin Mailchimp Signup Form -->

			<div id="mc_embed_signup">
				<form
					action="https://mikepeiman.us7.list-manage.com/subscribe/post?u=2e0789618f3335c1fdeae5f80&amp;id=4f26dc006f"
					method="post"
					id="mc-embedded-subscribe-form"
					name="mc-embedded-subscribe-form"
					class="validate bg-none bg-transparent flex items-center justify-center w-full"
					target="_blank"
					novalidate
				>
					<div id="mc_embed_signup_scroll" class="flex items-center justify-center relative">
						<h2 class="font-newsreader text-lg text-rose-200 mx-4">Keep in touch for updates</h2>
						<!-- <div class="indicates-required"><span class="asterisk">*</span> indicates required</div> -->
						<div class="mc-field-group flex items-center justify-center relative">
							<!-- <label for="mce-EMAIL">Email Address <span class="asterisk">*</span> </label> -->
							<input
								type="email"
								value=""
								name="EMAIL"
								class="required email rounded bg-gray-800 text-gray-100 w-60"
								id="mce-EMAIL"
								placeholder="email address"
							/>
							<button
								type="submit"
								name="subscribe"
								value="Subscribe"
								id="mc-embedded-subscribe"
								class="button h-6 w-auto mx-4 p-5 rounded flex items-center justify-center text-center bg-gray-900 hover:bg-gray-800/75 text-winterblues-400"
								>Subscribe</button
							>
						</div>
						<div id="mce-responses" class="clear foot transition absolute -top-8">
							<div class="response h-8 block absolute -top-6 translate-y-8 w-60" id="mce-error-response" style="opacity:0;" />
							<div class="response h-8" id="mce-success-response" style="h-8 opacity:0;" />
						</div>
						<!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
						<div style="position: absolute; left: -5000px;" aria-hidden="true">
							<input
								type="text"
								name="b_2e0789618f3335c1fdeae5f80_4f26dc006f"
								tabindex="-1"
								value=""
							/>
						</div>
						<div class="optionalParent">
							<div class="clear foot">
								<!-- <input
									type="submit"
									value="Subscribe"
									name="subscribe"
									id="mc-embedded-subscribe"
									class="button"
								/> -->
							</div>
						</div>
					</div>
				</form>
			</div>
			<script
				type="text/javascript"
				src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"></script><script
				type="text/javascript">
				(function ($) {
					window.fnames = new Array();
					window.ftypes = new Array();
					fnames[0] = 'EMAIL';
					ftypes[0] = 'email';
					fnames[1] = 'FNAME';
					ftypes[1] = 'text';
					fnames[2] = 'LNAME';
					ftypes[2] = 'text';
					fnames[3] = 'ADDRESS';
					ftypes[3] = 'address';
					fnames[4] = 'PHONE';
					ftypes[4] = 'phone';
				})(jQuery);
				var $mcj = jQuery.noConflict(true);
			</script>
			<!--End mc_embed_signup-->
		</div>
		<div class="absolute w-screen h-screen top-0 left-0 ">
			<!-- <MetabrainCanvas /> -->
		</div>
	</div>
{/if}

<style global lang="scss">
	// #mc-embedded-subscribe-form {

	// 	background: #222;
	// }
</style>
