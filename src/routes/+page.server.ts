import type { Actions } from './$types';
import { run } from './ai';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const data = {
			budget: formData.get('budget') as unknown as number,
			location: formData.get('location') as string,
			dPreferences: formData.get('dPreferences') as string,
			dRestrictions: formData.get('dRestrictions') as string,
			cPreferences: formData.get('cPreferences') as string
		};

		console.table(data);
		const respone = await run(data);
		console.log(respone);
		return respone;
	}
};
