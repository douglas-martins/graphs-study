import { createTypedHooks } from 'easy-peasy';
import StoreModel from './storeModel';

export const { useStoreActions, useStoreDispatch, useStoreState } = createTypedHooks<StoreModel>();

