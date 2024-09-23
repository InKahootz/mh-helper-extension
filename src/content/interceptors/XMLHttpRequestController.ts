import { LoggerService } from "@scripts/util/logger";
import { createProxy } from "./createProxy";

/**
 * An `XMLHttpRequest` instance controller that allows us
 * to handle any given request instance (e.g. responding to it).
 */
export class XMLHttpRequestController {
    public request: XMLHttpRequest;
    public requestId: string;
    private url: URL;

    public onRequest?: (requestId: string, url: string, data: unknown) => Promise<void>;
    public onResponse?: (requestId: string, url: string, response: unknown,) => void;

    constructor(
        private readonly originalRequest: XMLHttpRequest,
        private readonly logger: LoggerService
    ) {
        this.requestId = this.createRequestId();

        this.request = createProxy(originalRequest, {
            methodCall: ([methodName, args], invoke) => {
                switch (methodName) {
                    case "open": {
                        const [method, url] = args as [
                            string,
                            string | undefined
                        ];

                        if (typeof url === "undefined") {
                            this.url = this.toAbsoluteUrl(method);
                        } else {
                            this.url = this.toAbsoluteUrl(url);
                        }

                        return invoke();
                    }

                    case "send": {
                        const [body] = args as [
                            body?: XMLHttpRequestBodyInit | Document | null
                        ];

                        this.request.addEventListener("load", () => {
                            // Notify the consumer about the response.
                            this.onResponse?.(this.requestId, this.url.toString(), this.request.response);
                        });

                        // Delegate request handling to the consumer.
                        const requestSettled =
                            this.onRequest?.(
                                this.requestId,
                                this.url.toString(),
                                body)
                            ?? Promise.resolve();

                        requestSettled.finally(() => {
                            invoke();
                        });


                        break;
                    }

                    default: {
                        return invoke();
                    }
                }
            },
        });
    }

    /**
     * Generate a random ID string to represent a request.
     * @example
     * createRequestId()
     * // "f774b6c9c600f"
     */
    private createRequestId(): string {
        return Math.random().toString(16).slice(2);
    }

    private toAbsoluteUrl(url: string | URL): URL {
        return new URL(url.toString(), location.href);
    }
}
