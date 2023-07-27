import { DefaultSeo } from 'next-seo'

const config = {
  title: 'Nicky Lao - Frontend Developer & Designer',
  description: '123',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://blog.gymsummer.com',
    site_name: 'giscafer | Nicky Lao',
    images: [
      {
        url: 'https://giscafer.com/avatar.png',
        alt: 'Nicky Lao',
      },
    ],
  },
  twitter: {
    handle: '@giscafer',
    site: '@giscafer',
    cardType: 'summary_large_image',
  },
}

const SEO = (): JSX.Element => {
  return <DefaultSeo {...config} />
}

export default SEO
