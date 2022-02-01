import { ValidationError } from "sequelize";

type Props = {
	code: number;
	err: string | ValidationError;
};

export default class ApiError {
	code: number;
	err: { message: string; value?: string; field?: string }[];

	constructor(props: Props) {
		this.code = props.code;
		if (props.err instanceof ValidationError) {
			console.log(props.err);
			this.err = props.err.errors.map((error) => {
				return {
					message: error.message,
					value: error.value,
					field: error.path,
				};
			});
		} else {
			this.err = [
				{
					message: props.err,
				},
			];
		}
	}
}
