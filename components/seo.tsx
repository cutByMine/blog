import { DefaultSeo } from 'next-seo'

const config = {
  title: '戒修 - 戒除恶念、修身养性',
  description: '123',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://gymsummer.com',
    site_name: '戒修',
    images: [
      {
        url: 'https://gymsummer.com/avatar.png',
        alt: '戒修',
      },
    ],
  },
}

const SEO = (): JSX.Element => {
  return <DefaultSeo {...config} />
}

export default SEO
