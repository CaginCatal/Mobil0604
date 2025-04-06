import React, { useState } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonInput, IonButton, IonItem, IonLabel, IonLoading, IonAlert, IonIcon
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { UserService } from '../services/UserService';
import { eye, eyeOff } from 'ionicons/icons'; // Göz simgeleri
import './Register.css';

const Register: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Şifreyi gösterme durumu
  const history = useHistory();

  const handleRegister = async () => {
    // Eksik bilgi girişi
    if (!fullName || !username || !password || !email || !confirmPassword) {
      setAlertMessage('Lütfen tüm alanları doldurun');
      setShowAlert(true);
      return;
    }

    // Şifrelerin eşleşip eşleşmediğini kontrol et
    if (password !== confirmPassword) {
      setAlertMessage('Şifreler eşleşmiyor');
      setShowAlert(true);
      return;
    }

    try {
      setShowLoading(true);

      // Kullanıcı kaydı yapılır
      await UserService.register({
        fullName,
        username,
        password,
        email
      });

      setShowLoading(false);
      setAlertMessage('Kayıt başarılı! Giriş yapabilirsiniz.');
      setShowAlert(true);

      // Kayıt başarılı olduğunda login sayfasına yönlendir
      setTimeout(() => {
        history.push('/login');
      }, 2000); // 2 sn bekle

    } catch (error: any) {  // error'a "any" tipi atandı
      // Hata: Firebase:Error
      // (auth/email-already-in-use) --> kayıtlı email
      setShowLoading(false);
      setAlertMessage(`Hata: ${error.message}`);
      setShowAlert(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Kayıt Ol</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="register-form">
          <IonItem>
            <IonLabel position="floating">Ad Soyad</IonLabel>
            <IonInput 
              value={fullName} 
              onIonChange={(e) => setFullName(e.detail.value!)} 
              required
            />
          </IonItem>
          
          <IonItem>
            <IonLabel position="floating">Kullanıcı Adı</IonLabel>
            <IonInput 
              value={username} 
              onIonChange={(e) => setUsername(e.detail.value!)} 
              required
            />
          </IonItem>
          
          <IonItem>
            <IonLabel position="floating">E-posta</IonLabel>
            <IonInput 
              type="email" 
              value={email} 
              onIonChange={(e) => setEmail(e.detail.value!)} 
              required
            />
          </IonItem>

          {/* Şifre alanı */}
          <IonItem>
            <IonLabel position="floating">Şifre</IonLabel>
            <IonInput 
              type={showPassword ? 'text' : 'password'} // Şifreyi gösterme durumu
              value={password} 
              onIonChange={(e) => setPassword(e.detail.value!)} 
              required
            />
            <IonIcon 
              slot="end" 
              icon={showPassword ? eye : eyeOff} 
              onClick={() => setShowPassword(!showPassword)} // Göz simgesine tıklanarak şifreyi gösterme / gizleme
            />
          </IonItem>

          {/* Şifreyi tekrar iste */}
          <IonItem>
            <IonLabel position="floating">Şifreyi Tekrar Girin</IonLabel>
            <IonInput 
              type={showPassword ? 'text' : 'password'} 
              value={confirmPassword} 
              onIonChange={(e) => setConfirmPassword(e.detail.value!)} 
              required
            />
            <IonIcon 
              slot="end" 
              icon={showPassword ? eye : eyeOff} 
              onClick={() => setShowPassword(!showPassword)} 
            />
          </IonItem>
          
          <IonButton expand="block" onClick={handleRegister} className="ion-margin-top">
            Kayıt Ol
          </IonButton>
          
          <IonButton expand="block" fill="clear" routerLink="/login" className="ion-margin-top">
            Zaten hesabınız var mı? Giriş Yap
          </IonButton>
        </div>
        
        <IonLoading
          isOpen={showLoading}
          message={'Kayıt işlemi yapılıyor...'}
        />
        
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Bilgi'}
          message={alertMessage}
          buttons={['Tamam']}
        />
      </IonContent>
    </IonPage>
  );
};

export default Register;
