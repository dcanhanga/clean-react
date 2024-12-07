export class InvalidCredentialError extends Error {
	constructor() {
		super('Credencias invalidas')
		this.name = 'InvalidCredentialError'
	}
}
