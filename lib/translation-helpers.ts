import { GetStaticPropsContext } from 'next';
import { DEFAULT_LOCALE } from 'consts/locales';

export const extractLocale = (ctx: GetStaticPropsContext) => ctx?.locale ?? DEFAULT_LOCALE;
