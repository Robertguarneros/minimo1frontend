import { Component } from '@angular/core';
import { PointOfInterest } from '../../models/point-of-interest';
import { FormsModule } from '@angular/forms';
import { PointOfInterestService } from '../../services/point-of-interest.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-point-of-interest',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './point-of-interest.component.html',
  styleUrl: './point-of-interest.component.css'
})
export class PointOfInterestComponent {
searchBarPointOfInterestString: string = '';
pointOfInterests: PointOfInterest[] = [];//pointOfInterests retrieved from the server
selectedPointOfInterest: PointOfInterest | null = null;
pointOfInterestSelected: boolean = false;
createMode: boolean = false;
searchPointOfInterestMode: boolean = false;
editMode: boolean = false;
deletePointOfInterestId: string = '';
searchedPointOfInterest: PointOfInterest | null = null;
pointOfInterestToBeEdited: PointOfInterest | null = null;
pagesize: number = 10;
currentPage: number = 1;


poiForm = new FormGroup({
  title: new FormControl('', Validators.required),
  coords: new FormGroup({
    latitude: new FormControl('', Validators.required),
    longitude: new FormControl('', Validators.required)
  })
});

constructor(public pointOfInterestService: PointOfInterestService, private formBuilder: FormBuilder){}

ngOnInit(): void {
  // Fetch data from API
  console.log('fetching point of interests');
  this.refreshPointOfInterestList();
}

onSelectPointOfInterest(pointOfInterest: PointOfInterest): void {
  this.selectedPointOfInterest = pointOfInterest;
  this.pointOfInterestSelected = true;
}

backtoPointOfInterestList(): void {
  this.selectedPointOfInterest = null;
  this.pointOfInterestSelected = false;
  this.createMode = false;
  this.editMode = false;
  this.searchPointOfInterestMode = false;
  this.searchedPointOfInterest = null;
}

createPoIBtn(): void {
  this.createMode = true;
}

onSubmit(): void {
if (this.poiForm.valid){
  const formValues = this.poiForm.value;
  const newPoI: PointOfInterest = {
    title: formValues.title || '',
    coords: {
      latitude: formValues.coords?.latitude || '0',
      longitude: formValues.coords?.longitude || '0'
    }
  };
  this.pointOfInterestService.createPoI(newPoI).subscribe({
    next: (createdPoI: PointOfInterest) => {
      console.log('User created:', createdPoI);
      // Optionally, reset the form after successful submission
      this.refreshPointOfInterestList();
      this.poiForm.reset();
      this.createMode = false;
      // You may also want to navigate the user back to the user list view or perform any other action
    },
    error: (error: any) => {
      console.error('Error creating user:', error);
      // Handle error cases
    }
  });
}
}

refreshPointOfInterestList(): void {
  // Fetch the updated user list from the server
  this.pointOfInterestService.getPoIs(this.currentPage, this.pagesize).subscribe(pointOfInterests => {
    this.pointOfInterests = pointOfInterests;
    console.log('Point of Interest list updated:', this.pointOfInterests);
  });
}

previousPage(): void {
  if(this.currentPage > 1){
    this.currentPage--;
    this.refreshPointOfInterestList();
  }
}

nextPage(): void {
  this.currentPage++;
  this.refreshPointOfInterestList();
}

searchForPointOfInterest(): void {
  this.searchPointOfInterestMode = true;
  if(this.searchBarPointOfInterestString != ''){
    this.pointOfInterestService.getPoI(this.searchBarPointOfInterestString).subscribe(pointOfInterest => {
      this.searchedPointOfInterest = pointOfInterest;
    });
  }else{
    this.searchedPointOfInterest = null;
  }
}

deletePointOfInterest(): void {
  if(this.selectedPointOfInterest){
    this.deletePointOfInterestId = this.selectedPointOfInterest._id || '';
  }else if(this.searchedPointOfInterest){
    this.deletePointOfInterestId = this.searchedPointOfInterest._id || '';
  }
  this.pointOfInterestService.deletePoI(this.deletePointOfInterestId).subscribe(() => { // Removed empty parentheses
    this.refreshPointOfInterestList();
    this.backtoPointOfInterestList();
  });
}


}
