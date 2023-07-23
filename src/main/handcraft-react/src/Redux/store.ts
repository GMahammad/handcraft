import { configureStore } from '@reduxjs/toolkit';
import cartReducer from  '../Cart/cartSlice'
import authReducer from '../Auth/Data/authSlice'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const persistConfig = {
  key: 'root', // root key for the persisted data
  storage, // storage implementation
};

// Wrap the cartReducer with the persistReducer
const persistedCartReducer = persistReducer(persistConfig, cartReducer);
const persistedAuthReducer = persistReducer(persistConfig, authReducer);


export const store = configureStore({
  reducer: {
    cart:persistedCartReducer,
    auth:persistedAuthReducer
  },
});
export const persistor = persistStore(store);


