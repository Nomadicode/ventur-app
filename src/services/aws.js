import AWS from 'aws-sdk'

const AwsConfig = {
  accessKeyId: 'AKIAWGN2263PHGIBJPER',
  secretAccessKey: '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',
  region: 'us-west-1'
}

AWS.config.update(AwsConfig)

export default new AWS.S3()
