import type { HttpResponse } from './http-response'

export type HttpPostParams = {
	url: string
	body?: Record<string | number | symbol, unknown>
}
export interface HttpPostClient {
	post(params: HttpPostParams): Promise<HttpResponse>
}
