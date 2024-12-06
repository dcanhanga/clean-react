import { faker } from '@faker-js/faker'
import { describe, expect, test } from 'vitest'

import { mockAuthentication } from '../../../domain/tests/mock-authentication'
import { HttpPostClientSpy } from '../../test/mock-http-client'
import { RemoteAuthentication } from './remote-authentication'
type SutTypes = {
	sut: RemoteAuthentication
	httpPostClientSpy: HttpPostClientSpy
}
const makeSut = (url = faker.internet.url()): SutTypes => {
	const httpPostClientSpy = new HttpPostClientSpy()
	const sut = new RemoteAuthentication(url, httpPostClientSpy)
	return {
		httpPostClientSpy,
		sut,
	}
}

describe('RemoteAuthentication', () => {
	test('should call httpPostClient with correct URL', async () => {
		const url = faker.internet.url()
		const { httpPostClientSpy, sut } = makeSut(url)
		await sut.auth(mockAuthentication())
		expect(httpPostClientSpy.url).toBe(url)
	})
	test('should call httpPostClient with correct Body', async () => {
		const { httpPostClientSpy, sut } = makeSut()
		const authenticationParams = mockAuthentication()
		await sut.auth(authenticationParams)
		expect(httpPostClientSpy.body).toEqual(authenticationParams)
	})
})
