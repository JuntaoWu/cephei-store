
import { of, Observable } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { getCart } from '../reducers';
import { api } from '../services';
import * as actions from '../actions';

/**
 * search products epic
 * @param action$
 * @param store
 * @returns {any|*|Observable}
 */
const searchProducts = (action$: Observable<any>) => {
    return action$.pipe(
        ofType(value => value === actions.GET_ALL_PRODUCTS),
        switchMap(q => {
            return api.getProducts();
        }),
        map(actions.receiveProducts)
    );
};

/**
 * checkout epic.
 * @param action$
 * @param store
 * @returns {any|*|Observable}
 */
const checkout = (action$: Observable<any>, store) => {
    return action$.pipe(
        ofType(actions.CHECKOUT_REQUEST),
        switchMap(q => {
            const cart = getCart(store.getState());
            return api.buyProducts(cart);
        }),
        map(cart => {
            return actions.checkoutSuccess(cart);
        }),
        catchError(error => {
            return of(actions.checkoutFailure(error))
        })
    );
};


export const rootEpic = combineEpics(
    searchProducts,
    checkout
);
