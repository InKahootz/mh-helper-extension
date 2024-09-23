import type { LoggerService } from "@scripts/util/logger";
import { XMLHttpRequestController } from "./XMLHttpRequestController";

export interface XMLHttpRequestProxyOptions {
    logger: LoggerService;
}

export interface RequestParams {
    requestId: string;
    url: string;
    data: unknown;
}

export interface ResponseParams {
    requestId: string;
    url: string;
    response: unknown;
}

export class XMLHttpRequestProxyService {
    private proxied = false;

    public onRequest?: (requestId: string, url: string, data: unknown) => Promise<void>;
    public onResponse?: (requestId: string, url: string, response: unknown) => void;

    constructor(private logger: LoggerService) {}

    /**
     * Create a proxied `XMLHttpRequest` class.
     * The proxied class establishes spies on certain methods,
     * allowing us to intercept requests and respond to them.
     */
    public enableInterception() {
        if (this.proxied) {
            return;
        }

        globalThis.XMLHttpRequest = new Proxy(globalThis.XMLHttpRequest, {
            construct: (target, argArray, newTarget) => {
                this.logger.debug("constructed new XMLHttpRequest");

                const originalRequest: XMLHttpRequest = Reflect.construct(target, argArray, newTarget);

                const xhrRequestController = new XMLHttpRequestController(
                    originalRequest,
                    this.logger
                );

                xhrRequestController.onRequest = this.onRequest;
                xhrRequestController.onResponse = this.onResponse;

                // Return the proxied request from the controller
                // so that the controller can react to the consumer's interactions
                // with this request (opening/sending/etc).
                return xhrRequestController.request;
            },
        });

        this.proxied = true;
    }

    /**
     * Disable the interception of `XMLHttpRequest` requests.
     */
    public disableInterception() {
        if (!this.proxied) {
            return;
        }

        globalThis.XMLHttpRequest = XMLHttpRequest;

        this.proxied = false;
    }
}
