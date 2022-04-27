import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { MessageProducer } from './producer.service';
import * as AWS from 'aws-sdk';
import { config } from '../config';

AWS.config.update({
    region: config.AWS_REGION, // aws region
    accessKeyId: config.ACCESS_KEY_ID, // aws access key id
    secretAccessKey: config.SECRET_ACCESS_KEY, // aws secret access key
});


@Module({
    imports: [
        SqsModule.register({
            consumers: [],
            producers: [
                {
                    name: config.TEST_QUEUE, // name of the queue
                    queueUrl: config.TEST_QUEUE_URL, 
                    region: config.AWS_REGION, // url of the queue
                },
            ],
        }),
    ],
    controllers: [],
    providers: [MessageProducer],
    exports: [MessageProducer]
})
export class ProducerModule { }