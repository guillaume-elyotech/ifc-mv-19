
import {db, auth} from './Firebase';
import React, {useState, useEffect, useContext} from "react"
import { addDoc, collection } from "firebase/firestore"; 
import { doc, setDoc,updateDoc } from "firebase/firestore"; 
import { PropheticMessage, VerseOfToday , Event, Teaching, ShoppingItem, Shopping, Order, UnlockedTeaching, OrderItem, DonationOrder, TeachingLesson, Branch} from '../data/models';
import { parseLessons } from '../data/dataApi';
import { getAuth, User } from 'firebase/auth';
import { useAuthentication, firebaseAuth } from '../components/Authentication/AuthProvider';

import {app} from '../Firebase/Firebase';

const dataUrl2 = '/assets/data/locations.json';

/******************************************** LOGIN PAGE *********************************************/ 
// fonction recup firestore user by uid 

export const updateMyOrder = async (orderId: string,last4: any,brand: any,adress: any,city: any,country: any,id: any) => {
  
  const up = await updateDoc(doc(db, "orders", orderId), {
    orderstatus: "succeeded",
    paymentcard: last4,
    paymentmethod: brand,
    shippingaddress: adress + " " + city + " " + country,
    shippingstatus: "Delivered",
    transactionid: id,
  });
  return up;
};

/******************************************** SIGN PAGE *********************************************/ 


export const SignupPageMethods = {
  PostUser: async (useruid:any, email:any, firstName:any, lastName:any, userbranch: any, usercountry: any, usergender: any, userage: any ) => {
      try {
        const data = {
          uid : useruid,
          email : email,
          firstname : firstName,
          lastname : lastName,
          fullname: firstName+" "+lastName,
          profilePhoto :"",
          age: userage,
          branch: userbranch,
          country: usercountry,
          gender : usergender
        }
        await setDoc(doc(db, "users", useruid), data);
      } catch (err) {
        console.log('error getting items');
        return []
      }
  }, 

  writeUserData: async (userData : User) => {

  try {
    if (userData !== null) {
        console.log("  User UID: " + userData.uid);
        console.log("  Name: " + userData.displayName);
        console.log("  Email: " + userData.email);
        console.log("  Photo URL: " + userData.photoURL);

        const data = {
          uid : userData.uid,
          email : userData.email,
          profilePhoto : userData.photoURL,
          fullname : userData.displayName,
          age: 0,
          branch: "",
          country: "",
          gender : ""
        } 

          await setDoc(doc(db, "users", userData.uid), data);
      }
        } catch (err) {
          console.log('error getting items');
          return []
        }
  },

  getUserProfile: async (useruid : any) => {
    try{
      
              var userRef = db.collection("users").doc(useruid);
              var activeRef = await userRef.get().then((doc) => {
                    if (doc.exists) {
                      console.log("getUserProfile UserDocument data:", doc.data());
                     /* return {
                        ...doc.data(),
                      }; */

                      return doc.data();

                    } else {
                      // doc.data() will be undefined in this case
                      console.log("No such document!", useruid);
                      return null;
                    }
              })
            .catch((error) => {
              console.log("Error getting document:", error);
              return error;
            });
  }
   catch (err) {
      console.log('error getting items');
      return (err);
  }
},
   
    
  
}
    

/******************************************** HOME PAGE *********************************************/ 


export const HomePageMethods = {
  getLastPropheticsMessage: async (): Promise<PropheticMessage[]> => {
      try {
        let itemsRef = db.collection('propheticmessage').orderBy("id", "desc").limit(1)
        let activeRef = await itemsRef.get();
        const items: PropheticMessage[] = []

        for (let item of activeRef.docs) {
          let data = item.data()

          const newItem = {
            id: data.id,
        date: new Date(data.creationdate.toDate()),
        title: data.title,
        text: data.text,
        author: data.author
          }
  
          items.push(newItem)
        }
        return items
      } catch (err) {
        console.log('error getting items');
        return []
      }
  },
  getLastVerseOfToday: async (): Promise<VerseOfToday[]> => {
    try{
      let itemsRef = db.collection('verseoftoday').orderBy("id", "desc").limit(1)
      let activeRef = await itemsRef.get();
  
      const items: VerseOfToday[] = []
      for (let item of activeRef.docs) {
        let data = item.data();
  
        const newItem = {
          id: data.id,
          date: new Date(data.creationdate.toDate()),
          verse: data.verse,
          text: data.text,  
        }
        console.log(items)
        items.push(newItem)
      }
      return items;
    } catch (err) {
      console.log('error getting items');
      return [];
    }
    },
    getAllEvents: async (): Promise<Event[]> => {
      try{
        let itemsRef = db.collection('events')
        let activeRef = await itemsRef.get();
    
        const items: Event[] = []
        for (let item of activeRef.docs) {
          let data = item.data();
    
          const newItem = {
            id: data.id,
            imgsrc: data.imgsrc,
            title: data.title,
            startdate: new Date(data.startdate.toDate()),
            enddate: new Date(data.enddate.toDate()),
            shortdesc: data.shortdesc,
            description: data.description,
            location: data.location,
            address: data.address,
            price: data.price,
            currencycode: data.currencycode,
            currency: data.currency,
          }
          console.log(items)
          items.push(newItem)
        }
        return items;
      } catch (err) {
        console.log('error getting items');
        return [];
      }
      },
      getEventsbyId: async (id:any): Promise<Event[]> => {
        try{
          let itemsRef = db.collection('events').where("id", "==",id)
          let activeRef = await itemsRef.get();
      
          const items: Event[] = []
          for (let item of activeRef.docs) {
            let data = item.data();
      
            const newItem = {
              id: data.id,
              startdate: data.startdate,
              enddate: data.enddate,
              imgsrc: data.imgsrc,
              title: data.title,
              shortdesc: data.shortdesc,
              description: data.description,
              location: data.location,
              address: data.address,  
              price: data.price,  
              currencycode: data.currencycode,  
              currency: data.currency,  
            }
            console.log(items)
            items.push(newItem)
          }
          return items;
        } catch (err) {
          console.log('error getting items');
          return [];
        }
      }
}
    
    
/******************************************** SHOPPING PAGE *********************************************/ 



export const ShoppingPageMethods = {
  getAllShoppingItems: async (): Promise<Shopping[]> => {
    try {
      let itemsRef = db.collection('shopping')
      let activeRef = await itemsRef.get();
      const items: Shopping[] = []

      for (let item of activeRef.docs) {
        let data = item.data()

        const newItem = {
          id: data.id,
          category:data.category,
          count:data.count,
          items:data.items
        }

        items.push(newItem)
      }

      return items
    } 
    
    catch (err) {
      console.log('error getting items');
      return []
    }
},
  

}

/******************************************** TEACHING PAGE *********************************************/ 

export const TeachingPageMethods = {
  getAllTeaching: async (): Promise<Teaching[]> => {
      try {
        let itemsRef = db.collection('teachings')
        let activeRef = await itemsRef.get();
        const items: Teaching[] = []

        for (let item of activeRef.docs) {
          let data = item.data()

          const newItem = {
            id: data.id,
            category:data.category,
            count:data.count,
            imgsrc:data.imgsrc,
            lessons:data.lessons
          }
  
          items.push(newItem)
        }

        return items
      } 
      
      catch (err) {
        console.log('error getting items');
        return []
      }
  },

 getMyUnlockedTeachings:  (myorders : Order[]): number[]   => {

  const myunlockteaching: number[] = [];

  myorders.forEach((order) => {
    const teachings = order.orderitems.filter((s) => (s.type = "Teaching"));
    if (teachings.length) {
      teachings.forEach((lesson) => {
        const lessonIdToAdd = {
          id: lesson.id,
        };
        myunlockteaching.push(lessonIdToAdd.id);
      });
    }
  });

  const uniqueTeachings = myunlockteaching.filter((val,id,array) => array.indexOf(val) == id);
  
  return uniqueTeachings;

  //return myunlockteaching;

 },

 teachingToOrder: (lesson?: any): OrderItem => {
  console.log("teachingToOrder : initilization");

  const myorderitem: OrderItem = {} as OrderItem;

  if (lesson) {
    if (lesson.id) myorderitem.id = lesson.id;
    if (lesson.idcat) myorderitem.idcat = lesson.idcat;
    if (lesson.category) myorderitem.category = lesson.category;
    if (lesson.price) {
      myorderitem.amount = lesson.price;
      myorderitem.price = lesson.price;
    }
    if (lesson.currency) myorderitem.currency = lesson.currency;
    if (lesson.currencycode) myorderitem.currencycode = lesson.currencycode;
    if (lesson.title) myorderitem.title = lesson.title;
    if (lesson.author) myorderitem.author = lesson.author;
    if (lesson.imgsrc) myorderitem.imgsrc = lesson.imgsrc;

    myorderitem.type = "Teaching";
    myorderitem.qty = 1;
  } else console.log("No lession to order");

  console.log("teachingToOrder : ");
  console.log("teachingToOrder - New Order Item : ");
  console.log(myorderitem);

  return myorderitem;
},

 purchaseTeaching: async (lesson: TeachingLesson): Promise <Order> => {
  
  const myorderitem: OrderItem = TeachingPageMethods.teachingToOrder(lesson);
  console.log("purchaseTeaching: New order items is : " + myorderitem);

  let lastordernum = await OrderPageMethods.getLastOrderId();
  console.log("purchaseTeaching: Last order Id is : " + lastordernum);

  const orderId = lastordernum + 1;
  console.log("purchaseTeaching: New order Id is : " + orderId);

  const myorder: Order = {
    orderid: orderId,
    creationdate: new Date(),
    createdBy: 'auth.currentUser?.uid' as string,
    createdByName: 'auth.currentUser?.displayName' as string,
    deliverydate: new Date(),
    shippingstatus: "Not shipped",
    orderstatus: "Draft",
    totalamount: myorderitem.amount,
    currency: myorderitem.currency,
    currencycode: myorderitem.currencycode,
    paymentmethod: "",
    paymentcard: "",
    transactionid: "",
    shippingaddress: "",
    orderitems: [myorderitem],
    //orderitems.forEach(s => s.push(myorderitem));
  };

  //Ecrire l'ordre dans firestore

  //writeOrderData(orderId, myorder);
  console.log("purchaseTeaching: Order write in FireStore : " + orderId);

  return myorder;
},

}


/******************************************** ORDER PAGE *********************************************/ 

export const OrderPageMethods = {

  getCurrentOrder: async (orderId: string): Promise<Order[]> => {
    try {

      let itemsRef = db.collection('orders').where("orderid", "==",orderId);
      let activeRef = await itemsRef.get();
      const items: Order[] = []

      for (let item of activeRef.docs) {
        let data = item.data()

        const newItem = {
          orderid: data.orderid,
          creationdate: data.creationdate,
          deliverydate: data.deliverydate,
          createdBy: data.createdBy,
          createdByName: data.createdByName,
          shippingstatus: data.shippingstatus,
          orderstatus: data.orderstatus,
          totalamount: data.totalamount,
          currencycode: data.currencycode,
          currency: data.currency,
          paymentmethod: data.paymentmethod,
          paymentcard: data.paymentcard,
          transactionid: data.transactionid,
          shippingaddress: data.shippingaddress,
          orderitems: data.orderitems
        }

        items.push(newItem)
      }

      return items
    } 
    
    catch (err) {
      console.log('error getting order items');
      return []
    }
},

  getMyOrders: async (userId: string): Promise<Order[]> => {
      try {

        let itemsRef = db.collection('orders').where("createdBy", "==",userId);
        let activeRef = await itemsRef.get();
        const items: Order[] = []

        for (let item of activeRef.docs) {
          let data = item.data()

          const newItem = {
            orderid: data.orderid,
            creationdate: data.creationdate,
            deliverydate: data.deliverydate,
            createdBy: data.createdBy,
            createdByName: data.createdByName,
            shippingstatus: data.shippingstatus,
            orderstatus: data.orderstatus,
            totalamount: data.totalamount,
            currencycode: data.currencycode,
            currency: data.currency,
            paymentmethod: data.paymentmethod,
            paymentcard: data.paymentcard,
            transactionid: data.transactionid,
            shippingaddress: data.shippingaddress,
            orderitems: data.orderitems
          }
  
          items.push(newItem)
        }

        return items
      } 
      
      catch (err) {
        console.log('error getting items', err);
        return []
      }
  },

  getLastOrderId: async (): Promise<number> => {
    try {

      let lastordernum: number = 70000000;

      let itemsRef = db.collection('orders').orderBy("orderid", "desc").limit(1)
      let activeRef = await itemsRef.get();
      const items: Order[] = []
      for (let item of activeRef.docs) {
        let data = item.data();
        if (!data) {
          lastordernum = 70000000
        }
        else
        {
          lastordernum = data.orderid

          
        }
      }
      console.log('Last order id is : ', lastordernum);
      return lastordernum;
    } catch (err) {
      console.log('error getting last order ir');
      return 70000000;
    }
  },

 donationToOrder: (donation?: any): OrderItem => {
    console.log("donationToOrder : initilization");
  
    let myorderitem: OrderItem = {} as OrderItem;
    if (donation) {
      if (donation.id) myorderitem.id = donation.id;
      if (donation.amount) {
        myorderitem.amount = donation.amount;
        myorderitem.price = donation.amount;
      }
      if (donation.currency) myorderitem.currency = donation.currency;
      if (donation.currencycode) myorderitem.currencycode = donation.currencycode;
      if (donation.project)
        myorderitem.title = donation.project + " - " + donation.branch;
      if (donation.author) myorderitem.author = donation.author;
  
      myorderitem.idcat = 0;
      myorderitem.category = "";
      myorderitem.type = "Donation";
      myorderitem.qty = 1;
      myorderitem.imgsrc = "/assets/img/charities2.jpeg";
    } else console.log("No donation to order");
  
    console.log("donationToOrder : ");
    console.log("donationToOrder - New Order Item : ");
    console.log(myorderitem);
  
    return myorderitem;
  },
  
  purchaseDonation: async (donation: any) => {
  const myorderitem: OrderItem = await OrderPageMethods.donationToOrder(donation);
  console.log("purchaseDonation: New order items is : " + myorderitem);

  const lastordernum = await OrderPageMethods.getLastOrderId();
  console.log("purchaseDonation: Last order Id is : " + lastordernum);

  const orderId = lastordernum + 1;
  console.log("purchaseDonation: New order Id is : " + orderId);

  myorderitem.id = orderId;

  const myorder: Order = {
    orderid: orderId,
    creationdate: new Date(),
    createdBy: 'auth.currentUser?.uid' as string,
    createdByName: 'auth.currentUser?.displayName',
    deliverydate: new Date(),
    shippingstatus: "Not shipped",
    orderstatus: "Draft",
    totalamount: myorderitem.amount,
    currency: myorderitem.currency,
    currencycode: myorderitem.currencycode,
    paymentmethod: "",
    paymentcard: "",
    transactionid: "",
    shippingaddress: "",
    orderitems: [myorderitem],
    //orderitems.forEach(s => s.push(myorderitem));
  };

  return myorder;
},

writeOrderData: async (OrderId: number, orderpending: Order) => {

  try {
    console.log("Write Order Data");
    console.log(db);
    console.log("OrderId to Write in the database" + OrderId,'' , "Order Pending", orderpending);
    if (OrderId && orderpending) {
      return await setDoc(doc(db, "orders", `${OrderId}`), orderpending);
    }
      }
        catch (err) {
          console.log('error write oders in data');
          console.log(err);
          return []
        }},


        getOrderById: async (orderId: string): Promise<any> => {
          try {
    
                  var itemsRef = db.collection("orders").doc(orderId);
                  console.log('getOrderById : resultat requete : ',itemsRef);
                  var activeRef = await itemsRef.get().then((doc) => {
                    if (doc.exists) {
                      console.log("Document data:", doc.data());
                      return {...doc.data()};
                    
                    } else {
                    
                      // doc.data() will be undefined in this case
                      console.log("No such document!", orderId);
                      return null;
                    
                    }
                  })
                  .catch((error) => {
                    console.log("Error getting document:", error);
                    return null;
                  });
            }
          catch (err) {
            console.log('error getting orders',orderId);
            return null;
          }

},
        

}

/******************************************** PROFILE PAGE *********************************************/ 

/******************************************** PROFILE PAGE *********************************************/ 

/**** Fonction pour gestion des ordres dans la base Firebase RealTime *****/


export const getAppDataFromFS = async () => {

  let myOrders : any;
  let myunlockedteachings : any;
  //const auth = getAuth(app);
  const auth = getAuth();
  const user = auth.currentUser;
  if (user){
    const userUid = user.uid;
    if (userUid != null && userUid != undefined) {
  
      console.log("getAppDataFromFS : userId", userUid);
      myOrders = await OrderPageMethods.getMyOrders(userUid as string);
      console.log("getAppDataFromFS : myOrders");
      console.log(myOrders);
    
      myunlockedteachings =  TeachingPageMethods.getMyUnlockedTeachings(myOrders);
      console.log("getAppDataFromFS : myUnlockedTeachings");
      console.log(myunlockedteachings);
  
    }
    else { 
      console.log("The user is not defined : ", user)}

  }



  const messageprophet = await HomePageMethods.getLastPropheticsMessage(); 
  console.log("getAppDataFromFS : propheticmessage");
  console.log(messageprophet);
  const propheticmessage = messageprophet[0];
  console.log(propheticmessage);


  const versearray  = await HomePageMethods.getLastVerseOfToday();
  console.log("getAppDataFromFS : verseoftoday");
  console.log(versearray);
  const verseoftoday = versearray[0];
  console.log(verseoftoday);

  const lastorderarray  = await OrderPageMethods.getLastOrderId();
  console.log("getAppDataFromFS : lastorder");
  console.log(lastorderarray);
  const lastorder = lastorderarray;
  console.log(lastorder);

  const events = await HomePageMethods.getAllEvents();
  console.log("getAppDataFromFS : events");
  console.log(events);

 
  const teachings = await TeachingPageMethods.getAllTeaching();
  console.log("getAppDataFromFS : teaching");
  console.log(teachings);


  const shopping = await ShoppingPageMethods.getAllShoppingItems();
  console.log("getAppDataFromFS : shopping");
  console.log(shopping);


   // const lessons = parseLessons(teaching);//null

   const response2 = await Promise.all([fetch(dataUrl2)]);
   const responseData2 = await response2[0].json();
   const branches = responseData2.Branches as Branch[];

/*
dataFS {
 propheticmessage : PropheticMessage;
  verseoftoday : VerseOfToday;
  events : Event[];
  shopping: Shopping[];
  teachings: Teaching[];
  myOrders : Order [];
  myunlockedteachings?: number[];
  branches :Branch[];
  loading?: boolean;
  currentorder : Order;
}
*/


  const dataFS = {
    propheticmessage,
    verseoftoday,
    events,
    shopping,
    teachings,
    myOrders,
    myunlockedteachings,
    branches,
    lastorder
    //lessons // null
    
  };

  console.log("End reading data from Firestore");
  console.log("getAppDataFromFS: data");
  console.log(dataFS);

  return dataFS;
};



export const getAppUserDataFromFS = async () => {

  let myOrders : any;
  let myunlockedteachings : any;
  const auth = getAuth(app);
  const user = auth.currentUser;
  const userUid = user!.uid;

  console.log("getAppUserDataFromFS : userId", userUid);

if (userUid != null && userUid != undefined)
{
   myOrders = await OrderPageMethods.getMyOrders(userUid as string);
  console.log("getAppUserDataFromFS : myOrders");
  console.log(myOrders);


  myunlockedteachings =  TeachingPageMethods.getMyUnlockedTeachings(myOrders);
 console.log("getAppUserDataFromFS : myUnlockedTeachings");
 console.log(myunlockedteachings);

}


  const dataFS = {

    myOrders,
    myunlockedteachings


    
  };

  console.log("End reading user app data from Firestore");
  console.log("getAppUserDataFromFS: data");
  console.log(dataFS);

  return dataFS;
}; 