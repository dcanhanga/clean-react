import type { AccountModel } from '@/domain/models/account-model'
import type {
	Authentication,
	AuthenticationParams,
} from '@/domain/use-cases/authentication'
import type { HttpPostClient } from '../../protocols/http/http-post-client'

export class RemoteAuthentication implements Authentication {
	constructor(
		private readonly url: string,
		private readonly httpPostClient: HttpPostClient,
	) {}
	async auth(params: AuthenticationParams): Promise<AccountModel> {
		await this.httpPostClient.post({ url: this.url, body: params })
		return {
			accessToken: 'any_token',
		}
	}
}
