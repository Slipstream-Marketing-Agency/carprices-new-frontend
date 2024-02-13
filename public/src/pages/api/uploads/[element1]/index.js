import aws from "aws-sdk";

export default async function handler(req, res) {
    aws.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_APP,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_APP,
        region: process.env.AWS_REGION_APP,
        signatureVersion: "v4",
    });

    // 
    const s3 = new aws.S3();
    //   res.sendFile(fileKey);
    var options = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${req.query.element1}`
    };
    var fileStream = s3.getObject(options).createReadStream();
    fileStream.pipe(res);
}