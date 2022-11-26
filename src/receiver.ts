import { SQSHandler, SQSMessageAttributes } from 'aws-lambda';

const receiver: SQSHandler = async (event) => {
  try {
    for (const record of event.Records) {
      console.log('Message Body -->  ', record.body);
    }
  } catch (error) {
    console.log(error);
  }
};

export default receiver;
