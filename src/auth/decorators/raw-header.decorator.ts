
import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";


export const RawHeader = createParamDecorator(
    (data, ctx: ExecutionContext) => {

        // console.log({data})
        const req = ctx.switchToHttp().getRequest();
        return  req.rawHeaders;

    }
);