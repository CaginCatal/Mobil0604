import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login'; // Login sayfasını import ettik
import Register from './pages/Register'; // Register sayfasını import ettik
import Menu from './pages/Menu'; // Menu sayfasını import ettik
import MenuAdmin from './pages/MenuAdmin'; // MenuAdmin sayfasını import ettik
import AlzheimerInfo from './pages/AlzheimerInfo'; // AlzheimerInfo sayfasını import ettik
import VerileriTestEt from './pages/VerileriTestEt'; // Verileri Test Et sayfasını import ettik

// her yeni sayfayı import et! Ve aşağıya Route et!


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css'

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        {/* Login sayfasını ekledik */}
        <Route exact path="/login">
          <Login />
        </Route>

        {/* Register sayfasını ekledik */}
        <Route exact path="/register">
          <Register />
        </Route>

        {/* Menu sayfasına yönlendirme */}
        <Route exact path="/menu">
          <Menu />
        </Route>

        {/* MenuAdmin sayfasına yönlendirme (Admin için) */}
        <Route exact path="/menuadmin">
          <MenuAdmin />
        </Route>

        {/* AlzheimerInfo sayfası */}
        <Route exact path="/alzheimer-info">
          <AlzheimerInfo />
        </Route>

        {/* Verileri Test Et sayfası */}
        <Route exact path="/verileri-test-et">
          <VerileriTestEt />
        </Route>

        {/* Eğer kullanıcı giriş yapmadıysa, direkt login sayfasına yönlendir */}
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
