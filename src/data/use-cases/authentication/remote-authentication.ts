import type { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { InvalidCredentialError } from '@/domain/errors/invalid-credentials'
import { UnexpectedError } from '@/domain/errors/unexpected'
import type { AccountModel } from '@/domain/models/account-model'
import type {
	Authentication,
	AuthenticationParams,
} from '@/domain/use-cases/authentication'

export class RemoteAuthentication implements Authentication {
	constructor(
		private readonly url: string,
		private readonly httpPostClient: HttpPostClient<
			AuthenticationParams,
			AccountModel
		>,
	) {}
	async auth(params: AuthenticationParams): Promise<AccountModel> {
		const httpResponse = await this.httpPostClient.post({
			url: this.url,
			body: params,
		})

		const statusHandlers: Record<number, () => AccountModel | never> = {
			[HttpStatusCode.ok]: () => httpResponse.body as AccountModel,
			[HttpStatusCode.unauthorized]: () => {
				throw new InvalidCredentialError()
			},
		}

		const handler = statusHandlers[httpResponse.statusCode]

		if (!handler) {
			throw new UnexpectedError()
		}

		return handler()
	}
}
