import {combineReducers, configureStore} from '@reduxjs/toolkit'
import { persistReducer,persistStore} from 'redux-persist'
import userReducer  from './userSlice.js';
import storage from 'redux-persist/lib/storage';
// Add reducers like user 
const rootReducer = combineReducers({
    user:userReducer
})

// persistConfig: An object that specifies how and where to store the Redux state.
// key: A unique key that redux-persist uses to store your Redux state in localStorage.
// storage: Defines the storage engine to use. In this case, it's using localStorage.
// version: An optional property to handle versioning of the persisted state. 
// If you change the structure of your Redux state over time, you can increment this version to clear out or transform persisted state.
// ==================== this is necessary ======================
const persistConfig = {
    key :'root',
    storage,
    version:1,
}

// persistedReducer: A persisted version of your rootReducer. This is the reducer that will be
//  used by the store to manage state. persistReducer wraps your rootReducer and automatically 
// manages saving and loading to/from localStorage.

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer:persistedReducer,
    // serializableCheck set to false. This option disables checks that ensure the state is serializable,
    //  which can be necessary if you store non-serializable data or when using certain libraries (like redux-persist).
    middleware:(getdefaultMiddleware) => getdefaultMiddleware({
        serializableCheck: false,
    })
})

export const persistor = persistStore(store);