import type { NextApiRequest, NextApiResponse } from 'next'

import { fork } from 'child_process'
import path from 'path'

function createPromisefork(childUrl, data = '') {
  const res = fork(childUrl)
  res.send(data)
  // if (data) {
  //   res.send(data)
  // }
  return new Promise(reslove => {
    res.on('message', f => {
      reslove(f)
    })
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { shareUrl } = req.body

  if (!shareUrl) {
    return res.status(400).json({ error: 'shareUrl is required' })
  }
  const response = await createPromisefork(process.env.CRAWEL_PATH)
  console.log(response, 'responseresponse')

  // const result = await fetch('https://www.getrevue.co/api/v2/subscribers', {
  //   method: 'POST',
  //   headers: {
  //     Authorization: `Token ${process.env.REVUE_API_KEY}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({}),
  // })
  // // console.log('result', result)
  // const data = await result.json()

  // if (!result.ok) {
  //   return res.status(500).json({ error: data.error.email[0] })
  // }

  return res.status(200).json({ error: '' })
}
