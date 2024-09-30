import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/Auth/authSlice";
import addCartReducer from "./Features/AddToCart/addCartSlice";
import { baseApi } from "./Apis/baseApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "auth",
  storage,
};
// const persistConfig2 = {
//   key: "root",
//   storage,
// };

const persistedReducer = persistReducer(persistConfig, authReducer);
// const persistedCartReducer = persistReducer(persistConfig, addCartReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    cart: addCartReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});
setupListeners(store.dispatch);
export const persistor = persistStore(store);
