import { AjaxInterceptorService } from "src/background/ajaxInterceptor.background";
import { ConsoleLogger, LogLevel, LoggerService } from "../scripts/util/logger";
import { HuntPrefetchService } from "@scripts/services/huntPrefetchService";

export class MainBackground {
    logger: LoggerService;
    ajaxInterceptor: AjaxInterceptorService;
    huntPrefetchService: HuntPrefetchService;

    constructor() {
        this.logger = new ConsoleLogger(LogLevel.Debug);
        this.ajaxInterceptor = new AjaxInterceptorService(this.logger);
        this.huntPrefetchService = new HuntPrefetchService(this.logger, this.ajaxInterceptor);
    }

    async bootstrap() {
        await this.ajaxInterceptor.init();
        this.huntPrefetchService.init();
    }
}
