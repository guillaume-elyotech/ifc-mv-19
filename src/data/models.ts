export interface AppIfcmState {
  //propheticmessage : PropheticMessage[];
  //verseoftoday : VerseOfToday[];
  propheticmessage : PropheticMessage;
  verseoftoday : VerseOfToday;
  events : Event[];
  shopping: Shopping[];
  teachings: Teaching[];
  myOrders : Order [];
  myunlockedteachings?: number[];
  branches :Branch[];
  loading?: boolean;
  currentOrder: Order;
}

export interface UserState {
    isLoggedin: boolean;
    username?: string;
    loading: boolean;
    userData?: UserAccount;

}
/*********** User ************/
export interface UserAccount {
    
  uid: string;
  firstname: string;
  lastname: string;
  fullname: string;
  email: string;
  profilePhoto : string;
  gender : string;
  age : number;
  country : string;
  branch : string;

}
/*********** HOMEPAGE ************/

export interface PropheticMessage {
    id: number;
    date : Date;
    title: string;
    text: string;
    author: string;
  }

  export interface VerseOfToday {
    id: number;
    date: Date;
    verse: string;
    text: string;
  }


  export interface Event {
    id: number;
    imgsrc: string;
    title: string;
    startdate: Date;
    enddate: Date;
    shortdesc: string;
    description: string;
    location: string;
    address: string;
    price: number;
    currencycode : string;
    currency : string;
  }
  /*********** SHOPPING PAGE ************/

  export interface Shopping {
    
    id: number;
    category: string;
    count : number;
    items : ShoppingItem[];

  }
  export interface ShoppingItem {
    
    id: string;
    idcat: string;
    category : string,
    title: string;
    description: string;
    imgsrc: string;
    author: string;
    price: number;
    currencycode : string;
    currency : string;
    date : Date;
    }

    export interface ShoppingCartItem {
      id : string;
      idcat : string;
      category : string;
      type : string;
      title: string;
      imgsrc: string;
      author : string;
      price: number;
      qty : number;
      currencycode : string;
      currency : string;
      amount : number;
    };
    
  /*********** TEACHING PAGE ************/


    export interface Teaching {
      id: number;
      category: string;
      count : number;
      imgsrc: string;
      lessons : TeachingLesson[];
    }
  
  
    export interface TeachingLesson {
      id: number;
      idcat: number;
      category: string;
      title: string;
      text: string;
      imgsrc: string;
      author: string;
      price: number;
      currencycode : string;
      currency : string;
      date : Date;
      lock: boolean;
    }

    export interface UnlockedTeaching {
      id: number;
    }
    
 /*********** ORDER PAGE ************/

    export interface Order {
      orderid: number;
      creationdate: Date;
      deliverydate: Date;
      createdBy : string;
      createdByName : string;
      shippingstatus: string;
      orderstatus : string;
      totalamount : number;
      currencycode : string;
      currency : string;
      paymentmethod : string;
      paymentcard : string;
      transactionid : string;
      shippingaddress : string;
      orderitems : OrderItem[];
    };

    export interface OrderItem {
      id : number;
      idcat : number;
      category : string;
      type : string;
      title: string;
      imgsrc: string;
      author : string;
      price: number;
      qty? : number;
      amount : number;
      currencycode : string;
      currency : string;
  
  
    }

    export interface TeachingOrderModel {
      orderid: number;
      creationdate: Date;
      deliverydate: Date;
      createdBy : string;
      createdByName : string;
      shippingstatus: string;
      orderstatus : string;
      totalamount : number;
      currencycode : string;
      currency : string;
      paymentmethod : string;
      paymentcard : string;
      transactionid : string;
      shippingaddress : string;
      orderitems : TeachingOrderCat[];
    };

    export interface TeachingOrderCat {
      id : number;
      idcat : number;
      category : string;
      type : string;
      title: string;
      imgsrc: string;
      author : string;
      price: number;
      qty? : number;
      amount : number;
      currencycode : string;
      currency : string;
    }
 /*********** DONATION PAGE ************/

  export interface Branch {
    
    location: string;
    name : string;
    address: string;
    contact: string;
    facebookUrl : string;
    instagramUrl: string;
    twitterUrl : string;
    youtubeUrl : string;

  }

    export interface DonationOrder {
    id : number;
    type : string;
    branch: string;
    project: string;
    author : string;
    amount: number;
    currencycode : string;
    currency : string;
    date : Date;

  }