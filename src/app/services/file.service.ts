import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { saveAs } from 'file-saver';
import { environment } from 'src/environments/environment';
import { File } from '../models/file.model';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl = `${environment.API_URL}/api/files`;

  constructor(private http: HttpClient) { }

  public getFile(name: string, url: string, type: string){
    // Blob is a file type in java script to denominate the files
    return this.http.get(url, {responseType: 'blob'})
    .pipe(
      tap((res) => {
        // Blob needs to have a array of the content and the type of that file (i.e .pdf, .txt, .csv, etc.)
        const blob = new Blob([res], {type: type});
        // With save as method it can be possible download and rename the file with the name you want.
        saveAs(blob, name);
      }),
      // If all is correct it returns a boolan that it means the request was sucessfully
      map(() => true)
    )
  }

  public uploadFile(file: Blob): Observable<File>{
    const dto = new FormData();
    dto.append('file', file);
    return this.http.post<File>(`${this.baseUrl}/upload`, dto
      /*
      The backend can be request you headers like these
      headers: {'Content-type': 'application/form-data ...}
      */
    );
  }

}
