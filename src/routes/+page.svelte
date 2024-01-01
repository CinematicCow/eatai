<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$ui/button';
	import { Input } from '$ui/input';
	import { Label } from '$ui/label';
	import { recipe } from '../const/recipe';
	import { type FormData } from '../types/formData';
	import type { ActionData } from './$types';
	import { marked } from 'marked';

	export let form: ActionData;

	let loading: boolean = false;

	let formData: FormData = {
		budget: 0,
		location: '',
		cPreferences: '',
		dPreferences: '',
		dRestrictions: ''
	};
</script>

<main class="container prose dark:prose-invert mt-20">
	<h2>Discover Delightful Dishes Within Your Budget!</h2>

	<form method="POST" use:enhance>
		<Label for="budget">Your Culinary Budget</Label>
		<Input name="budget" placeholder="Rs 500" bind:value={formData.budget} type="number" />

		<Label for="location">Where Are You Cooking?</Label>
		<Input
			name="location"
			placeholder="New Delhi, India"
			bind:value={formData.location}
			type="text"
			inputmode="text"
		/>

		<Label for="dPreferences">Your Tasty Preferences</Label>
		<Input
			placeholder="Vegetarian, Pescetarian, etc."
			bind:value={formData.dPreferences}
			type="text"
			inputmode="text"
		/>

		<Label for="dRestrictions">Any Food Restrictions?</Label>
		<Input
			name="dRestrictions"
			placeholder="list of allergies or intolerances."
			bind:value={formData.dRestrictions}
			type="text"
			inputmode="text"
		/>

		<Label for="cPreferences">Preferred Cuisines (optional)</Label>
		<Input
			name="cPreferences"
			placeholder="Indian, Chinese, etc."
			bind:value={formData.cPreferences}
			type="text"
			inputmode="text"
		/>

		<Button class="mt-4" type="submit" disabled={loading}>Let's Spice It Up!</Button>
	</form>
</main>

{#if form}
	<div class="mt-12 prose dark:prose-invert recipe min-w-max container">
		{@html marked(form.toString())}
	</div>
{/if}
