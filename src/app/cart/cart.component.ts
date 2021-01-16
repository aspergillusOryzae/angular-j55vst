import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items;
  totalCost;
  checkoutForm;

  constructor( 
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) { 
    this.checkoutForm = this.formBuilder.group({
      name: '',
      address: ''
    });
  }

  onSubmit(customerData) {
    console.log('Customer Data:', customerData, customerData['name'], customerData['address']);
    this.items = this.cartService.clearCart();
    this.checkoutForm.reset();
    console.warn('Your order has been submitted.');
  }

  ngOnInit() {
    this.totalCost = 0;
    this.items = this.cartService.getItems();
    this.items.forEach(item => {
      this.totalCost += Number(item['price']);
    });
  }

}