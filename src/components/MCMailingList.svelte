<script>
	let email = '';
	$: email.length > 3 ? fadeMceError() : '';
	$: console.log(`🚀 ~ file: index.svelte ~ line 28 ~ email`, email);
	// import jQuery from '$lib/jquery-3.6.0.min.js';
	function fadeMceError() {
		let mceResponses = document.querySelectorAll('#mce-responses');
		console.log(
			`🚀 ~ file: MCMailingList.svelte ~ line 8 ~ fadeMceError ~ mceResponses`,
			mceResponses
		);
		// let mceError = document.getElementById('mce-error-response')
		let mceError = document.querySelectorAll('.mce_inline_error');
		if (mceError) {
			console.log(`🚀 ~ file: index.svelte ~ line 30 ~ fadeMceError ~ mceError`, mceError);
			console.log(
				`🚀 ~ file: index.svelte ~ line 30 ~ fadeMceError ~ mceError length `,
				mceError.length
			);
		}
		console.log(`🚀 ~ file: index.svelte ~ line 33 ~ fadeMceError ~ email`, email);
		if (
			email.length > 3 &&
			mceError.length > 1 &&
			![...mceError[1].classList][0].includes('fadeOut')
		) {
			console.log(
				`🚀 ~ file: MCMailingList.svelte ~ line 17 ~ fadeMceError ~ mceError[1].classList`,
				mceError[1].classList
			);
			console.log(
				`🚀 ~ file: MCMailingList.svelte ~ line 17 ~ fadeMceError ~ [...mceError[1].classList]`,
				[...mceError[1].classList]
			);
			mceError[1].classList.add('fadeOut');
		}
	}

	function onKeyUpMCE(e) {
		// run signupSumbit if keypress is enter
		if (e.keyCode === 13) {
			signupSubmit();
		}
	}
	function onBlurMCE() {
		let mceResponses = document.querySelectorAll('#mce-responses');
		console.log(
			`🚀 ~ file: MCMailingList.svelte ~ line 21 ~ onBlurMCE ~ mceResponses`,
			mceResponses
		);
		// let mceError = document.getElementById('mce-error-response')
		let mceError = document.querySelectorAll('.mce_inline_error');
		let mceSuccessResponse = document.querySelector('#mce-success-response');
		![...mceSuccessResponse.classList].includes('fadeOut')
			? mceSuccessResponse.classList.add('fadeOut')
			: '';
		if (mceError.length > 1 && email.length > 1) {
			console.log(`🚀 ~ file: index.svelte ~ line 30 ~ onBlurMCE ~ mceError`, mceError);
			console.log(
				`🚀 ~ file: index.svelte ~ line 30 ~ onBlurMCE ~ mceError length `,
				mceError.length
			);
			mceError[1].classList.remove('fadeOut');
		} else {
            mceError[1].classList.add('fadeOut');
        }

		// console.log(`🚀 ~ file: index.svelte ~ line 33 ~ onBlurMCE ~ email`, email);
		// if (email.length < 4) {
		// 	mceError[1].classList.remove('fadeOut');
		// }
	}

	function signupSubmit() {
		let mceResponses = document.querySelector('#mce-responses');
		let mceErrorResponse = document.querySelector('#mce-error-response');
		let mceSuccessResponse = document.querySelector('#mce-success-response');
		let closeIcon = document.querySelector('#mce-close');

		// console.log(`🚀 ~ file: MCMailingList.svelte ~ line 43 ~ signupSubmit ~ closeIcon`, closeIcon);
		// console.log(
		// 	`🚀 ~ file: MCMailingList.svelte ~ line 77 ~ signupSubmit ~ mceSuccessResponse`,
		// 	mceSuccessResponse
		// );
		// console.log(
		// 	`🚀 ~ file: MCMailingList.svelte ~ line 77 ~ signupSubmit ~ mceSuccessResponse.innerText`,
		// 	mceSuccessResponse.innerText
		// );
		// console.log(
		// 	`🚀 ~ file: MCMailingList.svelte ~ line 77 ~ signupSubmit ~ mceSuccessResponse.innerText.length`,
		// 	mceSuccessResponse.innerText.length
		// );

		mceSuccessResponse.classList.remove('fadeOut');
		let mceError = document.querySelectorAll('.mce_inline_error');
		console.log(`🚀 ~ file: MCMailingList.svelte ~ line 81 ~ signupSubmit ~ mceError`, mceError);
		if (mceError.length > 1) {
			mceError[1].classList.add('fadeOut');
		}
		// if (mceSuccessResponse.innerText.length > 0) {
		mceSuccessResponse.innerText =
			'You have successfully subscribed to our mailing list, thank you!';

		closeIcon.classList.remove('-right-[1000px]');
		closeIcon.classList.remove('-top-[1000px]');
		closeIcon.style = 'top: 3rem; right: 2px;';
		// closeIcon.classList.remove('fadeOut');
		mceSuccessResponse.appendChild(closeIcon);
		// }

		if (mceErrorResponse) {
			console.log(
				`🚀 ~ file: MCMailingList.svelte ~ line 44 ~ signupSubmit ~ mceErrorResponse`,
				mceErrorResponse
			);
			mceErrorResponse.classList.remove('fadeOut');
			closeIcon.classList.remove('-right-[1000px]');
			closeIcon.classList.remove('-top-[1000px]');
			closeIcon.style = 'top: 3rem; right: 2px;';
			closeIcon.classList.remove('fadeOut');
			console.log(
				`🚀 ~ file: MCMailingList.svelte ~ line 47 ~ signupSubmit ~ mceErrorResponse`,
				mceErrorResponse
			);
		}
		console.log(
			`🚀 ~ file: MCMailingList.svelte ~ line 29 ~ signupSubmit ~ mceResponses`,
			mceResponses
		);
		let close = document.createElement('button');
		close.classList.add('close');
		close.innerHTML = '&times;';

		if (mceResponses.children) {
			console.log(
				`🚀 ~ file: index.svelte ~ line 30 ~ signupSubmit ~ mceResponses[0].children`,
				mceResponses.children
			);
			mceResponses.children[0].classList.remove('fadeOut');
			setTimeout(() => {
				mceResponses.appendChild(closeIcon);
			}, 100);
		}
	}

	function closeMessage(e) {
		e.target;
		console.log(`🚀 ~ file: MCMailingList.svelte ~ line 34 ~ closeMessage ~ e.target`, e.target);
		let closeIcon = document.querySelector('#mce-close');
		// closeIcon.classList.add('-right-[1000px]')
		// closeIcon.classList.add('-top-[1000px]')
		setTimeout(() => {
			closeIcon.style = 'top: -5000px; right: -5000px;';
		}, 300);
		closeIcon.classList.add('fadeOut');
		let mceResponses = document.querySelector('#mce-responses');
		console.log(
			`🚀 ~ file: MCMailingList.svelte ~ line 143 ~ closeMessage ~ mceResponses`,
			mceResponses
		);
		let mceErrorResponse = document.querySelector('#mce-error-response');
		console.log(
			`🚀 ~ file: MCMailingList.svelte ~ line 145 ~ closeMessage ~ mceErrorResponse`,
			mceErrorResponse
		);
		let mceError = document.querySelectorAll('.mce_inline_error');
		console.log(`🚀 ~ file: MCMailingList.svelte ~ line 147 ~ closeMessage ~ mceError`, mceError);
		setTimeout(() => {
			mceErrorResponse.classList.add('fadeOut');
			mceResponses.classList.add('fadeOut');
			mceError[1] ? mceError[1].classList.add('fadeOut') : null;
		}, 50);
		email = '';
	}

	// (function ($) {
	// 	window.fnames = new Array();
	// 	window.ftypes = new Array();
	// 	fnames[0] = 'EMAIL';
	// 	ftypes[0] = 'email';
	// 	fnames[1] = 'FNAME';
	// 	ftypes[1] = 'text';
	// 	fnames[2] = 'LNAME';
	// 	ftypes[2] = 'text';
	// 	fnames[3] = 'ADDRESS';
	// 	ftypes[3] = 'address';
	// 	fnames[4] = 'PHONE';
	// 	ftypes[4] = 'phone';
	// })(jQuery);
	// var $mcj = jQuery.noConflict(true);
	import Icon from '@iconify/svelte';
	const icons = {
		fire1: 'wi:fire',
		fire2: 'vaadin:fire',
		fire3: 'mdi:fire',
		fire4: 'fa:fire',
		fire5: 'fa5:fire',
		fire6: 'fa5:fire-alt',
		fire7: 'el:fire',
		fire8: 'eva:fire',
		arrowCircle1: 'bi:arrow-down-circle-fill',
		arrowCircle2: 'eva:arrow-circle-down-fill',
		arrowCircleLeft2: 'eva:arrow-circle-left-fill',
		home: 'bx:bxs-home-heart',
		x: 'bx:bxs-x-square'
	};
</script>

<div id="mc_embed_signup" class="">
	<form
		action="https://mikepeiman.us7.list-manage.com/subscribe/post?u=2e0789618f3335c1fdeae5f80&amp;id=4f26dc006f"
		method="post"
		id="mc-embedded-subscribe-form"
		name="mc-embedded-subscribe-form"
		class="validate bg-none bg-transparent flex items-center justify-center w-auto"
		target="_blank"
		novalidate
	>
		<div class="flex items-center m-0 flex-col absolute top-[12rem] w-auto md:w-auto mt-12">
			<h2 class="font-display text-base mb-1 lg:mb-2 lg:text-lg text-winterblues-200 mx-0">
				Get on the list for updates and early access.
			</h2>
			<div
				id="mc_embed_signup_scroll"
				class="statement px-4 flex items-center rounded-xl justify-center relative z-10"
			>
				<div class="mc-field-group flex items-center justify-center relative w-auto">
					<input
						type="email"
						bind:value={email}
						name="EMAIL"
						class=" z-10 text-sm md:text-base xl:text-lg required email rounded-xl bg-transparent focus:shadow-none focus:ring-0 outline-none border-none w-[26ch] -ml-4 text-gray-100 w-auto"
						id="mce-EMAIL"
						placeholder="email address"
						on:blur={onBlurMCE}
						on:keyup={onKeyUpMCE}
					/>
					<button
						type="submit"
						name="subscribe"
						value="Subscribe"
						id="mc-embedded-subscribe"
						class="button text-sm w-[9ch] md:text-base xl:text-lg h-6 w-auto ml-4 -mr-4 p-5 rounded-r-xl flex items-center justify-center text-center bg-gray-900 hover:bg-gray-800 text-winterblues-400"
						on:click={signupSubmit}>Subscribe</button
					>
				</div>
				<div id="mce-responses" class="clear foot transition relative left-0 top-0 text-lg w-full ">
					<div class="response h-8 relative p-1 rounded-xl fadeOut" id="mce-error-response" />
					<div
						class="response h-8 relative p-1 rounded-xl bg-emerald-600 w-full fadeOut z-90"
						id="mce-success-response"
					>
						<Icon
							icon={icons.x}
							class="h-8 w-8 p-0 absolute text-white"
							on:click={(e) => closeMessage(e)}
						/>
					</div>
				</div>
				<div style="position: absolute; left: -5000px;" aria-hidden="true">
					<input type="text" name="b_2e0789618f3335c1fdeae5f80_4f26dc006f" tabindex="-1" value="" />
				</div>
				<div class="optionalParent">
					<div class="clear foot" />
				</div>
			</div>
			<script
				type="text/javascript"
				src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"></script>
			<script type="text/javascript">
			</script>
		</div>
	</form>
</div>
<div
	id="mce-close"
	on:click={(e) => closeMessage(e)}
	disabled
	class="flex items-center  bg-winterblues-400 hover:bg-amber-200 rounded cursor-pointer z-90 top-0 right-[3rem] fadeOut justify-center absolute transition"
>
	<Icon icon={icons.x} class="h-8 w-8 p-0 text-black" />
</div>

<style global lang="scss">
	.statement {
		line-height: 1.25em;
		background: linear-gradient(black, black) padding-box,
			linear-gradient(
					120deg,
					var(--color-emerald-500) 10%,
					var(--color-amber-500) 25%,
					var(--color-rose-500) 50%,
					var(--color-fuchsia-500) 75%,
					var(--color-winterblues-400) 90%
				)
				border-box;
		border: 3px solid transparent;
		// box-shadow: 0px 0px 3px 3px rgba(255,255,255,0.25);
		.author {
			color: var(--color-gray-300);
		}
	}

	#mc_embed_signup input:-internal-autofill-selected {
		background: rgba(0, 0, 0, 0) !important;
		color: var(--color-winterblues-100) !important;
	}
	#mce-close {
		z-index: 99;
	}
	#mce-responses {
		position: absolute;
		display: flex;
		height: auto;
		top: 0;
		left: 0;
		// width: 370px;
		width: 100%;
		border-radius: 0.25rem;
		#mce-error-response {
			color: white;
			text-align: left;
			display: flex;
			width: 100%;
			position: relative;
			top: 3rem;
			// background: var(--color-amber-500);
			height: auto;
			padding: 0.5rem;
			border-radius: 0.5rem;
			&:before {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: var(--color-winterblues-500);
				border-radius: 0.5rem;
				opacity: 0.25;
				z-index: -1;
			}
			// &:after {
			//     content: "x";
			//     display: flex;
			//     align-items: center;
			//     justify-content: center;
			//     background: #222;
			//     height: 2rem;
			//     width: 2rem;
			//     border-radius: 1rem;
			//     cursor: pointer;
			//     z-index: 99;
			//     &:hover {
			//         background: var(--color-winterblues-400);
			//     }
			// }
			a {
				// background: var(--color-winterblues-400);
				border-radius: 0.25rem;
				padding: 4px;
				position: relative;
				background: rgba(255, 255, 255, 0.25);
				margin: 0 8px;
				font-size: 1rem;
				color: #eee;
				font-weight: 500;
				border: 2px solid var(--color-winterblues-500);
				// &:before {
				// 	content: '';
				// 	position: absolute;
				// 	top: 0;
				// 	left: 0;
				// 	width: 100%;
				// 	height: 100%;
				// 	background: white;
				// 	// background: var(--color-amber-500);
				// 	border-radius: 0.5rem;
				// 	opacity: 0.25;
				// 	z-index: -1;
				// 	&:hover {
				// 		background: var(--color-winterblues-500);
				// 	}
				// }
				&:hover {
					background: rgba(0, 0, 0, 0.25);
					border: 2px solid var(--color-emerald-300);

					// opacity: .25;
					color: white;
				}
			}
			.close {
				width: 1rem;
				height: 1rem;
			}
		}
	}
	#mc_embed_signup div.mce_inline_error {
		background-color: var(--color-rose-400) !important;
		// opacity: 0.5;
		// width: 250px;
		width: calc(26ch - 1.5rem);
		font-size: 1.15rem;

		color: var(--color-winterblues-100) !important;
		// color: black !important;
		font-weight: 500 !important;
		top: 3rem;
		margin: 0;
		position: absolute;
		left: -16px;
		text-align: left;
		border-radius: 0;
		height: auto;
		transition: all 0.25s;
	}
	#mc_embed_signup div#mce-success-response {
		// background-color: var(--color-gray-900) !important;
		width: 100%;
		border-radius: 0.5rem;
		padding: 1rem;
		height: auto;
		font-size: 1rem;
		// color: var(--color-winterblues-100) !important;
		// color: black !important;
		font-weight: 500 !important;
		top: 3rem;
		margin: 0;
		position: absolute;
		left: 0;
		text-align: left;
		z-index: 90;
		// &:before {
		// 	content: 'x';
		// 	position: absolute;
		// 	left: 95%;
		// 	top: 0;
		// 	width: 100%;
		// 	height: 100%;
		// 	// background-color: var(--color-gray-900) !important;
		// 	border-radius: 0;
		// }
	}
	#mc_embed_signup input.mce_inline_error {
		border-color: var(--color-rose-400) !important;
	}

	.fadeOut {
		opacity: 0;
		transition: all 0.25s;
	}

	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus {
		-webkit-text-fill-color: var(--color-winterblues-100);
		-webkit-box-shadow: 0 0 0px 1000px #000 inset;
		transition: background-color 5000s ease-in-out 0.2s;
		caret-color: var(--color-winterblues-100);
	}
</style>
