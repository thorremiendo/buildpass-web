import { WaterMarkService } from './watermark.service';
/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe.
*/

import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import * as keys from 'src/environments/environment.prod';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ViewSDKClient {
  public formId;
  public url;
  public userId;
  public applicationId;
  public form;
  constructor(
    public newApplicationService: NewApplicationService,
    private watermark: WaterMarkService
  ) {}
  readyPromise: Promise<any> = new Promise((resolve) => {
    if (window.AdobeDC) {
      resolve();
    } else {
      /* Wait for Adobe Document Services PDF Embed API to be ready */
      document.addEventListener('adobe_dc_view_sdk.ready', () => {
        resolve();
      });
    }
  });
  adobeDCView: any;

  ready() {
    return this.readyPromise;
  }

  previewFile(divId: string, viewerConfig: any) {
    const config: any = {
      /* Pass your registered client id */
      //clientId: '8c0cd670273d451cbc9b351b11d22318',
      clientId: environment.adobe_key,
    };
    if (divId) {
      /* Optional only for Light Box embed mode */
      /* Pass the div id in which PDF should be rendered */
      config.divId = divId;
    }
    /* Initialize the AdobeDC View object */
    this.adobeDCView = new window.AdobeDC.View(config);

    /* Invoke the file preview API on Adobe DC View object */
    let previewFilePromise = this.adobeDCView.previewFile(
      {
        /* Pass information on how to access the file */
        content: {
          /* Location of file where it is hosted */
          location: {
            url: this.url,

            // If the file URL requires some additional headers, then it can be passed as follows:-
            headers: [
              {
                key: 'Access-Control-Allow-Origin',
                value: '*',
              },
            ],
          },
        },
        /* Pass meta data of file */
        metaData: {
          /* file name */
          fileName: 'document.pdf',
          /* file ID */
          id: '6d07d124-ac85-43b3-a867-36930f502ac6',
        },
      },
      viewerConfig
    );

    return previewFilePromise;
  }

  previewFileUsingFilePromise(
    divId: string,
    filePromise: Promise<string | ArrayBuffer>,
    fileName: any
  ) {
    /* Initialize the AdobeDC View object */
    this.adobeDCView = new window.AdobeDC.View({
      /* Pass your registered client id */
      clientId: '8c0cd670273d451cbc9b351b11d22318',
      // clientId: '46ddf9af80f5465c8f59e080868ef747',

      /* Pass the div id in which PDF should be rendered */
      divId,
    });

    /* Invoke the file preview API on Adobe DC View object */
    this.adobeDCView.previewFile(
      {
        /* Pass information on how to access the file */
        content: {
          /* pass file promise which resolve to arrayBuffer */
          promise: filePromise,
        },
        /* Pass meta data of file */
        metaData: {
          /* file name */
          fileName,
        },
      },
      {}
    );
  }

  registerSaveApiHandler(condition) {
    const saveApiHandler = (metaData: any, content: any, options: any) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const response = {
            code: window.AdobeDC.View.Enum.ApiResponseCode.SUCCESS,
            data: {
              metaData: Object.assign(metaData, {
                updatedAt: new Date().getTime(),
              }),
            },
          };
          resolve(response);
          var blob = new Blob([content]);
          if (condition == 'update') {
            if (
              this.form.document_id == 49 ||
              this.form.document_id == 44 ||
              this.form.document_id == 43 ||
              this.form.document_id == 45 ||
              this.form.document_id == 50
            ) {
              const uploadDocumentData = {
                document_status_id: 1,
                document_path: blob,
              };
              this.newApplicationService
                .updateDocumentFile(uploadDocumentData, this.formId)
                .subscribe((res) => {
                  console.log(res);
                  Swal.fire('Success!', `Review Saved!`, 'success').then(
                    (result) => {
                      console.log('Uploaded!!');
                    }
                  );
                });
            } else {
              const uploadDocumentData = {
                document_status_id: 0,
                document_path: blob,
              };
              this.newApplicationService
                .updateDocumentFile(uploadDocumentData, this.formId)
                .subscribe((res) => {
                  console.log(res);
                  Swal.fire('Success!', `Review Saved!`, 'success').then(
                    (result) => {
                      console.log('Uploaded!!');
                    }
                  );
                });
            }
          } else if (condition == 'bldgPermit') {
            const uploadDocumentData = {
              application_id: this.applicationId,
              user_id: this.userId,
              document_id: 50,
              document_status_id: 1,
              document_path: blob,
            };
            this.newApplicationService
              .submitDocument(uploadDocumentData)
              .subscribe((res) => {
                this.insertFormQrCode(res.data.document_path, res.data.id);
              });
          } else if (condition == 'zoningPermit') {
            const uploadDocumentData = {
              application_id: this.applicationId,
              user_id: this.userId,
              document_id: 43,
              document_status_id: 1,
              document_path: blob,
            };
            this.newApplicationService
              .submitDocument(uploadDocumentData)
              .subscribe((res) => {
                this.insertFormQrCode(res.data.document_path, res.data.id);
              });
          } else if (condition == 'firePermit') {
            const uploadDocumentData = {
              application_id: this.applicationId,
              user_id: this.userId,
              document_id: 45,
              document_status_id: 1,
              document_path: blob,
            };
            this.newApplicationService
              .submitDocument(uploadDocumentData)
              .subscribe((res) => {
                this.insertFormQrCode(res.data.document_path, res.data.id);
              });
          } else if (condition == 'bfpChecklist') {
            const uploadDocumentData = {
              application_id: this.applicationId,
              user_id: this.userId,
              document_id: 49,
              document_status_id: 1,
              document_path: blob,
            };
            this.newApplicationService
              .submitDocument(uploadDocumentData)
              .subscribe((res) => {
                this.insertFormQrCode(res.data.document_path, res.data.id);
              });
          } else if (condition == 'wwmsBp') {
            const uploadDocumentData = {
              application_id: this.applicationId,
              user_id: this.userId,
              document_id: 44,
              document_status_id: 1,
              document_path: blob,
            };
            this.newApplicationService
              .submitDocument(uploadDocumentData)
              .subscribe((res) => {
                this.insertFormQrCode(res.data.document_path, res.data.id);
              });
          }
        }, 2000);
      });
    };

    this.adobeDCView.registerCallback(
      window.AdobeDC.View.Enum.CallbackType.SAVE_API,
      saveApiHandler,
      {}
    );

    console.log('save api clicked');
  }

  registerEventsHandler() {
    /* Register the callback to receive the events */
    this.adobeDCView.registerCallback(
      /* Type of call back */
      window.AdobeDC.View.Enum.CallbackType.EVENT_LISTENER,
      /* call back function */
      (event: any) => {
        console.log(event);
      },
      /* options to control the callback execution */
      {
        /* Enable PDF analytics events on user interaction. */
        enablePDFAnalytics: true,
      }
    );
  }

  insertFormQrCode(doc, id) {
    this.watermark.generateQrCode(this.applicationId).subscribe((res) => {
      this.watermark.insertQrCode(doc, res.data, "building-permit").then((blob) => {
        const updateFileData = {
          document_status_id: 1,
          document_path: blob,
        };
        this.newApplicationService
          .updateDocumentFile(updateFileData, id)
          .subscribe((res) => {
            Swal.fire('Success!', `File uploaded!`, 'success').then(
              (result) => {
                window.location.reload();
              }
            );
          });
      });
    });
  }
}
