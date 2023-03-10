import { Injectable } from "@nestjs/common";
import { S3 } from "aws-sdk";
import { randomUUID } from "crypto";

@Injectable()
export class FileService {
  async uploadPublicFile(dataBuffer: Buffer, filename: string) {
    try {
      const s3 = new S3();
      const uploadResult = await s3
        .upload({
          Bucket: 'file-uploads',
          Body: dataBuffer,
          Key: `${randomUUID()}-${filename}`
        })
        .promise();

      return  {
        key: uploadResult.Key,
        url: uploadResult.Location,
      };
    } catch (err) {
      console.log(err);
      return { key: 'error', url: err.message };
    }
  }
}