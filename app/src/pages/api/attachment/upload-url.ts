import { NextApiRequest, NextApiResponse } from 'next';
import { S3DbClient } from '../../../utils/clients/S3DbClient';
import { IS3Object } from '../../../models/data/IS3Object';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const s3DbClient = new S3DbClient();

    const s3Object: Omit<IS3Object, 'url'> = {
        objectId: req.query.file as string,
        fileType: req.query.fileType as string,
    };

    try {
        const presignedPost = await s3DbClient.getPresignedPost(s3Object);
        return res.status(200).json(presignedPost);
    } catch (error) {
        console.error('Failed to create presigned post:', error);
        return res.status(500).json({ error: 'Failed to create presigned post.' });
    }
}
