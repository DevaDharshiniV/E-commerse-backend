import { Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
//
export class CategoriesComponent implements OnInit{
  categoryArray: Category[] = [];
  formCategory: string = '';
  formStatus: string = 'Add';
  categoryId: string = '';
  categoryExists: boolean = false;

  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.categoryService.loadData().subscribe((val: any[]) => {
      console.log(val);
      this.categoryArray = val.map(c => ({ id: c.id,category: c.data.category }));
    });
  }

  onSubmit(formData: NgForm) {
    // Check if the entered category already exists
    this.categoryExists = false;
    for (let category of this.categoryArray) {
      if (category.category === formData.value.category) {
        this.categoryExists = true;
        break;
      }
    }

    // If the category already exists, display an error message
    if (this.categoryExists) {
      alert('Category already exists');
      return;
    }

    let categoryData: Category = {
      category: formData.value.category,
    };
    if (this.formStatus == 'Add') {
      this.categoryService.saveData(categoryData);
      formData.reset();
    } else if (this.formStatus == 'Edit' && this.categoryId) {
      console.log(this.categoryId);
      this.categoryService.updateData(this.categoryId, categoryData);
      formData.reset();
      this.formStatus = 'Add';
    }
  }

  onEdit(category: any, id: any) {
    this.formCategory = category;
    this.formStatus = 'Edit';
    this.categoryId = id;
  }

  onDelete(id: any) {
    this.categoryService.deleteData(id);
  }
}



