export interface Env {
	BASE_URL: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		const newUrl = new URL(url.pathname, env.BASE_URL);
		const newHeaders = new Headers();
		for (const [key, value] of request.headers.entries()) {
			switch (key) {
                case 'host':
                    newHeaders.set(key, newUrl.host);
                    break;
                // https://developers.cloudflare.com/fundamentals/reference/http-request-headers/
				case 'accept-encoding':
					if (request.cf && request.cf.clientAcceptEncoding) {
						newHeaders.set(key, String(request.cf.clientAcceptEncoding));
					}
					break;
				case 'cf-connecting-ip':
                    break;
                case 'x-real-ip':
                    break;
                case 'cf-connecting-ipv6':
                    break;
                case 'cf-ew-via':
                    break;
                case 'cf-pseudo-ipv4':
                    break;
                case 'true-client-ip':
                    break;
                case 'x-forwarded-for':
                    break;
                case 'x-forwarded-proto':
                    break;
                case 'cf-ray':
                    break;
                case 'cf-ipcountry':
                    break;
                case 'cf-visitor':
                    break;
                case 'cdn-loop':
                    break;
                case 'cf-worker':
                    break;
                case 'connection':
                    break;
                default:
                    newHeaders.set(key, value);
                    break;
            }
		}
		const response = await fetch(newUrl, {
            method: request.method,
            headers: newHeaders,
            body: request.body,
			redirect: 'manual',
		});
		return response;
	},
};
