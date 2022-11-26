if (__DEV__) {
      import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
    }
    
    import {AppRegistry} from 'react-native';
    import App from './App';
    import {name as appName} from './app.json';
    import { Provider } from 'react-redux';
    import store  from './src/store';
    
    const AppContainer = () => (
          <Provider store={store}>
              <App />
          </Provider>
      );
    
      AppRegistry.registerComponent(appName, () => AppContainer);
    