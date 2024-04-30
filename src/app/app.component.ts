import { Component } from '@angular/core';
import { FileUploadService } from './services/file-upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular Material 17 File Upload';
  fileContent: string | ArrayBuffer;
  responseContent: any;

  constructor(private fileUploadService:FileUploadService) {
    this.fileContent = ''; // Initializing with an empty string
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader: FileReader = new FileReader();
      reader.onload = (e) => {
        this.fileContent = reader.result as string | ArrayBuffer;
      };
      reader.readAsText(file);
      this.fileUploadService.uploadFile(file)
      .subscribe(
        (response) => {
          console.log('Upload response:', response);
          this.responseContent = response.output//JSON.stringify(response.output, null, 2).replace(/\n/g, '</br>');
          // Do something with the response here
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
  }
    }
}


