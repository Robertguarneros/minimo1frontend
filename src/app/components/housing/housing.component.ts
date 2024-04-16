// import { Component } from '@angular/core';
// import { IHousing } from '../../models/housing';
// import {FormsModule} from '@angular/forms';
// import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms';
// import { Title } from '@angular/platform-browser';
// import { HousingService } from '../../services/housing.service';
// import mongoose from 'mongoose';


// @Component({
//   selector: 'app-housing',
//   standalone: true,
//   imports: [FormsModule,ReactiveFormsModule],
//   templateUrl: './housing.component.html',
//   styleUrl: './housing.component.css'
// })
// export class HousingComponent {

// searchBarHouseString: string='';
// houses: IHousing[] = [];//users retrieved from the server
// selectedHouse: IHousing | null = null;
// houseSelected: boolean = false;
// createMode:boolean=false;
// searchHouseMode:boolean=false;
// editMode:boolean=false;
// searchedHouse: IHousing | null = null;
// deactivateHouseId:string='';
// houseToBeEdited: IHousing | null = null;

//   houseForm = new FormGroup ({
//     title: new FormControl('', Validators.required),
//     description: new FormControl('', Validators.required),
//     owner: new FormControl('', Validators.required),
//     reviews: new FormControl([]),
//     rating: new FormControl('', Validators.required),
//     coord: new FormGroup({
//       latitude: new FormControl('', Validators.required),
//       longitude: new FormControl('', Validators.required)
//     }),
//     photo: new FormControl('', Validators.required),
//     address: new FormControl('', Validators.required),
//     availability: new FormControl(false, Validators.required),
//     coffee: new FormControl(false, Validators.required),
//     schedule: new FormGroup({
//       monday: new FormControl('', Validators.required),
//       tuesday: new FormControl('', Validators.required),
//       wednesday: new FormControl('', Validators.required),
//       thursday: new FormControl('', Validators.required),
//       friday: new FormControl('', Validators.required),
//       saturday: new FormControl('', Validators.required),
//       sunday: new FormControl('', Validators.required)
//     }),
//     verified: new FormControl(false, Validators.required),
//     house_deactivated: new FormControl(false, Validators.required),
//   });

//   constructor( public housingService: HousingService, private formBuilder: FormBuilder){}

//   ngOnInit(): void {
//     // Fetch data from API
//     console.log('fetching houses');
//     this.housingService.getHouses().subscribe(houses => {
//       this.houses = houses;
//       console.log(this.houses);
//     })
//   }

//   onSelectHouse(house: IHousing): void{
//     this.houseSelected = true;
//     this.selectedHouse = house;
//   }

//   backToHouseList(): void{
//     this.houseSelected = false;
//     this.selectedHouse = null;
//     this.createMode = false;
//     this.searchHouseMode = false;
//     this.searchedHouse = null;
//     this.editMode = false;
//   }

//   createHouseBtn(): void{
//     this.createMode = true;
//   }

//   refreshHouseList(): void {
//     // Fetch the updated user list from the server
//     this.housingService.getHouses().subscribe(houses => {
//       this.houses = houses;
//       console.log('House list updated:', this.houses);
//     });
//   }

//   onSubmit(): void {
//     if (this.houseForm.valid) {
//       // Extract form values
//       const formValues = this.houseForm.value;
  
//       // Create a new house object from form values
//       const newHouse: IHousing = {
//         title: formValues.title || '',
//         description: formValues.description || '',
//         owner: formValues.owner || '',
//         reviews: formValues.reviews || [''],
//         rating: formValues.rating || '',
//         coords: {
//           longitude: (formValues.coord?.longitude || ''),
//           latitude: (formValues.coord?.latitude || ''),
//         },
//         photo: formValues.photo || '',
//         address: formValues.address || '',
//         availability: formValues.availability || false,
//         coffee: formValues.coffee || false,
//         schedule: {
//           monday: (formValues.schedule?.monday || ''),
//           tuesday: (formValues.schedule?.monday || ''),
//           wednesday: (formValues.schedule?.monday || ''),
//           thursday: (formValues.schedule?.monday || ''),
//           friday:(formValues.schedule?.monday || ''),
//           saturday: (formValues.schedule?.monday || ''),
//           sunday: (formValues.schedule?.monday || ''),
//         },
//         verified: formValues.verified || false,
//         house_deactivated: formValues.house_deactivated || false,
//       };
  
//       this.housingService.createHouse(newHouse).subscribe({
//         next: (createdUser: IHousing) => {
//           console.log('User created:', createdUser);
//           // Optionally, reset the form after successful submission
//           this.refreshHouseList();
//           this.houseForm.reset();
//           this.createMode = false;
//           // You may also want to navigate the user back to the user list view or perform any other action
//         },
//         error: (error: any) => {
//           console.error('Error creating house:', error);
//           // Handle error cases
//         }
//       });
//     }
//   }

//   searchForHouse(): void {
//     this.searchHouseMode = true;
//     if(this.searchBarHouseString != ''){
//       this.housingService.getHouse(this.searchBarHouseString).subscribe(house => {
//         this.searchedHouse = house;
//       });
//     }else{
//       this.searchedHouse = null;
//     }
//   }

//   deactivateHouse(): void {
//     if(this.selectedHouse){
//       this.deactivateHouseId = this.selectedHouse._id || '';
//     }else if(this.searchedHouse){
//       this.deactivateHouseId = this.searchedHouse._id || '';
//     }
//     this.housingService.deleteHouse(this.deactivateHouseId).subscribe(() => { // Removed empty parentheses
//       this.refreshHouseList();
//       this.backToHouseList();
//     });
//   }

//   // editHouseMode(): void {
//   //   this.editMode = true;
//   //   if(this.selectedHouse){
//   //     this.houseToBeEdited = this.selectedHouse;
//   //   }else if(this.searchedHouse){
//   //     this.houseToBeEdited = this.searchedHouse;
//   //   }
//   //   this.houseForm.patchValue({
//   //     title: this.houseToBeEdited?.title || '',
//   //       description: this.houseToBeEdited?.description || '',
//   //       owner: this.houseToBeEdited?.owner || '',
//   //       reviews: this.houseToBeEdited?.reviews || [''],
//   //       rating: this.houseToBeEdited?.rating || '',
//   //       coords: {
//   //         longitude: (this.houseToBeEdited?.coords?.longitude || ''),
//   //         latitude: (this.houseToBeEdited?.coords?.latitude || ''),
//   //       },
//   //       photo: this.houseToBeEdited?.photo || '',
//   //       address: this.houseToBeEdited?.address || '',
//   //       availability: this.houseToBeEdited?.availability || false,
//   //       coffee: this.houseToBeEdited?.coffee || false,
//   //       schedule: {
//   //         monday: (this.houseToBeEdited?.schedule?.monday || ''),
//   //         tuesday: (this.houseToBeEdited?.schedule?.monday || ''),
//   //         wednesday: (this.houseToBeEdited?.schedule?.monday || ''),
//   //         thursday: (this.houseToBeEdited?.schedule?.monday || ''),
//   //         friday:(this.houseToBeEdited?.schedule?.monday || ''),
//   //         saturday: (this.houseToBeEdited?.schedule?.monday || ''),
//   //         sunday: (this.houseToBeEdited?.schedule?.monday || ''),
//   //       },
//   //       verified: this.houseToBeEdited?.verified || false,
//   //       house_deactivated: this.houseToBeEdited?.house_deactivated || false,
//   //   });
//   // }

  


// }



