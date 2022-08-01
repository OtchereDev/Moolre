import { Injectable } from '@nestjs/common';
import admin from 'firebase-admin';
import * as path from 'path';
import { v4 as uuid } from 'uuid';
import * as shell from 'shelljs';
import * as firebase from 'firebase-admin';
import { chunk } from 'lodash';
import { mapLimit } from 'async';

export interface ISendFirebaseMessages {
  token: string;
  title?: string;
  message: string;
}

import * as serviceAccountKey from '../../serviceAccountKey.json';
import { BatchResponse } from 'firebase-admin/lib/messaging/messaging-api';

@Injectable()
export class UploaderService {
  constructor() {}

  private firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey as any),
    storageBucket: process.env.BUCKET_URL,
  });

  private firebaseBucket = this.firebaseApp.storage().bucket();

  async uploadFileToFirebase(file: Express.Multer.File) {
    const fileName = uuid() + path.extname(file.originalname);
    await this.firebaseBucket
      .file(fileName)
      .createWriteStream()
      .end(file.buffer);

    return { imageUrl: process.env.MEDIA_URL + fileName + '?alt=media' };
  }

  public async sendAll(
    messages: firebase.messaging.TokenMessage[],
    dryRun?: boolean,
  ): Promise<BatchResponse> {
    if (process.env.NODE_ENV === 'local') {
      for (const { notification, token } of messages) {
        shell.exec(
          `echo '{ "aps": { "alert": ${JSON.stringify(
            notification,
          )}, "token": "${token}" } }' | xcrun simctl push booted com.company.appname -`,
        );
      }
    }
    return firebase.messaging().sendAll(messages, dryRun);
  }

  public async sendFirebaseMessages(
    firebaseMessages: ISendFirebaseMessages[],
    dryRun?: boolean,
  ): Promise<BatchResponse> {
    const batchedFirebaseMessages = chunk(firebaseMessages, 500);

    const batchResponses = await mapLimit<
      ISendFirebaseMessages[],
      BatchResponse
    >(
      batchedFirebaseMessages,
      process.env.FIREBASE_PARALLEL_LIMIT, // 3 is a good place to start
      async (
        groupedFirebaseMessages: ISendFirebaseMessages[],
      ): Promise<BatchResponse> => {
        try {
          const tokenMessages: firebase.messaging.TokenMessage[] =
            groupedFirebaseMessages.map(({ message, title, token }) => ({
              notification: { body: message, title },
              token,
              apns: {
                payload: {
                  aps: {
                    'content-available': 1,
                  },
                },
              },
            }));

          return await this.sendAll(tokenMessages, dryRun);
        } catch (error) {
          return {
            responses: groupedFirebaseMessages.map(() => ({
              success: false,
              error,
            })),
            successCount: 0,
            failureCount: groupedFirebaseMessages.length,
          };
        }
      },
    );

    return batchResponses.reduce(
      ({ responses, successCount, failureCount }, currentResponse) => {
        return {
          responses: responses.concat(currentResponse.responses),
          successCount: successCount + currentResponse.successCount,
          failureCount: failureCount + currentResponse.failureCount,
        };
      },
      {
        responses: [],
        successCount: 0,
        failureCount: 0,
      } as unknown as BatchResponse,
    );
  }
}
