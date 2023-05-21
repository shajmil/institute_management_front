import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as Payment from 'payment';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
cvv:any=false
  @Input() cvc: String='';
  @Input() expiry:String='' ;
  @Input() acceptedCards = [];
  @Input() number:any;
  @Input() dis:any;
  @Input() name: string = '';
  @Input() i18n = {
    name: 'YOUR NAME HERE',
    valid: 'valid thru',
    cvc:'cvc',
    number:'your number'
  };
  issuer: string = 'unknown';
  @Input() focused: string = '';
  maxLength: number = 16;
  nextNumber: string = '';
  newCardArray:any=[];
  expirylabel: string = '';
  constructor() {}

  ngOnInit(): void {
    this.initCard();
 
    // console.log(this.number);
    console.log('this.number: ', this.number);
  }

  ngAfterViewChecked(): void {
    Payment.fns.validateCardNumber(this.number);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.dis);
    
    console.log('this.focused: ', this.focused);
    if (changes['number']) this.valideNumber();
    if (changes['name']) this.valideName();
    if (changes['expiry']) this.valideExpiry();
    if (changes['cvc']) this.valideCVC();
  }

  valideName(): void {
    if (this.name?.length > 18) {
      this.name = this.name?.slice(0, 18);
    }
  }

  valideNumber(): void {
    this.issuerCard();
    this.optionsCard();
    this.numberCard();
    this.cvback();
  }

  valideExpiry(): void {
    if (this.expiry.length > 4) {
      this.expiry = this.expiry?.slice(0, 4);
    }
  }

  valideCVC(): void {
    if (this.cvc.length > 4) {
      this.cvc = this.cvc?.slice(0, 4);
      console.log('this.cvc: ', this.cvc);
    }
  }

  initCard(): void {
    
    // if (this.acceptedCards.length) {
    //   Payment.getCardArray().forEach((d:any ) => {
    //     if (this.acceptedCards.includes(d.type)) {
    //       this.newCardArray.push(d);
    //     }
    //   });
    // } else {
    //   this.newCardArray = this.newCardArray.concat(Payment.getCardArray());
    // }
    // Payment.setCardArray(this.newCardArray);
  }

  issuerCard(): void {
    this.issuer = Payment.fns.cardType(this.number) || 'unknown';
  }

  optionsCard(): void {
    if (this.issuer === 'amex') {
      this.maxLength = 15;
    } else if (this.issuer === 'dinersclub') {
      this.maxLength = 14;
    } else if (['hipercard', 'mastercard', 'visa'].includes(this.issuer)) {
      this.maxLength = 19;
    }
  }

  numberCard(): void {
    this.nextNumber = this.number?.replace(/[A-Za-z]| /g, '');
    // console.log('this.focused: ', (this.focused));
    console.log('this.nextNumber: ', this.nextNumber);
    if (this.maxLength > 16) {
      this.maxLength = this.nextNumber.length <= 16 ? 16 : this.maxLength;
    }
    if (this.nextNumber.length > this.maxLength) {
      this.nextNumber = this.nextNumber.slice(0, this.maxLength);
    }
    while (this.nextNumber.length < this.maxLength) {
      this.nextNumber += '•';
    }
    if (['amex', 'dinersclub'].includes(this.issuer)) {
      const format = [0, 4, 10];
      const limit = [4, 6, 5];
      this.nextNumber = `${this.nextNumber.substr(
        format[0],
        limit[0]
      )} ${this.nextNumber.substr(
        format[1],
        limit[1]
      )} ${this.nextNumber.substr(format[2], limit[2])}`;
    } else if (this.nextNumber.length > 16) {
      const format = [0, 4, 8, 12];
      const limit = [4, 7];
      this.nextNumber = `${this.nextNumber.substr(
        format[0],
        limit[0]
      )} ${this.nextNumber.substr(
        format[1],
        limit[0]
      )} ${this.nextNumber.substr(
        format[2],
        limit[0]
      )} ${this.nextNumber.substr(format[3], limit[1])}`;
    } else {
      for (let i = 1; i < this.maxLength / 4; i++) {
        const space_index = i * 4 + (i - 1);
        this.nextNumber = `${this.nextNumber.slice(
          0,
          space_index
        )} ${this.nextNumber.slice(space_index)}`;
      }
    }
  }

  expiryCard(): string {
    let month = '';
    let year = '';
    if (this.expiry.includes('/')) {
      [month, year] = this.expiry.split('/');
    } else if (this.expiry.length) {
      month = this.expiry.substr(0, 2);
      year = this.expiry.substr(2, 6);
    }
    while (month.length < 2) {
      month += '•';
    }
    if (year.length > 2) {
      year = year.substr(2, 4);
    }
    while (year.length < 2) {
      year += '•';
    }
    return `${month}/${year}`;
  }

  classNumber(): string {
    return `rccs__number ${
      this.number?.replace(/ /g, '').length > 16 ? 'rccs__number--large' : ''
    }
  
    console.log('  this.number: ',   ( this.number));

    
    ${this.focused === 'number' ? 'rccs--focused' : ''} ${
      this.number?.substr(0, 1) !== '•' ? 'rccs--filled' : ''
    }`;
  }

  classCard(): string {
    return `rccs__card rccs__card--${this.issuer} ${
 this.dis
        ? 'rccs__card--flipped'
        : ''
    }`;
  }
cvback(){
  this.cvv=true;
  console.log('this.cvv: ', this.cvv);

}

  classCVC(): string {

    return `rccs__cvc__front ${this.focused === 'cvc' ? 'rccs--focused' : ''}`;
  }

  className(): string {
    // console.log('this.focused : ', this.focused );
    return `rccs__name ${this.focused === 'name' ? 'rccs--focused' : ''} ${
      this.name ? 'rccs--filled' : ''
    }`;
  }

  classExpiry(): string {
    return `rccs__expiry ${this.focused === 'expiry' ? 'rccs--focused' : ''} ${
      this.expiry.substr(0, 1) !== '•' ? 'rccs--filled' : ''
    }`;
  }

  classCVCBack(): string {
    return `rccs__cvc ${this.focused === 'cvc' ? 'rccs--focused' : ''}`;
  }
}  
