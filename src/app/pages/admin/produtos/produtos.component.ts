import { Component, OnInit, inject } from '@angular/core';
import { ModalComponent } from '../../../shared/comps/modal/modal.component';
import { ProductService } from '../../../shared/services/product/product.service';
import { SideBarComponent } from '../../../shared/comps/side-bar/side-bar.component';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ItemComponent } from '../../item/item.component';
import { AttributeComponent } from '../../../shared/comps/attribute/attribute.component';
import { FormBuilder, Validators } from '@angular/forms';
import { InputFormComponent } from '../../../shared/comps/form/input-form/input-form.component';
import { TextAreaFormComponent } from '../../../shared/comps/form/text-area-form/text-area-form.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ValidateComponent } from '../../../shared/comps/form/validate/validate.component';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [ModalComponent,
    CommonModule,
    SideBarComponent,
    CurrencyPipe,
    ItemComponent,
    AttributeComponent,
    InputFormComponent,
    TextAreaFormComponent,
    AttributeComponent,
    ValidateComponent
  ],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.scss'
})
export class ProdutosComponent implements OnInit {

  router = 'select'

  file!: File;

  productImagePreview: SafeUrl | undefined;

  private products = inject(ProductService)
  private formBuilder = inject(FormBuilder)
  private sanitizer = inject(DomSanitizer)

  produtos: any[] = []
  product: any

  attributes: any[] = []

  productForm = this.formBuilder.group({
    productName: ['', [Validators.required]],
    description: ['', [Validators.required]],
    allDescription: [' '],
    basePrice: [0, [Validators.required]],
    category: ['', [Validators.required]],
    available: [0, []]
  })

  viewAllError = false

  ngOnInit(): void {
    this.products.getByOffSet('', 0).subscribe(data => {
      this.produtos = data
    })
  }

  getAttributeList(attrs: any) {
    return attrs?.map((attr: any) => attr.attributeName)?.join(', ')
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer?.files;

    if (file && file.length > 0) {
      this.file = file[0];
      this.productImagePreview = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(this.file)
      );
    }
  }

  onFileSelected(event: any) {
    const fileList: FileList | null = event.target.files;

    if (fileList && fileList.length > 0) {
      this.file = fileList[0];
      this.productImagePreview = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(this.file)
      );
    }
  }

  createOrEdit() {
    if (this.product) {
      this.edit()
    } else {
      this.create()
    }
  }

  create() {
    if (this.productForm.valid) {
      let product = { ...this.productForm.value, attributes: this.attributes }

      this.products.create(product).subscribe(data => {
        console.log(data)
        this.clearForm()
        this.updateForList(data)
      })
    } else {
      this.viewAllError = true
    }
  }

  showEdit() {
    this.clearForm()
    this.setFormValue()
    this.router = 'castrat'
  }

  showCreate(){
    this.clearForm()
    this.product = null
  }

  edit() {
    if (this.productForm.valid) {
      let product = { ...this.productForm.value, attributes: this.attributes }

      this.products.update(this.product.id, product).subscribe(data => {
        console.log(data)
        this.clearForm()
        this.updateForList(data)
      })

    } else {
      this.viewAllError = true
    }
  }

  delete() {

  }

  clearForm() {
    this.productForm = this.formBuilder.group({
      productName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      allDescription: [' '],
      basePrice: [0, [Validators.required]],
      category: ['', [Validators.required]],
      available: [0, []]
    })

    this.viewAllError = false
  }

  setFormValue() {
    this.productForm.setValue({
      productName: this.product.productName ?? '',
      description: this.product.description ?? '',
      allDescription: this.product.allDescription ?? ' ',
      basePrice: this.product.basePrice ?? 0,
      category: this.product.category ?? '',
      available: this.product.available ?? 0
    })
  }

  updateForList(product: any){
    let index = this.produtos.findIndex(product_ => product_.id === product.id)

    if(index != -1){
      this.produtos[index] = product
    } else {
      this.produtos.push(product)
    }
  }
}
