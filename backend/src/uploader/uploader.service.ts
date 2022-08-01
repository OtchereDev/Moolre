import { Injectable } from '@nestjs/common';
import admin from 'firebase-admin';
import * as path from 'path';
import { v4 as uuid } from 'uuid';

import * as serviceAccountKey from '../../serviceAccountKey.json';

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
}
