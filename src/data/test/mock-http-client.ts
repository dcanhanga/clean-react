import type {
	HttpPostClient,
	HttpPostParams,
} from '@/data/protocols/http/http-post-client'
import {
	type HttpResponse,
	HttpStatusCode,
} from '@/data/protocols/http/http-response'

export class HttpPostClientSpy implements HttpPostClient {
	url: string | null = null
	body: HttpPostParams['body'] | null = null
	response: HttpResponse = {
		statusCode: HttpStatusCode.noContent,
	}
	async post(params: HttpPostParams): Promise<HttpResponse> {
		this.url = params.url
		this.body = params.body
		return this.response
	}
}
