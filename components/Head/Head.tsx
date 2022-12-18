import { default as NextHead } from 'next/head'

import { Props } from './Head.types'

const Head = ({ title, description, url }: Props): JSX.Element => (
  <NextHead>
    <meta charSet="utf-8" />
    {title && <title>{title}</title>}
    {description && <meta name="description" content={description} />}
    {/* Open graph */}
    {/* this check is to not get undefined values */}
    {title && <meta property="og:title" content={title} />}
    {description && <meta property="og:description" content={description} />}

    {url && <meta property="og:url" content={`your-url/${url}`} />}
    {/* end of social media meta tags */}
    {title && <meta name="twitter:title" content={title} />}
    {description && <meta name="twitter:description" content={description} />}
  </NextHead>
)

export default Head
