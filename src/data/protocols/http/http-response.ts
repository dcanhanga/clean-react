export enum HttpStatusCode {
	ok = 200,
	noContent = 204,
	badRequest = 400,
	unauthorized = 401,
	forbidden = 403,
	notFound = 404,
	serverError = 500,
}

export type HttpResponse = {
	statusCode: HttpStatusCode
	body?: Record<string | number | symbol, unknown>
}
