import { describe, expect, test } from 'vitest'
import type { HttpPostClient } from '../../protocols/http/http-post-client'
import { RemoteAuthentication } from './remote-authentication'

describe('RemoteAuthentication', () => {
	test('should call httpPostClient with correct URL', async () => {
		class HttpPostClientSpy implements HttpPostClient {
			url: string | null = null
			async post(url: string): Promise<void> {
				this.url = url
				return Promise.resolve()
			}
		}
		const url = 'valid_url'
		const httpPostClientSpy = new HttpPostClientSpy()
		const sut = new RemoteAuthentication(url, httpPostClientSpy)
		await sut.auth()
		expect(httpPostClientSpy.url).toBe(url)
	})
})
