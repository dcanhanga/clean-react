import { faker } from '@faker-js/faker'
import { describe, expect, test } from 'vitest'

import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { HttpPostClientSpy } from '@/data/test/mock-http-client'
import { InvalidCredentialError } from '@/domain/errors/invalid-credentials'
import { UnexpectedError } from '@/domain/errors/unexpected'
import {
	mockAccountModel,
	mockAuthentication,
} from '@/domain/tests/mock-account'
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

const expectError = async (
	statusCode: number,
	ErrorClass: new () => Error,
): Promise<void> => {
	const { sut, httpPostClientSpy } = makeSut()
	httpPostClientSpy.response = { statusCode }
	const promise = sut.auth(mockAuthentication())
	await expect(promise).rejects.toThrow(new ErrorClass())
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

	test('should throw InvalidCredentialError if HttpPostClient returns 401', async () => {
		await expectError(HttpStatusCode.unauthorized, InvalidCredentialError)
	})

	test('should throw UnexpectedError if HttpPostClient returns 400', async () => {
		await expectError(HttpStatusCode.badRequest, UnexpectedError)
	})

	test('should throw UnexpectedError if HttpPostClient returns 500', async () => {
		await expectError(HttpStatusCode.badRequest, UnexpectedError)
	})

	test('should return an AccountModel if HttpPostClient returns 200', async () => {
		const { sut, httpPostClientSpy } = makeSut()
		const httpResponse = mockAccountModel()
		httpPostClientSpy.response = {
			statusCode: HttpStatusCode.ok,
			body: httpResponse,
		}
		const result = await sut.auth(mockAuthentication())
		expect(result).toEqual(httpResponse)
	})
})
