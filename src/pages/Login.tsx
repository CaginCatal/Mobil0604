import React, { useState } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonInput, IonButton, IonItem, IonLabel, IonLoading, IonAlert, IonIcon
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { UserService } from '../services/UserService';
import { eye, eyeOff } from 'ionicons/icons'; // Eye iconları import ediliyor
import './Login.css';  // CSS dosya import'u (tasarım için buraya bakacağız)

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);  // Şifreyi gösterme durumu
  const history = useHistory();

  const handleLogin = async () => {
    // Eksik bilgi girişi (Kullanıcı Adı veya Şifre)
    if (!username || !password) {
      setAlertMessage('Lütfen kullanıcı adı ve şifre girin');
      setShowAlert(true);
      return;
    }
    
    try {
      setShowLoading(true);
      
      const user = await UserService.login(username, password);
      
      setShowLoading(false);
      
      if (user) {
        // Giriş başarılı, menü veya admin menü sayfasına yönlendir

        // Kullanıcı adı ve şifresi admin ise admin menüsüne yönlendir
        if (username === 'admin' && password === 'CaginAdmin') {
          history.push('/menuadmin');
        }
        // Değilse normal menüye yönlendir
        else {
          history.push('/menu');
        }
      }
      
    } catch (error: any) {
      // Giriş sırasında eşleşme bulunamadı
      setShowLoading(false);
      setPassword(''); // Şifreyi sıfırla
      setAlertMessage('Kullanıcı adı veya şifre hatalı. Kayıtlı değilseniz lütfen kayıt olun.');
      setShowAlert(true);
    }
  };

  // Şifreyi göster-gizle işlevi
  const togglePasswordVisibility = (e: React.MouseEvent) => {
    e.stopPropagation(); // Bu satır, input kutusunun tıklanmasını engelliyor
    setShowPassword(!showPassword);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Giriş Yap</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="login-form">
          <IonItem>
            <IonLabel position="floating">Kullanıcı Adı</IonLabel>
            <IonInput 
              value={username} 
              onIonChange={(e) => setUsername(e.detail.value!)} 
              required
            />
          </IonItem>
          
          <IonItem>
            <IonLabel position="floating">Şifre</IonLabel>
            <IonInput 
              type={showPassword ? "text" : "password"}  // Şifreyi gösterme/gizleme işlevi
              value={password} 
              onIonChange={(e) => setPassword(e.detail.value!)} 
              required
            />
            <IonIcon
              slot="end"
              icon={showPassword ? eye : eyeOff}
              onClick={togglePasswordVisibility}  // Şifreyi göster/gizle fonksiyonu
              style={{ cursor: 'pointer' }}  // PC kullanımda cursor işaretini değiştirir
            />
          </IonItem>
          
          <IonButton expand="block" onClick={handleLogin} className="ion-margin-top">
            Giriş Yap
          </IonButton>
          
          <IonButton expand="block" fill="clear" routerLink="/register" className="ion-margin-top">
            Hesabınız yok mu? Kayıt Ol
          </IonButton>
        </div>
        
        <IonLoading
          isOpen={showLoading}
          message={'Giriş yapılıyor...'} // Ufak bekleme mesajı
        />
        
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Bilgi'} // Uyarı, bilgi vs.
          message={alertMessage}
          buttons={['Tamam']} // Çıkan bilgi kutusunu kapatma butonu
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
