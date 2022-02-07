import { Validator } from "validator.ts/Validator";

export function isUUID(value: string): boolean {
	const valid = new Validator();

	if (!valid.isUUID(value)) {
		return false;
	}

	return true;
}
