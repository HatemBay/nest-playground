import { SetMetadata } from '@nestjs/common';

export const skipAuth = () => SetMetadata('skipAuth', true);
