import faunadb from 'faunadb'
import { getMentionsForSlug } from 'lib/webmentions'

module.exports = async (req, res) => {
  const q = faunadb.query
  const client = new faunadb.Client({
    secret: 'fnAFJ3abIkAAUVUFi8d5Ic2Tm2ZyvAX605zFKjMG',
    domain: 'db.fauna.com',
  })

  const { slug } = req.query
  if (!slug) {
    return res.status(400).json({
      message: 'Article slug not provided',
    })
  }
  // Check and see if the doc exists.
  try {
    const doesDocExist = await client.query(q.Exists(q.Collection('likes')))
    if (!doesDocExist) {
      await q.Do(
        client.query(q.CreateCollection({ name: 'likes' })),
        client.query(
          q.Create(q.Collection('likes'), {
            data: { slug, likes: 0 },
          }),
        ),
        client.query(
          q.CreateIndex({
            name: 'likes_by_slug',
            source: q.Collection('likes'),
            terms: [
              {
                field: ['data', 'slug'],
              },
            ],
            values: [
              {
                field: ['ref'],
              },
            ],
          }),
        ),
      )
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error', error)
  }

  type documentType = { ref: string; data: { likes: number } }

  // Fetch the document for-real
  const document = (await client.query(q.Get(q.Match(q.Index('likes_by_slug'), slug)))) as documentType
  // Fetch webmentions
  const numberOfmentions = await getMentionsForSlug(slug)

  if (req.method === 'POST') {
    await client.query(
      q.Update(document.ref, {
        data: {
          likes: document.data.likes + 1,
        },
      }),
    )
    const updatedDocument = (await client.query(q.Get(q.Match(q.Index('likes_by_slug'), slug)))) as documentType

    return res.status(200).json({
      likes: numberOfmentions > 0 ? updatedDocument.data.likes + numberOfmentions : updatedDocument.data.likes,
    })
  }
  return res.status(200).json({
    likes: numberOfmentions > 0 ? document.data.likes + numberOfmentions : document.data.likes,
  })
}
