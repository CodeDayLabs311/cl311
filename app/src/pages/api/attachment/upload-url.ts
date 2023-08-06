import S3 from 'aws-sdk/clients/s3'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Using BUCKET_NAME:", process.env.BUCKET_NAME);
  const s3 = new S3({
    apiVersion: '2006-03-01',
    accessKeyId: process.env.CL_AWS_ACCESS_KEY,
    secretAccessKey: process.env.CL_AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  })

  const post = await s3.createPresignedPost({
    Bucket: process.env.BUCKET_NAME,
    Fields: {
      key: req.query.file,
      'Content-Type': req.query.fileType,
    },
    Expires: 60, // seconds
    Conditions: [
      ['content-length-range', 0, 1048576], // up to 1 MB
    ],
  })

  res.status(200).json(post)
}
