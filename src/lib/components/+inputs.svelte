<script lang="ts">
	import { Input } from '$ui/input';
	import { Label } from '$ui/label';

	export let value: string | number;
	export let label: string;
	export let placeholder: string | undefined;
</script>

<Label for="name">{label}</Label>
<Input {placeholder} bind:value />
