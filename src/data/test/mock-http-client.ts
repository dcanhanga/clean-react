import type { HttpPostClient } from '../protocols/http/http-post-client'

export class HttpPostClientSpy implements HttpPostClient {
	url: string | null = null
	async post(url: string): Promise<void> {
		this.url = url
		return Promise.resolve()
	}
}
