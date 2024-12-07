import type {
	HttpPostClient,
	HttpPostParams,
} from '@/data/protocols/http/http-post-client'
import {
	type HttpResponse,
	HttpStatusCode,
} from '@/data/protocols/http/http-response'
import type { AccountModel } from '@/domain/models/account-model'
import type { AuthenticationParams } from '@/domain/use-cases/authentication'

export class HttpPostClientSpy
	implements HttpPostClient<AuthenticationParams, AccountModel>
{
	url: string | null = null
	body: HttpPostParams<AuthenticationParams>['body'] | null = null
	response: HttpResponse<AccountModel> = {
		statusCode: HttpStatusCode.ok,
	}
	async post(
		params: HttpPostParams<AuthenticationParams>,
	): Promise<HttpResponse<AccountModel>> {
		this.url = params.url
		this.body = params.body
		return this.response
	}
}
