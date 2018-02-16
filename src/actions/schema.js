import { schema } from "normalizr";

export const locale = new schema.Entity( "locales" );
export const arrayOfLocales = new schema.Array( locale );

export const configurators = new schema.Entity( "configurators" );
export const arrayOfConfigurators = new schema.Array( configurators );

export const configurator = new schema.Entity( "configurator" );