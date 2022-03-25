import { createSelector } from 'reselect';
import { TeachingLesson } from './models';
import { AppState } from './state';


export const getIdParam = (_state: AppState, props: any) => {
  return props.match.params['id'];
};

export const getIdCatParam = (_state: AppState, props: any) => {
  return props.match.params['idcat'];
};

export const getcurrentOrder = (state: AppState) =>  state.data?.currentOrder;


const getEventList = (state: AppState) => {
  return state?.data?.events
};


export const getEvent = createSelector(
  getEventList, getIdParam,
  (event, id) => {
    console.log(event);
    const theevent = event?.find(z => z.id.toString() === id);
    console.log(" get the event selected ");
    console.log(theevent);
  //  return event.find(s => s.id === id);
  return theevent;
  }
);


export const getTeachings = (state: AppState) => {
  return state.data?.teachings;

};
export const getTeachingList = createSelector(
  getTeachings, getIdCatParam,
  (teachings, idcat) => {
   // let vShoppingDetail : ShoppingItem;
  //  vShoppingDetail = shopping.filter(s => s.id = idcat).find(y => y.id = id);
  console.log("La categorie selectioée est ", idcat);
  console.log("Tableau de teachings à selectionner : ", teachings);

  const teach = teachings?.find(s => s.id.toString() === idcat);
  
  console.log(teach);
  
  return teach;

  }
);

/* Les lecons d'une categorie selectionnée */
export const getTeachingLessonsByCat = createSelector(
  getTeachings, getIdCatParam,
  (teachings, idcat) => {
   // let vShoppingDetail : ShoppingItem;
  //  vShoppingDetail = shopping.filter(s => s.id = idcat).find(y => y.id = id);
  console.log("La categorie selectioée est ", idcat);
  console.log("Tableau de teachings à selectionner : ", teachings);

  const teach = teachings?.find(s => s.id.toString() === idcat)?.lessons;
  
  console.log(teach);
  
  return teach;

  }
);

/* Selection d'une lecon en fonction de la categorie et de l'Id */

export const getLesson = createSelector(
  getTeachings, getIdCatParam, getIdParam,
  (teachings?, idcat?, id?) =>  {
    
    console.log("Selector  getLesson : ",idcat, id);

    console.log("La categorie selectioée est ", idcat);
    console.log("Tableau de teachings à selectionner : ", teachings);
  
    const teachingscat = teachings?.find(s => s.id.toString() === idcat);
    console.log("Les Teachings de la categorie sont : ", teachingscat);


    const lecon = teachingscat?.lessons.find(x => x.id.toString() === id);
    console.log(" La lesson selectionnée est : ",id);
    console.log(lecon);

    return lecon;
  }
);



export const getSelectedLesson = createSelector(
  getTeachingLessonsByCat, getIdCatParam, getIdParam,
  (lessons, idcat, id) =>  {
    console.log("Les lessons");
    const leconcat = lessons?.filter(z => z.idcat.toString() === idcat);
    console.log(" Les lecons de la categorie selectionee ");
    console.log(leconcat);
    const lecon = leconcat?.find(x => x.id.toString() === id);
    console.log(" la lecon selectionee ");
    console.log(lecon);

    return lecon;
  }
);



export const getShopping= (state: AppState) => state.data?.shopping;

export const getShoppingItems = createSelector(
  getShopping, getIdCatParam,
  (shopping, idcat) => {
    console.log(shopping);
    const shoppingitems = shopping?.find(z => z.id.toString() === idcat)?.items
    console.log(" get the shopping items selected ");
    console.log(shoppingitems);
  //  return event.find(s => s.id === id);
  return shoppingitems;
  }
);

//export const getShoppingItems= (state: AppState) => state.data.shoppingitems;
//export const getTeachingLessons = (state: AppState) => state.data.lessons;


export const getShoppingDetails = createSelector(
  getShoppingItems, getIdCatParam, getIdParam,
  (shoppingitems, idcat, id) => {
   // let vShoppingDetail : ShoppingItem;
  //  vShoppingDetail = shopping.filter(s => s.id = idcat).find(y => y.id = id);
    const item = shoppingitems?.filter(s => s.idcat.toString() === idcat).find(y => y.id.toString() === id); 
    console.log("Shopping Iteme selectionné est : ");
    console.log(item)
    return item;
  }
);


export const getMyOrders = (state: AppState) => state.data?.myOrders;


export const getOrder = createSelector(
  getMyOrders, getIdParam,
  (myorderslist, id) => {
    console.log(myorderslist);
    const myorder = myorderslist?.find(z => z.orderid.toString() === id);
    console.log(" get the order selected ");
    console.log(myorder);
  //  return event.find(s => s.id === id);
  return myorder;
  }
);



export const getOrderNum = createSelector(
  getIdParam,
  (id) => {
  
    console.log(" get the order selected ");
    console.log(id);
  //  return event.find(s => s.id === id);
  return id;
  }
);


/*utiliser le reducer au niveau de la categorie */



