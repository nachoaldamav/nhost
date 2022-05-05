import { Request, Response } from 'express'

import { nhost } from '../../../utils/nhost'

export default async (req: Request, res: Response) => {
  // Check if the request comes from our backend
  if (req.headers['nhost-webhook-secret'] !== process.env.NHOST_WEBHOOK_SECRET) {
    return res.status(401).send('Unauthorized')
  }

  // get the newly created user
  const user = req.body.event.data.new

  const document = `
  mutation insertProfile($profile: profiles_insert_input!) {
    insertProfile(object: $profile) {
      id
    }
  }`

  // id and companyId will be automatically generated by the database. We only have to profide the user's id
  const variables = {
    profile: {
      userId: user.id
    }
  }

  // insert a profile for the user
  await nhost.graphql.request(document, variables, {
    headers: {
      'x-hasura-admin-secret': process.env.NHOST_ADMIN_SECRET as string
    }
  })

  res.status(200).send(`Hello`)
}
