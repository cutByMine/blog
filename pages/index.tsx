import Page from 'components/page'
import PageHeader from 'components/pageheader'
import TimeLine from 'components/TimeLine'

export async function getStaticProps() {
  // https://github.com/vercel/next.js/discussions/12124
  return {
    props: {
      allPostsData: [],
    },
  }
}

const headerTitle = '你好，我叫 戒修 ！'

const headerDescription = '戒除恶念、修身养性。'

const experience = [
  {
    date: '2024年3月4日',
    title: '新启程',
    desc: '所有谎言戳破，开启第二段人生',
  },
]

const Home = (): JSX.Element => (
  <Page>
    <PageHeader title={headerTitle} description={headerDescription} />
    <TimeLine items={experience} />
  </Page>
)

export default Home
