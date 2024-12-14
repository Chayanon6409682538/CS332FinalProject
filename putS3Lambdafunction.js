import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({ region: "us-east-1" });

export const handler = async (event) => {
    try {
        const encodedImage = event.base64Image;
        const folder = event.S3Folder;
        const filename = event.Filename;
        
        const decodedImage = Buffer.from(encodedImage, 'base64');
        const filePath = `images/${folder}/${filename}.jpg`;
        
        const params = {
            Bucket: "uploadpiclifelog",
            Key: filePath,
            Body: decodedImage
        };

        const data = await s3Client.send(new PutObjectCommand(params));
        
        return {
            statusCode: 200,
            headers: { "my_header": "my_value" },
            body: JSON.stringify(data),
            isBase64Encoded: false
        };
        
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error.message)
        };
    }
};
