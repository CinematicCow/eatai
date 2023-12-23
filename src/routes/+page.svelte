<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$ui/button';
	import { Input } from '$ui/input';
	import { Label } from '$ui/label';
	import { type FormData } from '../types/formData';

	let formData: FormData = {
		budget: 0,
		location: '',
		cPreferences: '',
		dPreferences: '',
		dRestrictions: ''
	};

	const onHandleSubmit = () => {
		console.log(formData);
	};
</script>

<main class="container prose dark:prose-invert">
	<h3>Please enter the following data</h3>

	<form method="POST" use:enhance>
		<Label for="budget">Total Budget</Label>
		<Input name="budget" placeholder="Rs 500" bind:value={formData.budget} type="number" />

		<Label for="location">Where are you?</Label>
		<Input
			name="location"
			placeholder="New Delhi, India"
			bind:value={formData.location}
			type="text"
			inputmode="text"
		/>

		<Label for="dPreferences">What are your dietary preferences?</Label>
		<Input
			placeholder="Vegetarian, Pescetarian, etc."
			bind:value={formData.dPreferences}
			type="text"
			inputmode="text"
		/>

		<Label for="dRestrictions">Do you have any restrictions?</Label>
		<Input
			name="dRestrictions"
			placeholder="list of allergies or intolerances."
			bind:value={formData.dRestrictions}
			type="text"
			inputmode="text"
		/>

		<Label for="cPreferences">What are your preferred cuisines? (optional)</Label>
		<Input
			name="cPreferences"
			placeholder="Indian, Chinese, etc."
			bind:value={formData.cPreferences}
			type="text"
			inputmode="text"
		/>

		<Button class="mt-4" type="submit">Submit</Button>
	</form>
</main>
