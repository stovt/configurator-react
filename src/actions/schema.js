import { schema } from "normalizr";

export const locale = new schema.Entity( "locales" );
export const arrayOfLocales = new schema.Array( locale );