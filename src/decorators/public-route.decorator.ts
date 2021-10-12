import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_ROUTE_KEY = 'isPublicRoute';
export const PublicRoute = () => SetMetadata(IS_PUBLIC_ROUTE_KEY, true); // passes the key as metadata to any route with the decorator
